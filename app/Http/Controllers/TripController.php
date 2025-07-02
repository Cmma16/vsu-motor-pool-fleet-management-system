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
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Notification;
use Carbon\Carbon;

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
        
        $trips = $query->orderBy('created_at', 'desc')->get()
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
                'vehicle' => $trip->vehicle ? [
                    'name' => $trip->vehicle->vehicle_name,
                ] : null,
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
                'trip_log_id' => $trip->tripLog?->trip_log_id,
                'pre_trip' => $trip->tripLog ? [
                    'received_at' => $trip->tripLog->received_at,
                    'pre_trip_condition' => $trip->tripLog->pre_trip_condition,
                    'departure_time' => $trip->tripLog->departure_time_actual,
                    'odometer_out' => $trip->tripLog->odometerOut?->reading ?? null,
                ] : null,
                'post_trip' => $trip->tripLog ? [
                    'date_returned' => $trip->tripLog->date_returned ?? null,
                    'post_trip_condition' => $trip->tripLog->post_trip_condition ?? null,
                    'arrival_time' => $trip->tripLog->arrival_time ?? null,
                    'odometer_in' => $trip->tripLog->odometerIn->reading ?? null,
                ] : null,
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
        ->whereIn('status', ['assigned', 'dispatched', 'approved', 'ongoing'])
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
        ->whereIn('status', ['assigned', 'dispatched', 'approved', 'ongoing'])
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

    public function printTripRecord(Trip $trip) 
    {
        $trip = Trip::with(['vehicle', 'driver', 'passengers', 'tripLog.odometerOut', 'tripLog.odometerIn', 'dispatcher'])->find($trip->trip_id);
        
        $trip->formatted_date_filed = Carbon::parse($trip->date_filed)->format('F d, Y');
        
        $start = Carbon::parse($trip->start_date);
        $end = Carbon::parse($trip->end_date);
        if ($start->isSameDay($end)) {
            $trip->scheduled_date = $start->format('F d, Y');
        } elseif ($start->isSameMonth($end)) {
            $trip->scheduled_date = $start->format('F d') . ' - ' . $end->format('d, Y');
        } else {
            $trip->scheduled_date = $start->format('F d') . ' - ' . $end->format('F d, Y');
        }
        $trip->formatted_departure_time = Carbon::parse($trip->departure_time)->format('h:i A');
        $trip->party_head = $trip->passengers->firstWhere('is_party_head', true);
        $trip->dispatcher_name = strtoupper($trip->dispatcher->first_name) . ' ' . strtoupper($trip->dispatcher->last_name);
        $trip->driver_name = strtoupper($trip->driver->first_name) . ' ' . strtoupper($trip->driver->last_name);
        $trip->ticket_received = Carbon::parse($trip->tripLog->received_at)->format('F d, Y');
        $trip->actual_departure = Carbon::parse($trip->tripLog->departure_time_actual)->format('h:i A');
        
        $trip->vehicle_returned = Carbon::parse($trip->tripLog->date_returned)->format('F d, Y');
        $trip->arrival = Carbon::parse($trip->tripLog->arrival_time)->format('h:i A');

        // Split passengers into groups of 10
        $passengerChunks = $trip->passengers->chunk(10);

        $pdf = Pdf::loadView('pdf.trip-ticket', compact([
            'trip',
            "passengerChunks"
            ]))
            ->setPaper('a4', "portrait");
        return $pdf->stream('trip-ticket-' . $trip->trip_number . '.pdf');
    }

    public function updateStatus(Request $request, Trip $trip)
    {
        $request->validate([
            'status' => 'required|string|in:pending,rejected,assigned,received,ongoing,completed,cancelled',
        ]);

        $trip->update(['status' => $request->status]);
        if ($request->status == 'ongoing') {
            $trip->vehicle->update(['status' => 'in use']);
        }
        if ($request->status == 'completed') {
            $trip->vehicle->update(['status' => 'available']);
        }
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

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTripRequest $request, Trip $trip)
    {
        $validatedData = $request->validated();
        
        // If vehicle and driver are being assigned, update status to 'assigned'
        if (isset($validatedData['vehicle_id']) && isset($validatedData['driver_id'])) {
            $validatedData['status'] = 'assigned';
            Notification::create([
                'user_id' => $validatedData['driver_id'],
                'title' => 'Trip Assigned',
                'message' => 'You have been assigned to a trip to ' . $trip->destination . ' on ' . Carbon::parse($trip->start_date)->format('M d, Y'),
            ]);
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

    public function checkAvailability(Request $request)
    {
        $start = $request->query('start_date');
        $end = $request->query('end_date');

        if (!$start || !$end) {
            return response()->json(['error' => 'Start and end dates are required.'], 400);
        }

        // Step 1: Get conflicting trips
        $conflictingTrips = Trip::where(function ($query) use ($start, $end) {
            $query->whereBetween('start_date', [$start, $end])
                ->orWhereBetween('end_date', [$start, $end])
                ->orWhere(function ($q) use ($start, $end) {
                    $q->where('start_date', '<=', $start)
                        ->where('end_date', '>=', $end);
                });
        })
        ->whereIn('status', ['assigned', 'approved', 'ongoing'])
        ->select('trip_id', 'trip_number', 'start_date', 'end_date', 'driver_id', 'vehicle_id')
        ->get();

        // Step 2: Group conflicting trips by driver and vehicle
        $driverTripMap = $conflictingTrips->groupBy('driver_id');
        $vehicleTripMap = $conflictingTrips->groupBy('vehicle_id');

        // Step 3: Fetch all vehicles and attach status + conflictingTrips
        $vehicles = Vehicle::select('vehicle_id as id', 'vehicle_name as name', 'vehicle_type as type', 'plate_number', 'capacity')
            ->get()
            ->map(function ($vehicle) use ($vehicleTripMap) {
                $conflictingTrips = $vehicleTripMap->get($vehicle->id, collect())->map(function ($trip) {
                    return [
                        'trip_id' => $trip->trip_id,
                        'trip_number' => $trip->trip_number,
                        'start_date' => $trip->start_date,
                        'end_date' => $trip->end_date,
                    ];
                })->values();

                return [
                    'id' => $vehicle->id,
                    'name' => $vehicle->name,
                    'type' => $vehicle->type,
                    'plate_number' => $vehicle->plate_number,
                    'capacity' => $vehicle->capacity,
                    'isAvailable' => $conflictingTrips->isEmpty(),
                    'conflictingTrips' => $conflictingTrips,
                ];
            });

        // Step 4: Fetch all drivers and attach status + conflictingTrips
        $drivers = User::where('role_id', 3) // Assuming role_id 3 is for drivers
            ->select('id', 'first_name', 'last_name', 'contact_number')
            ->get()
            ->map(function ($driver) use ($driverTripMap) {
                $conflictingTrips = $driverTripMap->get($driver->id, collect())->map(function ($trip) {
                    return [
                        'trip_id' => $trip->trip_id,
                        'trip_number' => $trip->trip_number,
                        'start_date' => $trip->start_date,
                        'end_date' => $trip->end_date,
                    ];
                })->values();

                return [
                    'id' => $driver->id,
                    'name' => $driver->first_name . ' ' . $driver->last_name,
                    'contact' => $driver->contact_number,
                    'avatar' => null,
                    'isAvailable' => $conflictingTrips->isEmpty(),
                    'conflictingTrips' => $conflictingTrips,
                ];
            });

        return response()->json([
            'drivers' => $drivers,
            'vehicles' => $vehicles,
        ]);
    }

}
