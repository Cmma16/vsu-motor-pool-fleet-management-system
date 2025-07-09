<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class PreloadedUserRegistrationController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/preloaded-registration');
    }

    public function checkUser(Request $request) 
    {
        $request->validate([
            'employee_id' => 'required'
        ]);

        $user = User::where('employee_id', $request->employee_id)->first();

        if (!$user) {
            return response()->json([
                'status' => 'not_found',
                'message' => 'Employee ID not found in the system.'
            ], 404);
        }

        if ($user->email && $user->password) {
            return response()->json([
                'status' => 'already_registered',
                'message' => 'This employee has already registered.'
            ], 409);
        }

        return response()->json([
            'status' => 'ok',
            'message' => 'Employee ID is valid. Proceed with registration.',
            'data' => [
                'employee_id' => $user->employee_id,
                'first_name' => $user->first_name,
                'middle_name' => $user->middle_name ?? '',
                'last_name' => $user->last_name,
                'name_extension' => $user->name_extension ?? null,
                'email' => $user->email ?? null,
            ]
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function registerEmployee(Request $request): RedirectResponse
    {
        $user = User::where('employee_id', $request->employee_id)->first();
        $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'name_extension' => 'nullable|string|max:10',
            'role_id' => 'nullable|integer|exists:'.UserRole::class.',role_id',
            //'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $updateData = [
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'name_extension' => $request->name_extension,
            'role_id' => $request->role_id,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ];

        // If role_id is not null, set is_verified to true
        if (!is_null($request->role_id)) {
            $updateData['is_verified'] = true;
        }

        $user->update($updateData);

        event(new Registered($user));

        // Auth::login($user);

        // return to_route('dashboard');
        return to_route('login');
    }
}
