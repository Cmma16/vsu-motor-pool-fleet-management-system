<?php

namespace App\Http\Controllers;

use App\Models\Maintenance;
use App\Models\MaintenancePlan;
use App\Models\ServiceRequest;
use App\Models\Vehicle;
use App\Models\User;
use App\Models\OdometerLog;
use App\Http\Requests\StoreMaintenanceRequest;
use App\Http\Requests\UpdateMaintenanceRequest;
use Inertia\Inertia;

class MaintenanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $maintenanceRecords = Maintenance::with(['plan', 'request', 'vehicleName', 'odometerReading', 'performedBy', 'confirmedBy'])
            ->get()
            ->map(function ($maintenance) {
                return [
                    'maintenance_id' => $maintenance->maintenance_id,
                    'plan_id' => $maintenance->plan->plan_id ?? 'N/A',
                    'request_description' => $maintenance->request->work_description ?? 'N/A', //redundant with maintenance plan plan_name
                    'vehicle_name' => $maintenance->vehicleName->vehicle_name ?? 'N/A',
                    'date_completed' => $maintenance->date_completed,
                    'odometer_reading' => $maintenance->odometerReading->reading ?? 'N/A',
                    'performed_by' => $maintenance->performedBy ? $maintenance->performedBy->first_name . ' ' . $maintenance->performedBy->last_name : 'N/A',
                    'confirmed_by' => $maintenance->confirmedBy ? $maintenance->confirmedBy->first_name . ' ' . $maintenance->confirmedBy->last_name : 'N/A',
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
    public function create()
    {
        $maintenancePlans = MaintenancePlan::select('plan_id', 'description')->get();
        $serviceRequests = ServiceRequest::select('request_id', 'work_description')->get();
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $users = User::select('id', 'first_name', 'last_name')->get();
        $odometerLogs = OdometerLog::select('odometer_id', 'reading')->get();

        return Inertia::render('maintenance/add-maintenance', [
            'maintenancePlans' => $maintenancePlans,
            'serviceRequests' => $serviceRequests,
            'vehicles' => $vehicles,
            'users' => $users,
            'odometerLogs' => $odometerLogs,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMaintenanceRequest $request)
    {
        // Create a new maintenance record
        Maintenance::create($request->validated());

        // Redirect to the index page with a success message
        return redirect()->route('maintenance.index')->with('success', 'Maintenance record created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Maintenance $maintenance)
    {
        return Inertia::render('maintenance/details', [
            'maintenance' => [
                'plan_name' => $maintenance->plan->plan_name ?? 'N/A',
                'request_description' => $maintenance->request->work_description ?? 'N/A',
                'vehicle_name' => $maintenance->vehicle->vehicle_name ?? 'N/A',
                'odometer_reading' => $maintenance->odometerReading->reading ?? 'N/A',
                'performed_by' => $maintenance->performedBy ? $maintenance->performedBy->first_name . ' ' . $maintenance->performedBy->last_name : 'N/A',
                'confirmed_by' => $maintenance->confirmedBy ? $maintenance->confirmedBy->first_name . ' ' . $maintenance->confirmedBy->last_name : 'N/A',
                'date_completed' => $maintenance->date_completed,
                'description' => $maintenance->description,
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
                'odometer_reading' => $maintenance->odometer_reading,
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
