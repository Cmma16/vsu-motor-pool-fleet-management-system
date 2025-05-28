<?php

namespace App\Http\Controllers;

use App\Models\MaintenancePlan;
use App\Models\User;
use App\Models\Vehicle;
use App\Http\Requests\MaintenancePlan\StoreMaintenancePlanRequest;
use App\Http\Requests\MaintenancePlan\UpdateMaintenancePlanRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaintenancePlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $maintenancePlans = MaintenancePlan::with(['vehicle', 'createdBy'])
            ->get()
            ->map(function ($plan) {
                return [
                    'plan_id' => $plan->plan_id,
                    'vehicle_name' => $plan->vehicle->vehicle_name ?? 'N/A',
                    'scheduled_date' => $plan->scheduled_date,
                    'created_by' => $plan->createdBy ? $plan->createdBy->first_name . ' ' . $plan->createdBy->last_name : 'N/A',
                    'status' => $plan->status,
                ];
            });

        return Inertia::render('plans/index', [
            'maintenancePlans' => $maintenancePlans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $users = User::select('id', 'first_name', 'last_name')->get();

        return Inertia::render('plans/add-plan', [
            'vehicles' => $vehicles,
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMaintenancePlanRequest $request)
    {
        MaintenancePlan::create($request->validated());
        return redirect()->route('plans.index')->with('success', 'Maintenance plan created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(MaintenancePlan $plan)
    {
        $maintenancePlan = $plan;
        return Inertia::render('plans/details', [
            'maintenancePlan' => [
                'plan_id' => $maintenancePlan->plan_id,
                'vehicle_name' => $maintenancePlan->vehicle->vehicle_name ?? 'N/A',
                'scheduled_date' => $maintenancePlan->scheduled_date,
                'created_by' => $maintenancePlan->createdBy ? $maintenancePlan->createdBy->first_name . ' ' . $maintenancePlan->createdBy->last_name : 'N/A',
                'status' => $maintenancePlan->status,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MaintenancePlan $plan)
    {
        $maintenancePlan = $plan;
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $users = User::select('id', 'first_name', 'last_name')->get();

        return Inertia::render('plans/edit-plan', [
            'maintenancePlan' => [
                'plan_id' => $maintenancePlan->plan_id,
                'vehicle_id' => $maintenancePlan->vehicle_id,
                'scheduled_date' => $maintenancePlan->scheduled_date,
                'created_by' => $maintenancePlan->created_by,
                'status' => $maintenancePlan->status,
            ],
            'vehicles' => $vehicles,
            'users' => $users,
        ]);
    }

    public function updateStatus(Request $request, MaintenancePlan $plan)
    {
        $maintenancePlan = $plan;

        $request->validate([
            'status' => 'required|string|in:pending,scheduled,completed,cancelled',
        ]);

        $maintenancePlan->update(['status' => $request->status]);

        return with('success', 'Maintenance plan status updated successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaintenancePlanRequest $request, MaintenancePlan $plan)
    {
        $maintenancePlan = $plan;
        $maintenancePlan->update($request->validated());
        return redirect()->route('plans.index')->with('success', 'Maintenance plan updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MaintenancePlan $plan)
    {
        $maintenancePlan = $plan;
        $maintenancePlan->delete();
        return redirect()->route('plans.index')->with('success', 'Maintenance plan deleted successfully.');
    }
}
