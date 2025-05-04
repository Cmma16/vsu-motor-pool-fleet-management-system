<?php

namespace App\Http\Controllers;

use App\Models\ServiceAccomplishment;
use App\Models\User;
use App\Models\ServiceRequest;
use App\Http\Requests\ServiceAccomplishments\StoreServiceAccomplishmentRequest;
use App\Http\Requests\ServiceAccomplishments\UpdateServiceAccomplishmentRequest;
use Inertia\Inertia;

class ServiceAccomplishmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $serviceAccomplishments = ServiceAccomplishment::with(['serviceRequest', 'conductedBy', 'verifiedBy'])
            ->get()
            ->map(function ($serviceAccomplishment) {
                return [
                    'accomplishment_id' => $serviceAccomplishment->accomplishment_id,
                    'request_description' => $serviceAccomplishment->serviceRequest->work_description ?? 'N/A',
                    'started_at' => $serviceAccomplishment->started_at,
                    'completed_at' => $serviceAccomplishment->completed_at,
                    'conducted_by' => $serviceAccomplishment->conductedBy ? $serviceAccomplishment->conductedBy->first_name . ' ' . $serviceAccomplishment->conductedBy->last_name : 'N/A',
                    'verified_by' => $serviceAccomplishment->verifiedBy ? $serviceAccomplishment->verifiedBy->first_name . ' ' . $serviceAccomplishment->verifiedBy->last_name : 'N/A',
                ];
            });

            return inertia('services/completed/index', [
                'serviceAccomplishments' => $serviceAccomplishments,
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $serviceRequests = ServiceRequest::select('request_id', 'work_description')->get();
        $users = User::select('id', 'first_name', 'last_name')->get();

        return Inertia::render('services/completed/add-accomplishment', [
            
            'serviceRequests' => $serviceRequests,
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceAccomplishmentRequest $request)
    {
        ServiceAccomplishment::create($request->validated());
        
        return redirect()->route('completed.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(ServiceAccomplishment $completed)
    {
        $serviceAccomplishment = $completed;
        return Inertia::render('services/completed/details', [
            'serviceAccomplishment' => [
                'accomplishment_id' => $serviceAccomplishment->accomplishment_id,
                'request_description' => $serviceAccomplishment->serviceRequest->work_description ?? 'N/A',
                'started_at' => $serviceAccomplishment->started_at,
                'completed_at' => $serviceAccomplishment->completed_at,
                'conducted_by' => trim(($serviceAccomplishment->conductedBy->first_name ?? '') . ' ' . ($serviceAccomplishment->conductedBy->middle_name ?? '') . ' ' . ($serviceAccomplishment->conductedBy->last_name ?? '')) ?: 'N/A',
                'verified_by' => trim(($serviceAccomplishment->verifiedBy->first_name ?? '') . ' ' . ($serviceAccomplishment->verifiedBy->middle_name ?? '') . ' ' . ($serviceAccomplishment->verifiedBy->last_name ?? '')) ?: 'N/A',
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServiceAccomplishment $completed)
    {
        $serviceAccomplishment = $completed;
        $serviceRequests = ServiceRequest::select('request_id', 'work_description')->get();
        $users = User::select('id', 'first_name', 'last_name')->get();

        return Inertia::render('services/completed/edit-accomplishment', [
            'serviceAccomplishment' => [
                'accomplishment_id' => $serviceAccomplishment->accomplishment_id,
                'request_id' => $serviceAccomplishment->request_id,
                'started_at' => $serviceAccomplishment->started_at,
                'completed_at' => $serviceAccomplishment->completed_at,
                'conducted_by' => $serviceAccomplishment->conducted_by,
                'verified_by' => $serviceAccomplishment->verified_by,
            ],
            'serviceRequests' => $serviceRequests,
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceAccomplishmentRequest $request, ServiceAccomplishment $completed)
    {
        $serviceAccomplishment = $completed;
        $serviceAccomplishment->update($request->validated());

        return redirect()->route('completed.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServiceAccomplishment $completed)
    {
        $serviceAccomplishment = $completed;
        $serviceAccomplishment->delete();

        return redirect()->route('completed.index');
    }
}
