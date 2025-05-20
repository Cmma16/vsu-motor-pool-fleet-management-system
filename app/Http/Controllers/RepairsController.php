<?php

namespace App\Http\Controllers;

use App\Models\Repairs;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\ServiceRequest;
use App\Models\OdometerLog;
use App\Models\RepairParts;
use App\Models\Part;
use App\Http\Requests\Repair\StoreRepairsRequest;
use App\Http\Requests\Repair\UpdateRepairsRequest;
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
    public function create(Request $request)
    {
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $users = User::select('id', 'first_name', 'last_name')->get();
        $serviceRequests = ServiceRequest::select('request_id', 'work_description')->get();
        $odometerLogs = OdometerLog::select('odometer_id', 'vehicle_id', 'reading', 'created_at')->get();


        return Inertia::render('repairs/add-repair', [
            'requestId' => $request->input('data.requestId'),
            'vehicleId' => $request->input('data.vehicleId'),
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
        $validatedData = $request->validated();
        $validatedData['performed_by'] = auth()->id();
        $newRepair = Repairs::create($validatedData);

        return redirect()->route('repairs.show', $newRepair->repair_id)->with('success', 'Repair record created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Repairs $repair)
    {
        $repairParts = RepairParts::with('part')->where('repair_id', $repair->repair_id)->get()
            ->map(function ($repairPart) {
            return [
                'id' => $repairPart->id,
                'repair_id' => $repairPart->repair_id,
                'part_id' => $repairPart->part_id,
                'part_name' => $repairPart->part->part_name,
                'quantity_used' => $repairPart->quantity_used,
            ];
        });

        $parts = Part::select('part_id', 'part_name')->get();
        return Inertia::render('repairs/details', [
            'repair' => [
                'repair_id' => $repair->repair_id,
                'vehicle_name' => $repair->vehicle->vehicle_name ?? 'N/A',
                'request_description' => $repair->serviceRequest->work_description ?? 'N/A',
                'performed_by' => $repair->performedBy ? $repair->performedBy->first_name . ' ' . $repair->performedBy->last_name : 'N/A',
                'confirmed_by' => $repair->confirmedBy ? $repair->confirmedBy->first_name . ' ' . $repair->confirmedBy->last_name : null,
                'repair_summary' => $repair->repair_summary,
                'odometer_reading' => $repair->odometerReading ? $repair->odometerReading->reading : 'N/A',
            ],
            'parts' => $parts,
            'repairParts' => $repairParts,
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
