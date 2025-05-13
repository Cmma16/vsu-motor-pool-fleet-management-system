<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use App\Models\Vehicle;
use App\Models\User;
use App\Http\Requests\Trip\StoreTripRequest;
use App\Http\Requests\Trip\UpdateTripRequest;
use Inertia\Inertia;
class TripController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $trips = Trip::with(['vehicle', 'driver'])
            ->get()
            ->map(function ($trip) {
                return [
                    'trip_id' => $trip->trip_id,
                    'trip_number' => $trip->trip_number,
                    'date_filed' => $trip->date_filed,
                    'start_date' => $trip->start_date,
                    'end_date' => $trip->end_date,
                    'destination' => $trip->destination,
                    'purpose' => $trip->purpose,
                    'departure_time' => $trip->departure_time,
                    'requesting_party' => $trip->requesting_party,
                    'vehicle_name' => $trip->vehicle->vehicle_name,
                    'plate_number' => $trip->vehicle->plate_number,
                    'vehicle_capacity' => $trip->vehicle->capacity,
                    'driver_name' => $trip->driver->first_name . ' ' . $trip->driver->last_name,
                    'status' => $trip->status,
                ];
            });

        return Inertia::render('vehicles/trips/index', [
            'trips' => $trips,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $users = User::where('role_id', 3)->select('id', 'first_name', 'last_name')->get();

        return Inertia::render('vehicles/trips/add-trip', [
            'vehicles' => $vehicles,
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTripRequest $request)
    {
        Trip::create($request->validated());
        
        return redirect()->route('trips.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Trip $trip)
    {
        return Inertia::render('vehicles/trips/details', [
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
                'vehicle_name' => $trip->vehicle->vehicle_name,
                'driver_name' => $trip->driver->first_name . ' ' . $trip->driver->last_name,
                'status' => $trip->status,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Trip $trip)
    {
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $users = User::where('role_id', 3)->select('id', 'first_name', 'last_name')->get();

        return Inertia::render('vehicles/trips/edit-trip', [
            'vehicles' => $vehicles,
            'users' => $users,
            'trip' => $trip,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTripRequest $request, Trip $trip)
    {
        $trip->update($request->validated());

        return redirect()->route('trips.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trip $trip)
    {
        $trip->delete();

        return redirect()->route('trips.index');
    }
}
