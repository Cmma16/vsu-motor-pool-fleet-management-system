<?php

namespace App\Providers;

use App\Models\RepairParts;
use App\Models\MaintenanceParts;
use App\Observers\PartUsageObserver;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force HTTPS in production
        if (env('APP_ENV') === 'production') {
            URL::forceScheme('https');
        }

        // Schema::defaultStringLength(191);

        RepairParts::observe(PartUsageObserver::class);
        MaintenanceParts::observe(PartUsageObserver::class);

        Inertia::share([
            'flash' => function () {
                return [
                    'verification-status' => session('verification-status'),
                ];
            },
        ]);
    }
}
