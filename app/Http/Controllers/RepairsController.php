<?php

namespace App\Http\Controllers;

use App\Models\Repairs;
use App\Models\User;
use App\Models\Vehicle;
use App\Http\Requests\Repair\StoreRepairsRequest;
use App\Http\Requests\Repair\UpdateRepairsRequest;
use App\Http\Requests\Repair\RepairFilterRequest;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class RepairsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(RepairFilterRequest $request)
    {
        $status = $request->query('status'); // Get status filter from query params

        $repairs = Repairs::with(['vehicle', 'assignedPersonnel', 'requestedBy'])
            ->when($status, function ($query, $status) {
                return $query->where('status', $status);
            })
            ->get()
            ->map(function ($repair) {
                return [
                    'repair_id' => $repair->repair_id,
                    'vehicle_name' => $repair->vehicle->vehicle_name ?? 'N/A',
                    'description' => $repair->description,
                    'scheduled_date' => $repair->scheduled_date,
                    'required_by' => $repair->required_by,
                    'urgency_level' => $repair->urgency_level,
                    'assigned_personnel' => $repair->assignedPersonnel->name ?? 'N/A',
                    'status' => $repair->status,
                    'requested_by' => $repair->requestedBy->name ?? 'N/A',
                ];
            });
    
        return Inertia::render('repairs/index', [
            'repairs' => $repairs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $users = User::select('id', 'name')->get(); // Or filter to only show personnel if needed


        return Inertia::render('repairs/add-repair', [
            'vehicles' => $vehicles,
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRepairsRequest $request)
    {
        Repairs::create($request->validated());

        return redirect()->route('repairs.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Repairs $repair)
    {
        //$repair->load(['vehicle', 'assignedPersonnel', 'requestedBy']);

        return Inertia::render('repairs/details', [
            'repair' => [
                'repair_id' => $repair->repair_id,
                'vehicle_name' => $repair->vehicle->vehicle_name ?? 'N/A',
                'description' => $repair->description,
                'scheduled_date' => $repair->scheduled_date,
                'required_by' => $repair->required_by,
                'urgency_level' => $repair->urgency_level,
                'assigned_personnel' => $repair->assignedPersonnel->name ?? 'N/A',
                'status' => $repair->status,
                'requested_by' => $repair->requestedBy->name ?? 'N/A',
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Repairs $repair)
    {

        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $users = User::select('id', 'name')->get(); // Or filter to only show personnel if needed

        return Inertia::render('repairs/edit-repair', [
            'repair' => [
                'repair_id' => $repair->repair_id,
                'vehicle_id' => $repair->vehicle_id,
                'description' => $repair->description,
                'scheduled_date' => $repair->scheduled_date,
                'required_by' => $repair->required_by,
                'urgency_level' => $repair->urgency_level,
                'assigned_personnel' => $repair->assigned_personnel,
                'status' => $repair->status,
                'requested_by' => $repair->requested_by,
            ],
            'vehicles' => $vehicles,
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRepairsRequest $request, Repairs $repair)
    {
        $repair->update($request->validated());

        return redirect()->route('repairs.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Repairs $repair)
    {
        $repair->delete();

        return redirect()->route('repairs.index');
    }
}
