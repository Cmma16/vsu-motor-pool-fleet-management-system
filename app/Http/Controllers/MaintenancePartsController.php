<?php

namespace App\Http\Controllers;

use App\Models\MaintenanceParts;
use App\Http\Requests\MaintenancePart\StoreMaintenancePartsRequest;
use App\Http\Requests\MaintenancePart\UpdateMaintenancePartsRequest;

class MaintenancePartsController extends Controller
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
    public function store(StoreMaintenancePartsRequest $request)
    {
        $maintenanceParts = $request->validated();

        MaintenanceParts::create($maintenanceParts);
    }

    /**
     * Display the specified resource.
     */
    public function show(MaintenanceParts $maintenanceParts)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MaintenanceParts $maintenanceParts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaintenancePartsRequest $request, MaintenanceParts $maintenancePart)
    {
        $maintenancePart->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MaintenanceParts $maintenancePart)
    {
        $maintenancePart->delete();
    }
}
