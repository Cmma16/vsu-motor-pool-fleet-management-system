<?php

namespace App\Http\Controllers;

use App\Models\Maintenance;
use App\Models\MaintenancePlan;
use App\Models\ServiceRequest;
use App\Models\Vehicle;
use App\Models\User;
use App\Models\OdometerLog;
use App\Models\MaintenanceParts;
use App\Models\Part;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Requests\Maintenance\StoreMaintenanceRequest;
use App\Http\Requests\Maintenance\UpdateMaintenanceRequest;
use Inertia\Inertia;
use Carbon\Carbon;

class MaintenanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $maintenanceRecords = Maintenance::with(['serviceRequest', 'odometerReading', 'performedBy', 'confirmedBy'])
            ->whereHas('serviceRequest', function ($query) {
                $query->where('service_type', 'maintenance');
            })
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($maintenance) {
                return [
                    'maintenance_id' => $maintenance->maintenance_id,
                    'maintenance_plan' => Carbon::parse($maintenance->serviceRequest->maintenancePlan->scheduled_date)->format('M d, Y') ?? 'N/A',
                    'request_description' => $maintenance->serviceRequest->work_description ?? 'N/A', 
                    'vehicle_name' => $maintenance->serviceRequest->maintenancePlan->vehicle->vehicle_name ?? 'N/A',
                    'date_in' => $maintenance->date_in,
                    'date_completed' => $maintenance->date_completed,
                    'odometer_reading' => $maintenance->odometerReading->reading ?? 'N/A',
                    'performed_by' => $maintenance->performedBy ? $maintenance->performedBy->first_name . ' ' . $maintenance->performedBy->last_name : 'N/A',
                    'confirmed_by' => $maintenance->confirmedBy ? $maintenance->confirmedBy->first_name . ' ' . $maintenance->confirmedBy->last_name : '',
                    'date_confirmed' => $maintenance->date_confirmed,
                    'maintenance_summary' => $maintenance->maintenance_summary,
                ];
            });

        return Inertia::render('maintenance/index', [
            'maintenanceRecords' => $maintenanceRecords,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $maintenancePlans = MaintenancePlan::with('vehicle')
            ->select('plan_id', 'vehicle_id', 'scheduled_date')
            ->where('status', 'scheduled')
            ->get()
                ->map(function ($plan) {
                return [
                    'plan_id' => $plan->plan_id,
                    'vehicle_id' => $plan->vehicle_id,
                    'vehicle_name' => $plan->vehicle->vehicle_name,
                    'scheduled_date' => Carbon::parse($plan->scheduled_date)->format('M d, Y'),
                ];
            });
        $serviceRequests = ServiceRequest::select('request_id', 'work_description')->where('status', 'approved')->get();
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $odometerLogs = OdometerLog::select('odometer_id', 'vehicle_id', 'reading', 'created_at')->get();

        return Inertia::render('maintenance/add-maintenance', [
            'requestId' => $request->input('data.requestId'),
            'vehicleId' => $request->input('data.vehicleId'),
            'planId' => $request->input('data.planId'),
            'maintenancePlans' => $maintenancePlans,
            'serviceRequests' => $serviceRequests,
            'vehicles' => $vehicles,
            'odometerLogs' => $odometerLogs,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMaintenanceRequest $request)
    {
        // Create a new maintenance record
        $validatedData = $request->validated();
        $validatedData['performed_by'] = auth()->id();
        $newMaintenance = Maintenance::create($validatedData);
        $newMaintenance->serviceRequest->update(['status' => 'conducted']);
        // Redirect to the index page with a success message
        return redirect()->route('maintenance.show', $newMaintenance->maintenance_id)->with('success', 'Maintenance record created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Maintenance $maintenance)
    {
        $maintenanceParts = MaintenanceParts::with('part', 'maintenance')->where('maintenance_id', $maintenance->maintenance_id)->get()
            ->map(function ($maintenancePart) {
            return [
                'id' => $maintenancePart->id,
                'maintenance_id' => $maintenancePart->maintenance_id,
                'part_id' => $maintenancePart->part_id,
                'part_name' => $maintenancePart->part->part_name,
                'quantity_used' => $maintenancePart->quantity_used,
                'confirmed_by' => $maintenancePart->maintenance->confirmed_by,
            ];
        });
        $parts = Part::select('part_id', 'part_name')->get();
        return Inertia::render('maintenance/details', [
            'maintenance' => [
                'maintenance_id' => $maintenance->maintenance_id,
                'vehicle_name' => $maintenance->serviceRequest->vehicle->vehicle_name ?? 'N/A',
                'maintenance_plan' => $maintenance->serviceRequest->maintenancePlan->scheduled_date ?? 'N/A',
                'request_description' => $maintenance->serviceRequest->work_description ?? 'N/A',
                'odometer_reading' => $maintenance->odometerReading->reading ?? 'N/A',
                'performed_by' => $maintenance->performedBy ? $maintenance->performedBy->first_name . ' ' . $maintenance->performedBy->last_name : 'N/A',
                'confirmed_by' => $maintenance->confirmedBy ? $maintenance->confirmedBy->first_name . ' ' . $maintenance->confirmedBy->last_name : null,
                'date_completed' => $maintenance->date_completed,
                'date_in' => $maintenance->date_in,
                'date_confirmed' => $maintenance->date_confirmed,
                'maintenance_summary' => $maintenance->maintenance_summary,
            ],
            'maintenanceParts' => $maintenanceParts,
            'parts' => $parts,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Maintenance $maintenance)
    {
        $odometerLogs = OdometerLog::select('odometer_id', 'reading')->where('vehicle_id', $maintenance->serviceRequest->vehicle_id)->get();
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        
        return Inertia::render('maintenance/edit-maintenance', [
            'maintenance' => [
                'maintenance_id' => $maintenance->maintenance_id,
                'plan_description' => $maintenance->serviceRequest->maintenancePlan->scheduled_date ?? 'N/A',
                'request_description' => $maintenance->serviceRequest->work_description ?? 'N/A',
                'vehicle_name' => $maintenance->serviceRequest->vehicle->vehicle_name ?? 'N/A',
                'vehicle_id' => $maintenance->serviceRequest->vehicle->vehicle_id,
                'odometer_id' => $maintenance->odometer_id,
                'performed_by' => $maintenance->performed_by,
                'confirmed_by' => $maintenance->confirmed_by,
                'date_in' => $maintenance->date_in,
                'date_completed' => $maintenance->date_completed,
                'maintenance_summary' => $maintenance->maintenance_summary,
            ],
            'odometerLogs' => $odometerLogs,
            'vehicles' => $vehicles,
        ]);
    }

    public function printMaintenanceRecord(Maintenance $maintenance)
    {
        $data = Maintenance::with([
            'partsUsed',
            'confirmedBy.role',
            'performedBy.role'
        ])->find($request->request_id);

        // $data->formatted_date_filed = Carbon::parse($data->date_filed)->format('F d, Y');
        // $data->formatted_date_received = Carbon::parse($data->date_received)->format('F d, Y');
        // $data->requested_by_name = $data->requestedBy->first_name . ' ' . $data->requestedBy->last_name;
        // $data->received_by_name = $data->receivedBy->first_name . ' ' . $data->receivedBy->last_name;
        // $data->date_of_inspection = Carbon::parse($data->serviceInspection->started_at)->format('F d, Y');
        // $data->time_started = Carbon::parse($data->serviceInspection->started_at)->format('h:i');
        // $data->time_ended = Carbon::parse($data->serviceInspection->completed_at)->format('h:i');

        // if ($data->serviceInspection) {
        //     $data->conducted_by_name = $data->serviceInspection->conductedBy->first_name . ' ' . $data->serviceInspection->conductedBy->last_name;
        //     $data->confirmed_by_name = $data->serviceInspection->confirmedBy->first_name . ' ' . $data->serviceInspection->confirmedBy->last_name;
        // }

        return Pdf::loadView('pdf.maintenance-record', compact('data'))
            ->setPaper('a4', 'portrait')
            ->stream('maintenance-record.pdf');
    }

    public function confirm(Maintenance $maintenance)
    {
        $maintenance->update(['confirmed_by' => auth()->id(), 'date_confirmed' => now()->timezone('Asia/Manila')->format('Y-m-d')]);
        $maintenance->serviceRequest->update(['status' => 'completed']);
        $maintenance->serviceRequest->vehicle->update(['status' => 'available']);
        Notification::create([
            'user_id' => $maintenance->performed_by,
            'title' => "Repair Record Confirmed",
            'message' => "Your repair record for {$maintenance->serviceRequest->vehicle->vehicle_name} has been confirmed.",
        ]);

        return redirect()->route('maintenance.index')->with('success', 'Maintenance record confirmed successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaintenanceRequest $request, Maintenance $maintenance)
    {
        // Create a new maintenance record
        $maintenance->update($request->validated());

        // Redirect to the index page with a success message
        return redirect()->route('maintenance.index')->with('success', 'Maintenance record updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Maintenance $maintenance)
    {
        $maintenance->delete();
        $maintenance->serviceRequest->update(['status' => 'approved']);

        return redirect()->route('maintenance.index')->with('success', 'Maintenance record deleted successfully.');
    }
}
