<?php

namespace App\Http\Controllers;

use App\Models\RepairParts;
use App\Http\Requests\RepairPart\StoreRepairPartsRequest;
use App\Http\Requests\RepairPart\UpdateRepairPartsRequest;

class RepairPartsController extends Controller
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRepairPartsRequest $request)
    {
        $repairParts = $request->validated();

        RepairParts::create($repairParts);
    }

    /**
     * Display the specified resource.
     */
    public function show(RepairParts $repairParts)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RepairParts $repairParts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRepairPartsRequest $request, RepairParts $repairPart)
    {
        $repairPart->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RepairParts $repairParts)
    {
        $repairParts->delete();
    }
}
