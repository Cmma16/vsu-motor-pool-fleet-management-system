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
use App\Http\Controllers\MaintenancePartsController;
use App\Http\Controllers\RepairPartsController;
use App\Http\Controllers\PassengerController;
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
    Route::patch('services/requests/{request}/status', [ServiceRequestController::class, 'updateStatus'])->name('requests.updateStatus');

    Route::resource('services/request-inspections', ServiceInspectionController::class);
    Route::patch('services/request-inspections/{request_inspection}/confirm', [ServiceInspectionController::class, 'confirmInspection'])->name('request-inspections.confirm');

    Route::resource('services/completed', ServiceAccomplishmentController::class);
    Route::resource('parts', PartController::class);
    Route::resource('plans', MaintenancePlanController::class);

    Route::resource('maintenance', MaintenanceController::class);
    Route::patch('maintenance/{maintenance}/confirm', [MaintenanceController::class, 'confirm'])->name('maintenance.confirm');

    Route::resource('odometer', OdometerLogController::class);
    Route::resource('vehicles/trips', TripController::class);
    Route::get('/trips/{trip}/assign', [TripController::class, 'assign'])->name('trips.assign');
    Route::patch('trips/{trip}/status', [TripController::class, 'updateStatus'])->name('trips.updateStatus');
    Route::post('/trips/check-availability', [TripController::class, 'checkAvailability'])->name('trips.check-availability');
    Route::resource('personnel', PersonnelController::class);
    Route::resource('passengers', PassengerController::class);

    Route::post('/passengers/{id}/assign-party-head', [PassengerController::class, 'assignPartyHead']);


    Route::post('maintenance-parts', [MaintenancePartsController::class, 'store'])->name('maintenance-parts.store');
    Route::put('maintenance-parts/{maintenancePart}', [MaintenancePartsController::class, 'update'])->name('maintenance-parts.update');
    Route::delete('maintenance-parts/{maintenancePart}', [MaintenancePartsController::class, 'destroy'])->name('maintenance-parts.destroy');

    Route::post('repair-parts', [RepairPartsController::class, 'store'])->name('repair-parts.store');
    Route::put('repair-parts/{repairPart}', [RepairPartsController::class, 'update'])->name('repair-parts.update');
    Route::delete('repair-parts/{repairPart}', [RepairPartsController::class, 'destroy'])->name('repair-parts.destroy');

    Route::middleware(['role:Admin'])->group(function () {
        Route::put('/personnel/{person}/role', [PersonnelController::class, 'updateRole'])->name('personnel.updateRole');
        Route::put('/personnel/{person}/verify', [PersonnelController::class, 'verifyPersonnel'])->name('personnel.verify');
        Route::put('/personnel/{person}/unverify', [PersonnelController::class, 'unverifyPersonnel'])->name('personnel.unverify');
    });

    Route::get('/trips/check-availability', [TripController::class, 'checkAvailability'])->name('trips.check-availability');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
