<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserVerificationController extends Controller
{
    /**
     * Display a listing of unverified users.
     */
    public function index(): Response
    {
        $unverifiedUsers = User::where('is_verified', false)
            ->with('role')
            ->get();

        return Inertia::render('admin/users/verification', [
            'users' => $unverifiedUsers
        ]);
    }

    /**
     * Verify a user.
     */
    public function verify(User $user)
    {
        $user->update(['is_verified' => true]);

        return back()->with('success', 'User has been verified successfully.');
    }

    /**
     * Unverify a user.
     */
    public function unverify(User $user)
    {
        $user->update(['is_verified' => false]);

        return back()->with('success', 'User has been unverified successfully.');
    }
} 