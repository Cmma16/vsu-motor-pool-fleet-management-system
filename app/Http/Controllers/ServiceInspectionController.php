<?php

namespace App\Http\Controllers;

use App\Models\ServiceInspection;
use App\Models\User;
use App\Models\ServiceRequest;
use App\Http\Requests\ServiceInspections\StoreServiceInspectionRequest;
use App\Http\Requests\ServiceInspections\UpdateServiceInspectionRequest;
use Inertia\Inertia;

class ServiceInspectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $serviceInspections = ServiceInspection::with(['serviceRequest', 'conductedBy', 'confirmedBy'])
            ->get()
            ->map(function ($serviceInspection) {
                return [
                    'inspection_id' => $serviceInspection->inspection_id,
                    'request_description' => $serviceInspection->serviceRequest->work_description ?? 'N/A',
                    'started_at' => $serviceInspection->started_at,
                    'completed_at' => $serviceInspection->completed_at,
                    'parts_available' => $serviceInspection->parts_available,
                    'personnel_available' => $serviceInspection->personnel_available,
                    'estimated_duration' => $serviceInspection->estimated_duration,
                    'conducted_by' => $serviceInspection->conductedBy ? $serviceInspection->conductedBy->first_name . ' ' . $serviceInspection->conductedBy->last_name : 'N/A',
                    'confirmed_by' => $serviceInspection->confirmedBy ? $serviceInspection->confirmedBy->first_name . ' ' . $serviceInspection->confirmedBy->last_name : 'N/A',
                ];
            });

        return inertia('services/request-inspections/index', [
            'serviceInspections' => $serviceInspections,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $serviceRequests = ServiceRequest::select('request_id', 'work_description')->get();
        $users = User::select('id', 'first_name', 'last_name')->get();

        return Inertia::render('services/request-inspections/add-inspection', [
            
            'serviceRequests' => $serviceRequests,
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceInspectionRequest $request)
    {
        ServiceInspection::create($request->validated());
        
        return redirect()->route('request-inspections.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(ServiceInspection $request_inspection)
    {
        $serviceInspection = $request_inspection;
        return Inertia::render('services/request-inspections/details', [
            'serviceInspection' => [
                'inspection_id' => $serviceInspection->inspection_id,
                'request_description' => $serviceInspection->serviceRequest->work_description ?? 'N/A',
                'started_at' => $serviceInspection->started_at,
                'completed_at' => $serviceInspection->completed_at,
                'parts_available' => $serviceInspection->parts_available,
                'personnel_available' => $serviceInspection->personnel_available,
                'estimated_duration' => $serviceInspection->estimated_duration,
                'conducted_by' => trim(($serviceInspection->conductedBy->first_name ?? '') . ' ' . ($serviceInspection->conductedBy->middle_name ?? '') . ' ' . ($serviceInspection->conductedBy->last_name ?? '')) ?: 'N/A',
                'confirmed_by' => trim(($serviceInspection->confirmedBy->first_name ?? '') . ' ' . ($serviceInspection->confirmedBy->middle_name ?? '') . ' ' . ($serviceInspection->confirmedBy->last_name ?? '')) ?: 'N/A',
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServiceInspection $request_inspection)
    {
        $serviceInspection = $request_inspection;
        $serviceRequests = ServiceRequest::select('request_id', 'work_description')->get();
        $users = User::select('id', 'first_name', 'last_name')->get();

        return Inertia::render('services/request-inspections/edit-inspection', [
            'serviceInspection' => [

                'inspection_id' => $serviceInspection->inspection_id,
                'request_id' => $serviceInspection->request_id,
                'started_at' => $serviceInspection->started_at,
                'completed_at' => $serviceInspection->completed_at,
                'parts_available' => $serviceInspection->parts_available,
                'personnel_available' => $serviceInspection->personnel_available,
                'estimated_duration' => $serviceInspection->estimated_duration,
                'conducted_by' => $serviceInspection->conducted_by,
                'confirmed_by' => $serviceInspection->confirmed_by,
            ],
            'serviceRequests' => $serviceRequests,
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceInspectionRequest $request, ServiceInspection $request_inspection)
    {
        $serviceInspection = $request_inspection;
        $serviceInspection->update($request->validated());

        return redirect()->route('request-inspections.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServiceInspection $request_inspection)
    {
        $serviceInspection = $request_inspection;
        $serviceInspection->delete();

        return redirect()->route('request-inspections.index');
    }
}
