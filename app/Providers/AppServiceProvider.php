<?php

namespace App\Providers;

use App\Models\RepairParts;
use App\Models\MaintenanceParts;
use App\Observers\PartUsageObserver;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

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
