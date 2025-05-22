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
class RepairsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $repairs = Maintenance::with(['serviceRequest', 'odometerReading', 'performedBy', 'confirmedBy'])
        ->whereHas('serviceRequest', function ($query) {
            $query->where('service_type', 'repair');
        })
        ->get()
        ->map(function ($maintenance) {
            return [
                'maintenance_id' => $maintenance->maintenance_id,
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
    
        return Inertia::render('repairs/index', [
            'repairs' => $repairs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $serviceRequests = ServiceRequest::select('request_id', 'work_description')->get();
        $odometerLogs = OdometerLog::select('odometer_id', 'vehicle_id', 'reading', 'created_at')->get();


        return Inertia::render('repairs/add-repair', [
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
        $newRepair = Maintenance::create($validatedData);
        
        $newRepair->serviceRequest->update(['status' => 'conducted']);

        return redirect()->route('repairs.show', $newRepair->maintenance_id)->with('success', 'Repair record created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Maintenance $repair)
    {
        $repairParts = MaintenanceParts::with('part')->where('maintenance_id', $repair->maintenance_id)->get()
            ->map(function ($repairPart) {
            return [
                'id' => $repairPart->id,
                'maintenance_id' => $repairPart->maintenance_id,
                'part_id' => $repairPart->part_id,
                'part_name' => $repairPart->part->part_name,
                'quantity_used' => $repairPart->quantity_used,
            ];
        });

        $parts = Part::select('part_id', 'part_name')->get();
        return Inertia::render('repairs/details', [
            'repair' => [
                'repair_id' => $repair->maintenance_id,
                'vehicle_name' => $repair->serviceRequest->vehicle->vehicle_name ?? 'N/A',
                'request_description' => $repair->serviceRequest->work_description ?? 'N/A',
                'performed_by' => $repair->performedBy ? $repair->performedBy->first_name . ' ' . $repair->performedBy->last_name : 'N/A',
                'confirmed_by' => $repair->confirmedBy ? $repair->confirmedBy->first_name . ' ' . $repair->confirmedBy->last_name : null,
                'repair_summary' => $repair->maintenance_summary,
                'odometer_reading' => $repair->odometerReading ? $repair->odometerReading->reading : 'N/A',
            ],
            'parts' => $parts,
            'repairParts' => $repairParts,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Maintenance $repair)
    {

        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $users = User::select('id', 'first_name', 'last_name')->get(); // Or filter to only show personnel if needed
        $serviceRequests = ServiceRequest::select('request_id', 'work_description')->get();
        $odometerLogs = OdometerLog::select('odometer_id', 'vehicle_id', 'reading')->get();

        return Inertia::render('repairs/edit-repair', [
            'repair' => [
                'repair_id' => $repair->maintenance_id,
                'vehicle_id' => $repair->serviceRequest->vehicle_id,
                'request_id' => $repair->serviceRequest->request_id,
                'date_in' => $repair->date_in,
                'date_completed' => $repair->date_completed,
                'performed_by' => $repair->performed_by,
                'confirmed_by' => $repair->confirmed_by,
                'summary' => $repair->maintenance_summary,
                'odometer_id' => $repair->odometer_id,
            ],
            'vehicles' => $vehicles,
            'users' => $users,
            'serviceRequests' => $serviceRequests,
            'odometerLogs' => $odometerLogs,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaintenanceRequest $request, Maintenance $repair)
    {
        $repair->update($request->validated());

        return redirect()->route('repairs.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Maintenance $repair)
    {
        $repair->delete();

        return redirect()->route('repairs.index');
    }
}
