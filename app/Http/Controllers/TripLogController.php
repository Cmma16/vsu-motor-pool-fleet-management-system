<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use App\Models\TripLog;
use App\Http\Requests\StoreTripLogRequest;
use App\Http\Requests\UpdateTripLogRequest;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\OdometerLog;

class TripLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Trip $trip)
    {
        return Inertia::render('vehicles/trips/trip-logs/create', [
            'trip' => [
                'trip_id' => $trip->trip_id,
                'trip_number' => $trip->trip_number,
                'date_filed' => $trip->date_filed,
                'start_date' => $trip->start_date,
                'end_date' => $trip->end_date,
                'purpose' => $trip->purpose,
                'destination' => $trip->destination,
                'departure_time' => $trip->departure_time,
                'requesting_party' => $trip->requesting_party,
                'vehicle' => $trip->vehicle ? [
                    'id' => $trip->vehicle->vehicle_id,
                    'name' => $trip->vehicle->vehicle_name,
                    'plate_number' => $trip->vehicle->plate_number,
                    'latest_odometer' => $trip->vehicle->latestOdometerLog ? [
                        'odometer_id' => $trip->vehicle->latestOdometerLog->odometer_id,
                        'reading' => $trip->vehicle->latestOdometerLog->reading,
                        'date_recorded' => $trip->vehicle->latestOdometerLog->date_recorded,
                    ] : null,
                ] : null,
                'driver_name' => $trip->driver ? $trip->driver->first_name . ' ' . $trip->driver->last_name : '',
                'status' => $trip->status,
                'passengers' => $trip->passengers,
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTripLogRequest $request)
    {
        $validatedData = $request->validated();
        
        // Get the trip and its vehicle
        $trip = Trip::with('vehicle')->findOrFail($validatedData['trip_id']);
        $vehicle = $trip->vehicle;
        
        // Get the latest odometer reading for the vehicle
        $latestOdometerReading = $vehicle->latestOdometerLog?->reading;
        
        // Compare the submitted odometer reading with the latest reading
        if ($latestOdometerReading !== (int)$request->input('odometer_reading')) {
            // Create a new odometer reading record
            $odometerLog = OdometerLog::create([
                'vehicle_id' => $vehicle->vehicle_id,
                'reading' => $request->input('odometer_reading'),
                'logged_at' => now(),
                'recorded_by' => auth()->id(),
            ]);
            
            // Update the odometer_out with the new odometer log ID
            $validatedData['odometer_out'] = $odometerLog->odometer_id;
        }

        // Create the trip log with pre-trip data
        $tripLog = TripLog::create($validatedData);

        // Update the trip status to 'ongoing'
        $trip->update(['status' => 'ongoing']);

        return redirect()->route('trips.show', $trip->trip_id)
            ->with('success', 'Trip started successfully');
    }

    public function endTrip(Trip $trip)
    {
        // Get the trip log for this trip
        $tripLog = $trip->tripLog;
        if (!$tripLog) {
            return redirect()->back()->with('error', 'Trip log not found.');
        }

        // Only allow ending trips that are ongoing
        if ($trip->status !== 'ongoing') {
            return redirect()->back()->with('error', 'This trip cannot be ended. Current status: ' . $trip->status);
        }

        return Inertia::render('vehicles/trips/trip-logs/end-trip', [
            'tripLog' => [
                'trip_log_id' => $tripLog->trip_log_id,
                'trip_id' => $tripLog->trip_id,
                'received_at' => $tripLog->received_at,
                'pre_trip_condition' => $tripLog->pre_trip_condition,
                'fuel_lubricant_issued_at' => $tripLog->fuel_lubricant_issued_at,
                'departure_time_actual' => $tripLog->departure_time_actual,
                'odometerOut' => $tripLog->odometerOut ? [
                    'odometer_id' => $tripLog->odometerOut->odometer_id,
                    'reading' => $tripLog->odometerOut->reading,
                ] : null,
            ],
            'trip' => [
                'trip_id' => $trip->trip_id,
                'trip_number' => $trip->trip_number,
                'date_filed' => $trip->date_filed,
                'start_date' => $trip->start_date,
                'end_date' => $trip->end_date,
                'purpose' => $trip->purpose,
                'destination' => $trip->destination,
                'departure_time' => $trip->departure_time,
                'requesting_party' => $trip->requesting_party,
                'passengers' => $trip->passengers->map(function ($passenger) use ($trip) {
                    return [
                        'id' => $passenger->id,
                        'name' => $passenger->name,
                        'affiliation' => $passenger->affiliation,
                        'contact_number' => $passenger->contact_number,
                        'is_party_head' => $passenger->is_party_head,
                        'trip_id' => $passenger->trip_id,
                        'trip_status' => $trip->status,
                    ];
                }),
                'vehicle' => $trip->vehicle ? [
                    'id' => $trip->vehicle->vehicle_id,
                    'name' => $trip->vehicle->vehicle_name,
                    'plate_number' => $trip->vehicle->plate_number,
                    'latest_odometer' => $trip->vehicle->latestOdometerLog ? [
                        'odometer_id' => $trip->vehicle->latestOdometerLog->odometer_id,
                        'reading' => $trip->vehicle->latestOdometerLog->reading,
                    ] : null,
                ] : null,
                'driver_name' => $trip->driver ? $trip->driver->first_name . ' ' . $trip->driver->last_name : '',
                'status' => $trip->status,
            ],
        ]);
    }

    public function completeTrip(UpdateTripLogRequest $request, TripLog $tripLog)
    {
        $validatedData = $request->validated();
        
        // Get the trip and its vehicle
        $trip = $tripLog->trip;
        $vehicle = $trip->vehicle;
        
        // Get the latest odometer reading for the vehicle
        $latestOdometerReading = $vehicle->latestOdometerLog?->reading;
        
        // Compare the submitted odometer reading with the latest reading
        if ($latestOdometerReading !== (int)$request->input('odometer_reading')) {
            // Create a new odometer reading record
            $odometerLog = OdometerLog::create([
                'vehicle_id' => $vehicle->vehicle_id,
                'reading' => $request->input('odometer_reading'),
                'logged_at' => now(),
                'recorded_by' => auth()->id(),
            ]);
            
            // Update the odometer_in with the new odometer log ID
            $validatedData['odometer_in'] = $odometerLog->odometer_id;
        }

        // Update the trip log with post-trip data
        $tripLog->update($validatedData);

        // Update the trip status to 'completed'
        $trip->update(['status' => 'completed']);

        return redirect()->route('trips.show', $trip->trip_id)
            ->with('success', 'Trip completed successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(TripLog $tripLog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TripLog $trip_log)
    {
        $tripLog = $trip_log;
        // Only allow editing completed trips
        if ($tripLog->trip->status !== 'completed') {
            return redirect()->back()->with('error', 'This trip log cannot be edited yet.');
        }

        return Inertia::render('vehicles/trips/trip-logs/edit-trip-log', [
            'tripLog' => [
                'trip_log_id' => $tripLog->trip_log_id,
                'trip_id' => $tripLog->trip_id,
                'received_at' => $tripLog->received_at,
                'pre_trip_condition' => $tripLog->pre_trip_condition,
                'fuel_lubricant_issued_at' => $tripLog->fuel_lubricant_issued_at,
                'departure_time_actual' => $tripLog->departure_time_actual,
                'odometerOut' => $tripLog->odometerOut ? [
                    'vehicle_id' => $tripLog->odometerOut->vehicle_id,
                    'odometer_id' => $tripLog->odometerOut->odometer_id,
                    'reading' => $tripLog->odometerOut->reading,
                    'logged_at' => $tripLog->odometerOut->logged_at,
                ] : null,
                'date_returned' => $tripLog->date_returned,
                'post_trip_condition' => $tripLog->post_trip_condition,
                'fuel_lubricant_balanced_at' => $tripLog->fuel_lubricant_balanced_at,
                'arrival_time' => $tripLog->arrival_time,
                'odometerIn' => $tripLog->odometerIn ? [
                    'vehicle_id' => $tripLog->odometerIn->vehicle_id,
                    'odometer_id' => $tripLog->odometerIn->odometer_id,
                    'reading' => $tripLog->odometerIn->reading,
                    'logged_at' => $tripLog->odometerIn->logged_at,
                ] : null,
            ],
            'trip' => [
                'trip_id' => $tripLog->trip->trip_id,
                'vehicle' => $tripLog->trip->vehicle ? [
                    'vehicle_id' => $tripLog->trip->vehicle->vehicle_id,
                    'vehicle_name' => $tripLog->trip->vehicle->vehicle_name,
                    'plate_number' => $tripLog->trip->vehicle->plate_number,
                ] : null,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTripLogRequest $request, TripLog $tripLog)
    {
        $tripLog->update($request->validated());
        return redirect()->route('trips.show', $tripLog->trip_id)
            ->with('success', 'Trip log updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TripLog $tripLog)
    {
        //
    }
}
