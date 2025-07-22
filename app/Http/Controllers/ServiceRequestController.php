<?php

namespace App\Http\Controllers;

use App\Models\ServiceRequest;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\MaintenancePlan;
use Illuminate\Http\Request;
use App\Http\Requests\ServiceRequests\StoreServiceRequestRequest;
use App\Http\Requests\ServiceRequests\UpdateServiceRequestRequest;
use App\Models\Notification;
use Inertia\Inertia;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;

class ServiceRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $statusFilter = $request->get('status'); // Ex: 'pending', 'approved', 'my-requests'

        $query = ServiceRequest::with(['vehicle', 'requestedBy', 'receivedBy'])
            ->orderBy('updated_at', 'desc');

        // Special filter for "my-requests"
        if ($statusFilter === 'my-requests') {
            $query->where('requested_by', $user->id);

        // Filter by valid status values
        } elseif (in_array($statusFilter, [
            'pending', 'received', 'inspected', 'approved', 'conducted', 'rejected', 'completed'
        ])) {
            $query->where('status', $statusFilter);
        }else {
            $query->whereNot('status', 'completed');
        }

        if($user->role->name === 'Driver'){
            $query->where('requested_by', $user->id);
        }
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
                'inspection_id' => $serviceRequest->serviceInspection?->inspection_id ?? '',
                'inspection_confirmed' => $serviceRequest->serviceInspection?->confirmed_by ? true : false,
                'maintenance_id' => $serviceRequest->maintenance?->maintenance_id ?? '',
            ];
        });

        return Inertia::render('services/requests/index', [
            'serviceRequests' => $serviceRequests,
            'statusFilter' => $statusFilter,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {   
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $maintenancePlans = MaintenancePlan::with('vehicle')
            ->select('plan_id', 'vehicle_id', 'scheduled_date')
            ->where('status', 'pending')
            ->get()
                ->map(function ($plan) {
                return [
                    'plan_id' => $plan->plan_id,
                    'vehicle_id' => $plan->vehicle_id,
                    'plan_name' => $plan->vehicle->vehicle_name . ' - ' . $plan->scheduled_date,
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
        $validated = $request->validated();
        $validated['requested_by'] = auth()->id();
        $validated['status'] = 'pending';
        $serviceRequest = ServiceRequest::create($validated);
        if ($serviceRequest->service_type === 'maintenance') {
            $maintenancePlan = MaintenancePlan::where('plan_id', $serviceRequest->plan_id)->first();
            $maintenancePlan->update(['status' => 'scheduled']);
        }
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
                'date_received' => $serviceRequest->date_received ? $serviceRequest->date_received : null,
                'status' => $serviceRequest->status,
                'remarks' => $serviceRequest->remarks,
                'inspection_id' => $serviceRequest->serviceInspection->inspection_id ?? 'N/A',
                'serviceInspection' => $serviceRequest->serviceInspection ? [
                    'inspection_id' => $serviceRequest->serviceInspection->inspection_id,
                    'request_description' => $serviceRequest->serviceInspection->serviceRequest->work_description ?? 'N/A',
                    'started_at' => $serviceRequest->serviceInspection->started_at,
                    'completed_at' => $serviceRequest->serviceInspection->completed_at,
                    'parts_available' => $serviceRequest->serviceInspection->parts_available,
                    'personnel_available' => $serviceRequest->serviceInspection->personnel_available,
                    'estimated_duration' => $serviceRequest->serviceInspection->estimated_duration,
                    'conducted_by' => trim(($serviceRequest->serviceInspection->conductedBy->first_name ?? '') . ' ' . ($serviceRequest->serviceInspection->conductedBy->middle_name ?? '') . ' ' . ($serviceRequest->serviceInspection->conductedBy->last_name ?? '')) ?: 'N/A',
                    'confirmed_by' => trim(($serviceRequest->serviceInspection->confirmedBy->first_name ?? '') . ' ' . ($serviceRequest->serviceInspection->confirmedBy->middle_name ?? '') . ' ' . ($serviceRequest->serviceInspection->confirmedBy->last_name ?? '')) ?: '',
                    'request_id' => $serviceRequest->serviceInspection->request_id,
                ] : null,
            ],
        ]);
    }


    public function printServiceRequest(ServiceRequest $request)
    {
        $data = ServiceRequest::with([
            'serviceInspection.conductedBy.role',
            'serviceInspection.confirmedBy.role',
            'receivedBy.role',
            'requestedBy.role'
        ])->find($request->request_id);

        $data->formatted_date_filed = Carbon::parse($data->date_filed)->format('F d, Y');
        $data->formatted_date_received = Carbon::parse($data->date_received)->format('F d, Y');
        $data->requested_by_name = $data->requestedBy->first_name . ' ' . $data->requestedBy->last_name;
        $data->received_by_name = $data->receivedBy->first_name . ' ' . $data->receivedBy->last_name;
        $data->date_of_inspection = Carbon::parse($data->serviceInspection->started_at)->format('F d, Y');
        $data->time_started = Carbon::parse($data->serviceInspection->started_at)->format('h:i');
        $data->time_ended = Carbon::parse($data->serviceInspection->completed_at)->format('h:i');

        if ($data->serviceInspection) {
            $data->conducted_by_name = $data->serviceInspection->conductedBy->first_name . ' ' . $data->serviceInspection->conductedBy->last_name;
            $data->confirmed_by_name = $data->serviceInspection->confirmedBy->first_name . ' ' . $data->serviceInspection->confirmedBy->last_name;
        }

        return Pdf::loadView('pdf.service-request', compact('data'))
            ->setPaper('a4', 'portrait')
            ->stream('service-request.pdf');
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServiceRequest $request)
    {
        $serviceRequest = $request;
        $vehicles = Vehicle::select('vehicle_id', 'vehicle_name')->get();
        $maintenancePlans = MaintenancePlan::with('vehicle')
            ->select('plan_id', 'vehicle_id', 'scheduled_date')
            ->get()
                ->map(function ($plan) {
                return [
                    'plan_id' => $plan->plan_id,
                    'vehicle_id' => $plan->vehicle_id,
                    'plan_name' => $plan->vehicle->vehicle_name . ' - ' . $plan->scheduled_date,
                ];
            });
        $users = User::select('id', 'first_name', 'last_name')->get();

        return Inertia::render('services/requests/edit-request', [
            'serviceRequest' => [
                'request_id' => $serviceRequest->request_id,
                'plan_id' => $serviceRequest->plan_id ?? null,
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
            'maintenancePlans' => $maintenancePlans,
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
            'status' => 'required|string|in:pending,received,inspected,approved,rejected,cancelled,conducted,completed',
        ]);

        $updateData = ['status' => $updateRequest->status];
        
        if ($updateRequest->status === 'received') {
            $updateData['received_by'] = auth()->id();
            $updateData['date_received'] = now()->setTimezone('Asia/Manila')->format('Y-m-d H:i:s');
            
            Notification::create([
                'user_id' => $serviceRequest->requested_by,
                'title' => "Service Request Received",
                'message' => "Your {$serviceRequest->service_type} request for {$serviceRequest->vehicle->vehicle_name} has been received.",
            ]);
        }

        if ($updateRequest->status === 'approved') {
            $serviceRequest->vehicle->update(['status' => 'under maintenance']);
        }

        if($updateRequest->status === 'rejected')
        {
            $updateData['remarks'] = $updateRequest->remarks;
        }

        $serviceRequest->update($updateData);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServiceRequest $request)
    {
        $serviceRequest = $request;
        $serviceRequest->delete();
        if ($serviceRequest->service_type === 'maintenance') {
            $maintenancePlan = MaintenancePlan::where('plan_id', $serviceRequest->plan_id)->first();
            $maintenancePlan->update(['status' => 'pending']);
        }

        return redirect()->route('requests.index');
    }
}
