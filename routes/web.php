<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\RepairsController;
use App\Http\Controllers\ServiceRequestController;
use App\Http\Controllers\ServiceInspectionController;
use App\Http\Controllers\ServiceAccomplishmentController;
use App\Http\Controllers\PartController;
use App\Http\Controllers\MaintenancePlanController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\OdometerLogController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\UserVerificationController;
use App\Http\Controllers\PersonnelController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('vehicles/trips', function () {
        return Inertia::render('vehicles/trips/index');
    })->name('trips.index');
    Route::get('/maintenance', function () {
        return Inertia::render('maintenance/index');
    })->name('maintenance.index');
    Route::get('/parts', function () {
        return Inertia::render('parts/index');
    })->name('parts.index');
    Route::resource('vehicles', VehicleController::class);
    Route::resource('repairs', RepairsController::class);
    Route::resource('services/requests', ServiceRequestController::class);
    Route::resource('services/request-inspections', ServiceInspectionController::class);
    Route::resource('services/completed', ServiceAccomplishmentController::class);
    Route::resource('parts', PartController::class);
    Route::resource('plans', MaintenancePlanController::class);
    Route::resource('maintenance', MaintenanceController::class);
    Route::resource('odometer', OdometerLogController::class);
    Route::resource('vehicles/trips', TripController::class);
    Route::resource('personnel', PersonnelController::class);
    
    Route::middleware(['role:Admin'])->group(function () {
        Route::put('/personnel/{person}/role', [PersonnelController::class, 'updateRole'])->name('personnel.updateRole');
        Route::put('/personnel/{person}/verify', [PersonnelController::class, 'verifyPersonnel'])->name('personnel.verify');
        Route::put('/personnel/{person}/unverify', [PersonnelController::class, 'unverifyPersonnel'])->name('personnel.unverify');
    });

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
