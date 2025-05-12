<?php

namespace App\Http\Controllers;

use App\Models\Repairs;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\ServiceRequest;
use App\Models\OdometerLog;
use App\Http\Requests\Repair\StoreRepairsRequest;
use App\Http\Requests\Repair\UpdateRepairsRequest;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class RepairsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $repairs = Repairs::with(['vehicle', 'performedBy', 'confirmedBy', 'serviceRequest', 'odometerReading'])
            ->get()
            ->map(function ($repair) {
                return [
                    'repair_id' => $repair->repair_id,
                    'vehicle_name' => $repair->vehicle->vehicle_name ?? 'N/A',
                    'request_id' => $repair->request_id,
                    'performed_by' => $repair->performedBy ? $repair->performedBy->first_name . ' ' . $repair->performedBy->last_name : 'N/A',
                    'confirmed_by' => $repair->confirmedBy ? $repair->confirmedBy->first_name . ' ' . $repair->confirmedBy->last_name : 'N/A',
                    'repair_summary' => $repair->repair_summary,
                    'odometer_reading' => $repair->odometerReading ? $repair->odometerReading->reading : 'N/A',
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
        $users = User::select('id', 'first_name', 'last_name')->get();
        $serviceRequests = ServiceRequest::select('request_id', 'work_description')->get();
        $odometerLogs = OdometerLog::select('odometer_id', 'vehicle_id', 'reading', 'created_at')->get();


        return Inertia::render('repairs/add-repair', [
            'vehicles' => $vehicles,
            'users' => $users,
            'serviceRequests' => $serviceRequests,
            'odometerLogs' => $odometerLogs,
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
                'request_description' => $repair->serviceRequest->work_description ?? 'N/A',
                'performed_by' => trim(($repair->performedBy->first_name ?? '') . ' ' . ($repair->performedBy->middle_name ?? '') . ' ' . ($repair->performedBy->last_name ?? '')) ?: 'N/A',
                'confirmed_by' => trim(($repair->confirmedBy->first_name ?? '') . ' ' . ($repair->confirmedBy->middle_name ?? '') . ' ' . ($repair->confirmedBy->last_name ?? '')) ?: 'N/A',
                'repair_summary' => $repair->repair_summary,
                'odometer_reading' => $repair->odometerReading ? $repair->odometerReading->reading : 'N/A',
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Repairs $repair)
    {

        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $users = User::select('id', 'first_name', 'last_name')->get(); // Or filter to only show personnel if needed
        $serviceRequests = ServiceRequest::select('request_id', 'work_description')->get();
        $odometerLogs = OdometerLog::select('odometer_id', 'vehicle_id', 'reading')->get();

        return Inertia::render('repairs/edit-repair', [
            'repair' => [
                'repair_id' => $repair->repair_id,
                'vehicle_id' => $repair->vehicle_id,
                'request_id' => $repair->request_id,
                'performed_by' => $repair->performed_by,
                'confirmed_by' => $repair->confirmed_by,
                'repair_summary' => $repair->repair_summary,
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
