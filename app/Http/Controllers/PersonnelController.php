<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserRole;
use Inertia\Inertia;

class PersonnelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = UserRole::select('role_id', 'name')->get();
        $personnel = User::where('is_verified', 1)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($personnel) {
                return [
                    'id' => $personnel->id,
                    'personnel_name' => $personnel->first_name . ' ' . $personnel->last_name,
                    'email' => $personnel->email,
                    'phone_number' => $personnel->contact_number,
                    'role_id' => $personnel->role_id,
                    'is_verified' => $personnel->is_verified,
                ];
            });

        $unverifiedPersonnel = User::where('is_verified', 0)
            ->get()
            ->map(function ($personnel) {
                return [
                    'id' => $personnel->id,
                    'personnel_name' => $personnel->first_name . ' ' . $personnel->last_name,
                    'email' => $personnel->email,
                    'phone_number' => $personnel->contact_number,
                    'created_at' => $personnel->created_at,
                    'is_verified' => $personnel->is_verified,
                ];
            });

        return Inertia::render('personnel/index', [
            'unverifiedPersonnel' => $unverifiedPersonnel,
            'personnel' => $personnel,
            'roles' => $roles,
        ]);
    }

    public function updateRole(Request $request, User $person)
    {
        $request->validate([
            'role' => 'required|exists:user_roles,role_id'
        ]);

        $person->role_id = $request->role;
        $person->save();

        return back()->with('success', 'Role updated successfully');
    }

    public function verifyPersonnel(User $person)
    {
        $person->markAsVerified();

        return back()->with('success', 'Personnel verified successfully');
    }

    public function unverifyPersonnel(User $person)
    {
        $person->markAsUnverified();

        return back()->with('success', 'Personnel unverified successfully');
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
    public function store(StoreServiceRequestRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $personnel)
    {
        return Inertia::render('personnel/details', [
            'personnel' => $personnel
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServiceRequest $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $personnel)
    {
        $request->validate([
            'role_id' => 'required|exists:user_roles,role_id',
        ]);
    
        $personnel->update($request->validated());
        return redirect()->route('personnel.index')->with('success', 'User role updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServiceRequest $request)
    {
        //
    }
}
