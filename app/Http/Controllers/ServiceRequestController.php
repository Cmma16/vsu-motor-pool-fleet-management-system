<?php

namespace App\Http\Controllers;

use App\Models\ServiceRequest;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\MaintenancePlan;
use Illuminate\Http\Request;
use App\Http\Requests\ServiceRequests\StoreServiceRequestRequest;
use App\Http\Requests\ServiceRequests\UpdateServiceRequestRequest;
use Inertia\Inertia;

class ServiceRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $role = $user->role->name;

        $query = ServiceRequest::with(['vehicle', 'requestedBy', 'receivedBy']);

        // Apply filtering based on role
        if ($role === 'Driver') {
            $query->where('requested_by', $user->id);
        } elseif ($role === 'Mechanic') {
            $query->whereIn('status', ['received', 'inspected', 'approved', 'conducted', 'cancelled', 'completed']);
        }
        // Admin and staff: no filters

        $serviceRequests = $query->get()->map(function ($serviceRequest) {
            return [
                'request_id' => $serviceRequest->request_id,
                'vehicle_name' => $serviceRequest->vehicle->vehicle_name ?? 'N/A',
                'vehicle_id' => $serviceRequest->vehicle_id,
                'requested_by' => $serviceRequest->requestedBy
                    ? $serviceRequest->requestedBy->first_name . ' ' . $serviceRequest->requestedBy->last_name
                    : 'N/A',
                'date_filed' => $serviceRequest->date_filed,
                'service_type' => $serviceRequest->service_type,
                'work_description' => $serviceRequest->work_description,
                'received_by' => $serviceRequest->receivedBy
                    ? $serviceRequest->receivedBy->first_name . ' ' . $serviceRequest->receivedBy->last_name
                    : 'N/A',
                'date_received' => $serviceRequest->date_received ?: 'N/A',
                'plan_id' => $serviceRequest->plan_id,
                'status' => $serviceRequest->status,
            ];
        });

        return Inertia::render('services/requests/index', [
            'serviceRequests' => $serviceRequests,
            //'userRole' => $role, // optionally pass this to conditionally render buttons on the frontend
            //'userId' => $user->id, // optional if needed on frontend
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {   
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $maintenancePlans = MaintenancePlan::with('vehicle')
            ->select('plan_id', 'vehicle_id', 'scheduled_date', 'next_service_km')
            ->where('status', 'pending')
            ->get()
                ->map(function ($plan) {
                return [
                    'plan_id' => $plan->plan_id,
                    'vehicle_id' => $plan->vehicle_id,
                    'plan_name' => $plan->vehicle->vehicle_name . ' - ' . $plan->scheduled_date . ' - ' . $plan->next_service_km,
                ];
            });
        // $users = User::select('id', 'first_name', 'last_name')->get(); delete this   

        return Inertia::render('services/requests/create-request', [
            'maintenancePlans' => $maintenancePlans,
            'vehicles' => $vehicles,
            //'users' => $users, delete this
            
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceRequestRequest $request)
    {
        $serviceRequest = $request->validated();
        $serviceRequest['requested_by'] = auth()->id();
        $serviceRequest['status'] = 'pending';
        ServiceRequest::create($serviceRequest);
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

    public function updateStatus(Request $updateRequest, ServiceRequest $request)
    {
        $serviceRequest = $request;

        $updateRequest->validate([
            'status' => 'required|string|in:pending,received,inspected,approved,cancelled,conducted,completed',
        ]);

        $serviceRequest->update(['status' => $updateRequest->status]);

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
