<?php

namespace App\Http\Controllers;

use App\Models\ServiceInspection;
use App\Models\User;
use App\Models\ServiceRequest;
use Illuminate\Http\Request;
use App\Http\Requests\ServiceInspections\StoreServiceInspectionRequest;
use App\Http\Requests\ServiceInspections\UpdateServiceInspectionRequest;
use Inertia\Inertia;
use App\Models\Notification;

class ServiceInspectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $serviceInspections = ServiceInspection::with(['serviceRequest', 'conductedBy', 'confirmedBy'])
            ->orderBy('started_at', 'desc')
            ->get()
            ->map(function ($serviceInspection) {
                return [
                    'inspection_id' => $serviceInspection->inspection_id,
                    'request_id' => $serviceInspection->request_id,
                    'request_description' => $serviceInspection->serviceRequest->work_description ?? 'N/A',
                    'started_at' => $serviceInspection->started_at,
                    'completed_at' => $serviceInspection->completed_at,
                    'parts_available' => $serviceInspection->parts_available,
                    'personnel_available' => $serviceInspection->personnel_available,
                    'estimated_duration' => $serviceInspection->estimated_duration,
                    'conducted_by' => $serviceInspection->conductedBy ? $serviceInspection->conductedBy->first_name . ' ' . $serviceInspection->conductedBy->last_name : 'N/A',
                    'confirmed_by' => $serviceInspection->confirmedBy ? $serviceInspection->confirmedBy->first_name . ' ' . $serviceInspection->confirmedBy->last_name : '',
                ];
            });

        return inertia('services/request-inspections/index', [
            'serviceInspections' => $serviceInspections,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $requestId = $request->input('data.requestId');
        $serviceRequest = ServiceRequest::with(['vehicle', 'maintenancePlan'])
            ->where('request_id', $requestId)
            ->first();

        $serviceRequestData = [
            'request_id' => $serviceRequest->request_id,
            'work_description' => $serviceRequest->work_description,
            'date_filed' => $serviceRequest->date_filed,
            'date_received' => $serviceRequest->date_received,
            'vehicle_name' => $serviceRequest->vehicle->vehicle_name,
            'plan_name' => $serviceRequest->maintenancePlan?->scheduled_date,
            'received_by' => $serviceRequest->receivedBy ? $serviceRequest->receivedBy->first_name . ' ' . $serviceRequest->receivedBy->last_name : 'N/A',
            'service_type' => $serviceRequest->service_type,
            'requested_by' => $serviceRequest->requestedBy ? $serviceRequest->requestedBy->first_name . ' ' . $serviceRequest->requestedBy->last_name : 'N/A',
            'status' => $serviceRequest->status,
        ];

        $users = User::select('id', 'first_name', 'last_name')->get();

        return Inertia::render('services/request-inspections/add-inspection', [
            'requestId' => $requestId,
            'serviceRequest' => $serviceRequestData,
            'users' => $users,
        ]);
    }

    public function confirmInspection(ServiceInspection $request_inspection)
    {
        $request_inspection->update(['confirmed_by' => auth()->id()]);
            
            Notification::create([
                'user_id' => $request_inspection->conducted_by,
                'title' => "Inspection confirmed",
                'message' => "Your inspection for {$request_inspection->serviceRequest->work_description} has been confirmed.",
            ]);

        return redirect()->route('request-inspections.show', $request_inspection->inspection_id);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceInspectionRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['conducted_by'] = auth()->id();
        $inspection = ServiceInspection::create($validatedData);
        $inspection->serviceRequest->update(['status' => 'inspected']);
        
        $requestId = $validatedData['request_id'];

        return redirect()->route('request-inspections.show', $inspection->inspection_id);
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
                'confirmed_by' => trim(($serviceInspection->confirmedBy->first_name ?? '') . ' ' . ($serviceInspection->confirmedBy->middle_name ?? '') . ' ' . ($serviceInspection->confirmedBy->last_name ?? '')) ?: '',
                'request_id' => $serviceInspection->request_id,
                'serviceRequest' => $serviceInspection->serviceRequest ? [
                    'request_id' => $serviceInspection->serviceRequest->request_id,
                    'vehicle_name' => $serviceInspection->serviceRequest->vehicle->vehicle_name ?? 'N/A',
                    'requested_by' => trim(($serviceInspection->serviceRequest->requestedBy->first_name ?? '') . ' ' . ($serviceInspection->serviceRequest->requestedBy->middle_name ?? '') . ' ' . ($serviceInspection->serviceRequest->requestedBy->last_name ?? '')) ?: 'N/A',
                    'date_filed' => $serviceInspection->serviceRequest->date_filed,
                    'service_type' => $serviceInspection->serviceRequest->service_type,
                    'work_description' => $serviceInspection->serviceRequest->work_description,
                    'received_by' => trim(($serviceInspection->serviceRequest->receivedBy->first_name ?? '') . ' ' . ($serviceInspection->serviceRequest->receivedBy->middle_name ?? '') . ' ' . ($serviceInspection->serviceRequest->receivedBy->last_name ?? '')) ?: 'N/A',
                    'date_received' => $serviceInspection->serviceRequest->date_received ? $serviceInspection->serviceRequest->date_received : null,
                    'status' => $serviceInspection->serviceRequest->status,
                    'inspection_id' => $serviceInspection->serviceRequest->serviceInspection->inspection_id ?? 'N/A',
                ] : null,
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
