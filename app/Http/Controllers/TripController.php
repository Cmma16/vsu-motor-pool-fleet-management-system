<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use App\Models\Vehicle;
use App\Models\User;
use App\Http\Requests\Trip\StoreTripRequest;
use App\Http\Requests\Trip\UpdateTripRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class TripController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        
        $query = Trip::with(['vehicle', 'driver']);
        
        // If user is a driver (role_id 3), only show their assigned trips
        if ($user->role->name === 'Driver') {
            $query->where('driver_id', $user->id);
        }
        
        $trips = $query->get()
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
                    'plate_number' => $trip->vehicle->plate_number ?? 'N/A',
                    'driver_name' => $trip->driver ? $trip->driver->first_name . ' ' . $trip->driver->last_name : '',
                    'status' => $trip->status,
                    "vehicle" => $trip->vehicle ?? "",
                    "updated_at" => $trip->updated_at,
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
            'available_vehicles' => $vehicles,
            'available_drivers' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTripRequest $request)
    {
        $user = auth()->user();
        $validatedData = $request->validated();
        
        // Extract passengers data from the request
        $passengers = $request->input('passengers', []);

        $validatedData['status'] = 'pending';
        $validatedData['dispatcher_id'] = $user->id;
        
        // Use DB transaction to ensure data consistency
        DB::transaction(function () use ($validatedData, $passengers) {
            // Create the trip
            $trip = Trip::create($validatedData);
            
            // Create passengers if any
            if (!empty($passengers)) {
                $trip->passengers()->createMany($passengers);
            }
        });

        return redirect()->route('trips.index')->with('success', 'Trip created successfully');
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
                'vehicle_name' => $trip->vehicle ? $trip->vehicle->vehicle_name : '',
                'driver_name' => $trip->driver ? $trip->driver->first_name . ' ' . $trip->driver->last_name : '',
                'status' => $trip->status,
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
            ],
        ]);
    }

    public function assign(Trip $trip)
    {
        // Get available vehicles and drivers for the trip's date range
        $unavailableVehicles = Trip::where(function ($query) use ($trip) {
            $query->whereBetween('start_date', [$trip->start_date, $trip->end_date])
                ->orWhereBetween('end_date', [$trip->start_date, $trip->end_date])
                ->orWhere(function ($q) use ($trip) {
                    $q->where('start_date', '<=', $trip->start_date)
                        ->where('end_date', '>=', $trip->end_date);
                });
        })
        ->whereIn('status', ['assigned', 'dispatched', 'approved', 'ongoing', 'pending'])
        ->where('trip_id', '!=', $trip->trip_id) // Exclude current trip
        ->pluck('vehicle_id');

        $unavailableDrivers = Trip::where(function ($query) use ($trip) {
            $query->whereBetween('start_date', [$trip->start_date, $trip->end_date])
                ->orWhereBetween('end_date', [$trip->start_date, $trip->end_date])
                ->orWhere(function ($q) use ($trip) {
                    $q->where('start_date', '<=', $trip->start_date)
                        ->where('end_date', '>=', $trip->end_date);
                });
        })
        ->whereIn('status', ['assigned', 'dispatched', 'approved', 'ongoing', 'pending'])
        ->where('trip_id', '!=', $trip->trip_id) // Exclude current trip
        ->pluck('driver_id');

        $availableVehicles = Vehicle::whereNotIn('vehicle_id', $unavailableVehicles)
            ->select('vehicle_id', 'vehicle_name', 'vehicle_type', 'capacity')
            ->get();

        $availableDrivers = User::where('role_id', 3)
            ->whereNotIn('id', $unavailableDrivers)
            ->select('id', 'first_name', 'last_name')
            ->get();

        return Inertia::render('vehicles/trips/assign-trip', [
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
                'vehicle_name' => $trip->vehicle ? $trip->vehicle->vehicle_name : '',
                'driver_name' => $trip->driver ? $trip->driver->first_name . ' ' . $trip->driver->last_name : '',
                'status' => $trip->status,
                'passengers' => $trip->passengers,
                'passenger_count' => $trip->passengers->count(),
            ],
            'availableVehicles' => $availableVehicles,
            'availableDrivers' => $availableDrivers,
        ]);
    }

    public function updateStatus(Request $request, Trip $trip)
    {
        $request->validate([
            'status' => 'required|string|in:pending,rejected,assigned,received,ongoing,completed,cancelled',
        ]);

        $trip->update(['status' => $request->status]);

        return redirect()->route('trips.show', $trip->trip_id);
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
            'available_vehicles' => $vehicles,
            'available_drivers' => $users,
            'trip' => $trip,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTripRequest $request, Trip $trip)
    {
        $validatedData = $request->validated();
        
        // If vehicle and driver are being assigned, update status to 'assigned'
        if (isset($validatedData['vehicle_id']) && isset($validatedData['driver_id'])) {
            $validatedData['status'] = 'assigned';
        }

        // Use DB transaction to ensure data consistency
        DB::transaction(function () use ($trip, $validatedData) {
            $trip->update($validatedData);
        });

        return redirect()->route('trips.show', $trip->trip_id)
            ->with('success', 'Trip updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trip $trip)
    {
        $trip->delete();

        return redirect()->route('trips.index');
    }

    /**
     * Check vehicle and driver availability for a given date range
     */
    public function checkAvailability(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $startDate = $request->start_date;
        $endDate = $request->end_date;
        
        // Get all vehicles that have trips in the given date range
        $unavailableVehicles = Trip::where(function ($query) use ($startDate, $endDate) {
            $query->whereBetween('start_date', [$startDate, $endDate])
                ->orWhereBetween('end_date', [$startDate, $endDate])
                ->orWhere(function ($q) use ($startDate, $endDate) {
                    $q->where('start_date', '<=', $startDate)
                        ->where('end_date', '>=', $endDate);
                });
        })
        ->whereIn('status', ['assigned', 'dispatched', 'approved', 'ongoing', 'pending'])
        ->pluck('vehicle_id');

        // Get all drivers that have trips in the given date range
        $unavailableDrivers = Trip::where(function ($query) use ($startDate, $endDate) {
            $query->whereBetween('start_date', [$startDate, $endDate])
                ->orWhereBetween('end_date', [$startDate, $endDate])
                ->orWhere(function ($q) use ($startDate, $endDate) {
                    $q->where('start_date', '<=', $startDate)
                        ->where('end_date', '>=', $endDate);
                });
        })
        ->whereIn('status', ['assigned', 'dispatched', 'approved', 'ongoing', 'pending'])
        ->pluck('driver_id');

        // Get available vehicles and drivers
        $availableVehicles = Vehicle::whereNotIn('vehicle_id', $unavailableVehicles)
            ->select('vehicle_id', 'vehicle_name')
            ->get();

        $availableDrivers = User::where('role_id', 3)
            ->whereNotIn('id', $unavailableDrivers)
            ->select('id', 'first_name', 'last_name')
            ->get();

        return response()->json([
            'available_vehicles' => $availableVehicles,
            'available_drivers' => $availableDrivers,
        ]);
    }
}
