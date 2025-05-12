<?php

namespace App\Http\Controllers;

use App\Models\OdometerLog;
use App\Models\Vehicle;
use App\Http\Requests\OdometerLogs\StoreOdometerLogRequest;
use App\Http\Requests\OdometerLogs\UpdateOdometerLogRequest;
use Inertia\Inertia;

class OdometerLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name', 'plate_number', 'asset_tag')->get();
        $odometerLogs = OdometerLog::with(['vehicle', 'recordedBy'])
            ->get()
            ->map(function ($odometerLogs) {
                return [
                    'odometer_id' => $odometerLogs->odometer_id,
                    'vehicle_name' => $odometerLogs->vehicle->vehicle_name ?? 'N/A',
                    'vehicle_id' => $odometerLogs->vehicle_id,
                    'logged_at' => $odometerLogs->logged_at,
                    'reading' => $odometerLogs->reading,
                    'recorded_by' => $odometerLogs->recordedBy ? $odometerLogs->recordedBy->first_name . ' ' . $odometerLogs->recordedBy->last_name : 'N/A',
                ];
            });
    
        return Inertia::render('odometer/index', [
            'odometerLogs' => $odometerLogs,
            'vehicles' => $vehicles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOdometerLogRequest $request)
    {
        $odometerLog = $request->validated();
        $odometerLog['recorded_by'] = auth()->id();

        OdometerLog::create($odometerLog);
    }

    /**
     * Display the specified resource.
     */
    public function show(OdometerLog $odometerLog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OdometerLog $odometerLog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOdometerLogRequest $request, OdometerLog $odometer)
    {
        $odometerLog = $odometer;
        $odometerLog->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OdometerLog $odometer)
    {
        $odometerLog = $odometer;
        $odometerLog->delete();

        return redirect()->route('odometer.index');
    }
}
