<?php

namespace App\Http\Controllers;

use App\Models\Passenger;
use App\Http\Requests\StorePassengerRequest;
use App\Http\Requests\UpdatePassengerRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PassengerController extends Controller
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
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePassengerRequest $request)
    {
        $passenger = Passenger::create($request->validated());

        return redirect()->route('trips.show', $request->trip_id)->with('success', 'Passenger added successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Passenger $passenger)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Passenger $passenger)
    {
        //
    }

    public function assignPartyHead(Request $request, $passengerId)
    {
        $passenger = Passenger::findOrFail($passengerId);
        $tripId = $passenger->trip_id;

        DB::transaction(function () use ($tripId, $passenger) {
            // Unset existing party head for this trip
            Passenger::where('trip_id', $tripId)
                ->where('is_party_head', true)
                ->update(['is_party_head' => false]);

            // Set the new party head
            $passenger->is_party_head = true;
            $passenger->save();
        });

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePassengerRequest $request, Passenger $passenger)
    {
        $passenger->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Passenger $passenger)
    {
        $passenger->delete();
    }
}
