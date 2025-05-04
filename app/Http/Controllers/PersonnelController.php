<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class PersonnelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $personnel = User::with(['role'])
            ->get()
            ->map(function ($personnel) {
            return [
                'user_id' => $personnel->user_id,
                'first_name' => $personnel->first_name,
                'middle_name' => $personnel->middle_name,
                'last_name' => $personnel->last_name,
                'email' => $personnel->email,
                'phone_number' => $personnel->contact_number,
                'province' => $personnel->province,
                'city' => $personnel->city,
                'barangay' => $personnel->barangay,
                'address_details' => $personnel->address_details,
                'role' => $personnel->role ? $personnel->role->role_id : 'N/A',
            ];
            });

        return Inertia::render('personnel/index', [
            'personnel' => $personnel,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $users = User::select('id', 'first_name', 'last_name')->get();

        return Inertia::render('services/requests/create-request', [
            
            'vehicles' => $vehicles,
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceRequestRequest $request)
    {
        ServiceRequest::create($request->validated());
        
        return redirect()->route('requests.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(ServiceRequest $request)
    {
        $serviceRequest = $request;
        return Inertia::render('services/requests/details', [
            'serviceRequest' => [
                'request_id' => $serviceRequest->request_id,
                'vehicle_name' => $serviceRequest->vehicle->vehicle_name ?? 'N/A',
                'requested_by' => trim(($serviceRequest->requestedBy->first_name ?? '') . ' ' . ($serviceRequest->requestedBy->middle_name ?? '') . ' ' . ($serviceRequest->requestedBy->last_name ?? '')) ?: 'N/A',
                'date_filed' => $serviceRequest->date_filed,
                'service_type' => $serviceRequest->service_type,
                'work_description' => $serviceRequest->work_description,
                'received_by' => trim(($serviceRequest->receivedBy->first_name ?? '') . ' ' . ($serviceRequest->receivedBy->middle_name ?? '') . ' ' . ($serviceRequest->receivedBy->last_name ?? '')) ?: 'N/A',
                'date_received' => $serviceRequest->date_received ? $serviceRequest->date_received : 'N/A',
                'status' => $serviceRequest->status,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServiceRequest $request)
    {
        $serviceRequest = $request;
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $users = User::select('id', 'first_name', 'last_name')->get();

        return Inertia::render('services/requests/edit-request', [
            'serviceRequest' => [
                'request_id' => $serviceRequest->request_id,
                'vehicle_id' => $serviceRequest->vehicle_id,
                'requested_by' => $serviceRequest->requested_by,
                'date_filed' => $serviceRequest->date_filed,
                'service_type' => $serviceRequest->service_type,
                'work_description' => $serviceRequest->work_description,
                'received_by' => $serviceRequest->received_by,
                'date_received' => $serviceRequest->date_received ? $serviceRequest->date_received : 'N/A',
                'status' => $serviceRequest->status,
            ],
            'vehicles' => $vehicles,
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequestRequest $updateRequest, ServiceRequest $request)
    {
        $serviceRequest = $request;
        $serviceRequest->update($updateRequest->validated());

        return redirect()->route('requests.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServiceRequest $request)
    {
        $serviceRequest = $request;
        $serviceRequest->delete();

        return redirect()->route('requests.index');
    }
}
