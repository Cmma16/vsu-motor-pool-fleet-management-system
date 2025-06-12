<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureUserIsVerified
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        // Check if logged in AND not verified
        if ($user) {
            // Check email verification first
            if (!$user->hasVerifiedEmail()) {
                return redirect()->route('verification.notice')->with('verification-status', 'Email not verified');
            }

            // Then check admin verification
            if (!$user->isVerified()) {
                //Auth::logout(); // Force logout
                return redirect()->route('registration.pending')->with('verification-status', 'Your account is pending admin approval.');
            }
        }

        return $next($request);
    }
}
