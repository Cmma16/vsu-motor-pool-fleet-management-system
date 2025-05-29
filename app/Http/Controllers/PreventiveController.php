<?php

namespace App\Http\Controllers;

use App\Models\Repairs;
use App\Models\Maintenance;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\ServiceRequest;
use App\Models\OdometerLog;
use App\Models\RepairParts;
use App\Models\MaintenanceParts;
use App\Models\Part;
use App\Http\Requests\Maintenance\StoreMaintenanceRequest;
use App\Http\Requests\Maintenance\UpdateMaintenanceRequest;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Notification;


class PreventiveController extends Controller
{
    public function index()
    {
        $preventive = Maintenance::with(['serviceRequest', 'odometerReading', 'performedBy', 'confirmedBy'])
        ->whereHas('serviceRequest', function ($query) {
            $query->where('service_type', 'preventive');
        })
        ->orderBy('date_in', 'desc')
        ->get()
        ->map(function ($maintenance) {
            return [
                'preventive_id' => $maintenance->maintenance_id,
                'request_description' => $maintenance->serviceRequest->work_description ?? 'N/A', 
                'vehicle_name' => $maintenance->serviceRequest->vehicle->vehicle_name ?? 'N/A',
                'date_in' => $maintenance->date_in,
                'date_completed' => $maintenance->date_completed,
                'odometer_reading' => $maintenance->odometerReading->reading ?? 'N/A',
                'performed_by' => $maintenance->performedBy ? $maintenance->performedBy->first_name . ' ' . $maintenance->performedBy->last_name : 'N/A',
                'confirmed_by' => $maintenance->confirmedBy ? $maintenance->confirmedBy->first_name . ' ' . $maintenance->confirmedBy->last_name : '',
                'date_confirmed' => $maintenance->date_confirmed,
                'summary' => $maintenance->maintenance_summary,
            ];
        });
    
        return Inertia::render('preventive/index', [
            'preventive' => $preventive,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $serviceRequests = ServiceRequest::select('request_id', 'work_description')->where('status', 'approved')->get();
        $odometerLogs = OdometerLog::select('odometer_id', 'vehicle_id', 'reading', 'created_at')->get();


        return Inertia::render('preventive/add-preventive', [
            'requestId' => $request->input('data.requestId'),
            'vehicleId' => $request->input('data.vehicleId'),
            'vehicles' => $vehicles,
            'serviceRequests' => $serviceRequests,
            'odometerLogs' => $odometerLogs,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMaintenanceRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['performed_by'] = auth()->id();
        $newPreventive = Maintenance::create($validatedData);
        
        $newPreventive->serviceRequest->update(['status' => 'conducted']);

        return redirect()->route('preventive.show', $newPreventive->maintenance_id)->with('success', 'Preventive maintenance record created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Maintenance $preventive)
    {
        $preventiveParts = MaintenanceParts::with('part', 'maintenance')->where('maintenance_id', $preventive->maintenance_id)->get()
            ->map(function ($preventivePart) {
            return [
                'id' => $preventivePart->id,
                'maintenance_id' => $preventivePart->maintenance_id,
                'part_id' => $preventivePart->part_id,
                'part_name' => $preventivePart->part->part_name,
                'quantity_used' => $preventivePart->quantity_used,
                'confirmed_by' => $preventivePart->maintenance->confirmed_by,
            ];
        });

        $parts = Part::select('part_id', 'part_name')->get();
        return Inertia::render('preventive/details', [
            'preventive' => [
                'preventive_id' => $preventive->maintenance_id,
                'vehicle_name' => $preventive->serviceRequest->vehicle->vehicle_name ?? 'N/A',
                'request_description' => $preventive->serviceRequest->work_description ?? 'N/A',
                'performed_by' => $preventive->performedBy ? $preventive->performedBy->first_name . ' ' . $preventive->performedBy->last_name : 'N/A',
                'confirmed_by' => $preventive->confirmedBy ? $preventive->confirmedBy->first_name . ' ' . $preventive->confirmedBy->last_name : null,
                'preventive_summary' => $preventive->maintenance_summary,
                'odometer_reading' => $preventive->odometerReading ? $preventive->odometerReading->reading : 'N/A',
            ],
            'parts' => $parts,
            'preventiveParts' => $preventiveParts,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Maintenance $preventive)
    {

        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $users = User::select('id', 'first_name', 'last_name')->get(); // Or filter to only show personnel if needed
        $serviceRequests = ServiceRequest::select('request_id', 'work_description')->get();
        $odometerLogs = OdometerLog::select('odometer_id', 'vehicle_id', 'reading')->get();

        return Inertia::render('preventive/edit-preventive-maintenance', [
            'preventive' => [
                'preventive_id' => $preventive->maintenance_id,
                'vehicle_id' => $preventive->serviceRequest->vehicle_id,
                'request_id' => $preventive->serviceRequest->request_id,
                'date_in' => $preventive->date_in,
                'date_completed' => $preventive->date_completed,
                'performed_by' => $preventive->performed_by,
                'confirmed_by' => $preventive->confirmed_by,
                'summary' => $preventive->maintenance_summary,
                'odometer_id' => $preventive->odometer_id,
            ],
            'vehicles' => $vehicles,
            'users' => $users,
            'serviceRequests' => $serviceRequests,
            'odometerLogs' => $odometerLogs,
        ]);
    }

    
    public function confirm(Maintenance $preventive)
    {
        $preventive->update(['confirmed_by' => auth()->id(), 'date_confirmed' => now()->timezone('Asia/Manila')->format('Y-m-d')]);
        $preventive->serviceRequest->update(['status' => 'completed']);
        $preventive->serviceRequest->vehicle->update(['status' => 'available']);
        Notification::create([
            'user_id' => $preventive->performed_by,
            'title' => "Preventive Maintenance Record Confirmed",
            'message' => "Your preventive maintenance record for {$preventive->serviceRequest->vehicle->vehicle_name} has been confirmed.",
        ]);

        return redirect()->route('preventive.show', $preventive->maintenance_id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaintenanceRequest $request, Maintenance $preventive)
    {
        $preventive->update($request->validated());

        return redirect()->route('preventive.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Maintenance $preventive)
    {
        $preventive->delete();
        $preventive->serviceRequest->update(['status' => 'approved']);

        return redirect()->route('preventive.index');
    }
}
