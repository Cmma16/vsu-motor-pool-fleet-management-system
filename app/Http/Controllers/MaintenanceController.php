<?php

namespace App\Http\Controllers;

use App\Models\Maintenance;
use App\Models\MaintenancePlan;
use App\Models\ServiceRequest;
use App\Models\Vehicle;
use App\Models\User;
use App\Models\OdometerLog;
use Illuminate\Http\Request;
use App\Http\Requests\Maintenance\StoreMaintenanceRequest;
use App\Http\Requests\Maintenance\UpdateMaintenanceRequest;
use Inertia\Inertia;

class MaintenanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $maintenanceRecords = Maintenance::with(['plan', 'request', 'vehicle', 'odometerReading', 'performedBy', 'confirmedBy'])
            ->get()
            ->map(function ($maintenance) {
                return [
                    'maintenance_id' => $maintenance->maintenance_id,
                    'plan_id' => $maintenance->plan->plan_id ?? 'N/A',
                    'request_description' => $maintenance->request->work_description ?? 'N/A', //redundant with maintenance plan plan_name
                    'vehicle_name' => $maintenance->vehicle->vehicle_name ?? 'N/A',
                    'date_completed' => $maintenance->date_completed,
                    'odometer_reading' => $maintenance->odometerReading->reading ?? 'N/A',
                    'performed_by' => $maintenance->performedBy ? $maintenance->performedBy->first_name . ' ' . $maintenance->performedBy->last_name : 'unassigned',
                    'confirmed_by' => $maintenance->confirmedBy ? $maintenance->confirmedBy->first_name . ' ' . $maintenance->confirmedBy->last_name : 'Not yet confirmed',
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
            ->select('plan_id', 'vehicle_id', 'scheduled_date', 'next_service_km')
            ->where('status', 'scheduled')
            ->get()
                ->map(function ($plan) {
                return [
                    'plan_id' => $plan->plan_id,
                    'vehicle_id' => $plan->vehicle_id,
                    'vehicle_name' => $plan->vehicle->vehicle_name,
                    'scheduled_date' => $plan->scheduled_date,
                    'next_service_km' => $plan->next_service_km,
                ];
            });
        $serviceRequests = ServiceRequest::select('request_id', 'work_description')->get();
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $odometerLogs = OdometerLog::select('odometer_id', 'vehicle_id', 'reading', 'created_at')->get();

        return Inertia::render('maintenance/add-maintenance', [
            'requestId' => $request->input('data.requestId'),
            'vehicleId' => $request->input('data.vehicleId'),
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
        // Redirect to the index page with a success message
        return redirect()->route('maintenance.show', $newMaintenance->maintenance_id)->with('success', 'Maintenance record created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Maintenance $maintenance)
    {

        return Inertia::render('maintenance/details', [
            'maintenance' => [
                'maintenance_plan' => $maintenance->plan->vehicle->vehicle_name . ' - ' . $maintenance->plan->scheduled_date . ' - ' . $maintenance->plan->next_service_km . 'km' ?? 'N/A',
                'request_description' => $maintenance->request->work_description ?? 'N/A',
                'vehicle_name' => $maintenance->vehicle->vehicle_name ?? 'N/A',
                'odometer_reading' => $maintenance->odometerReading->reading ?? 'N/A',
                'performed_by' => $maintenance->performedBy ? $maintenance->performedBy->first_name . ' ' . $maintenance->performedBy->last_name : 'N/A',
                'confirmed_by' => $maintenance->confirmedBy ? $maintenance->confirmedBy->first_name . ' ' . $maintenance->confirmedBy->last_name : 'N/A',
                'date_completed' => $maintenance->date_completed,
                'date_confirmed' => $maintenance->date_confirmed,
                'maintenance_summary' => $maintenance->maintenance_summary,
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Maintenance $maintenance)
    {
        $maintenancePlans = MaintenancePlan::select('plan_id', 'plan_name')->get();
        $serviceRequests = ServiceRequest::select('request_id', 'work_description')->get();
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $users = User::select('id', 'first_name', 'last_name')->get();
        $odometerLogs = OdometerLog::select('odometer_id', 'reading')->get();

        return Inertia::render('maintenance/edit-maintenance', [
            'maintenance' => [
                'maintenance_id' => $maintenance->maintenance_id,
                'plan_id' => $maintenance->plan_id,
                'request_id' => $maintenance->request_id,
                'vehicle_id' => $maintenance->vehicle_id,
                'odometer_id' => $maintenance->odometer_id,
                'performed_by' => $maintenance->performed_by,
                'confirmed_by' => $maintenance->confirmed_by,
                'date_completed' => $maintenance->date_completed,
                'description' => $maintenance->description,
            ],
            'maintenancePlans' => $maintenancePlans,
            'serviceRequests' => $serviceRequests,
            'vehicles' => $vehicles,
            'users' => $users,
        ]);
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
        return redirect()->route('maintenance.index')->with('success', 'Maintenance record deleted successfully.');
    }
}
