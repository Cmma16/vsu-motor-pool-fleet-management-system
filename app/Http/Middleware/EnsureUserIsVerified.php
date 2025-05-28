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
        if ($user && !$user->is_verified) {
            Auth::logout(); // Force logout
            return redirect()->route('login')->withErrors([
                'email' => 'Your account is pending admin approval.',
            ]);
        }

        return $next($request);
    }
}
