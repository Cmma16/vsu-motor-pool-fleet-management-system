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
use App\Http\Controllers\TripLogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\UserVerificationController;
use App\Http\Controllers\PersonnelController;
use App\Http\Controllers\MaintenancePartsController;
use App\Http\Controllers\PassengerController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\PreventiveController;


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
    Route::get('/vehicles/{vehicle}/qr-code', [VehicleController::class, 'generateQRCode'])->name('vehicles.generate');
    Route::post('/vehicles/scan-qr', [VehicleController::class, 'scanQRCode'])->name('vehicles.scan-qr');
    Route::post('/vehicles/{vehicle}/update-photo', [VehicleController::class, 'updatePhoto'])->name('vehicles.updatePhoto');

    Route::resource('repairs', RepairsController::class);
    Route::patch('repairs/{repair}/confirm', [RepairsController::class, 'confirm'])->name('repairs.confirm');
    Route::resource('preventive', PreventiveController::class);
    Route::patch('preventive/{preventive}/confirm', [PreventiveController::class, 'confirm'])->name('preventive.confirm');

    Route::resource('services/requests', ServiceRequestController::class);
    Route::patch('services/requests/{request}/status', [ServiceRequestController::class, 'updateStatus'])->name('requests.updateStatus');

    Route::get('/services/requests/{request}/pdf', [ServiceRequestController::class, 'printServiceRequest'])->name('requests.print');

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
    
    //not working
    Route::get('/trips/{trip}/pdf', [TripController::class, 'downloadPDF'])->name('trips.download-pdf');
    
    // Trip Log routes
    Route::get('/trips/{trip}/logs/create', [TripLogController::class, 'create'])->name('trip-logs.create');
    Route::get('/trips/{trip}/logs/end', [TripLogController::class, 'endTrip'])->name('trip-logs.end');
    Route::post('/trip-logs/{tripLog}/complete', [TripLogController::class, 'completeTrip'])->name('trip-logs.complete');
    Route::put('/trip-logs/{tripLog}', [TripLogController::class, 'update'])->name('trip-logs.update');
    Route::resource('trip-logs', TripLogController::class)->except(['create', 'update']);
    Route::middleware('role:Admin')->group(function () {
        Route::resource('personnel', PersonnelController::class);
    });
    Route::resource('passengers', PassengerController::class);
    Route::post('/passengers/{id}/assign-party-head', [PassengerController::class, 'assignPartyHead']);

    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::put('/notifications/{notification}/read', [NotificationController::class, 'markAsRead'])->name('notifications.markAsRead');

    Route::get('/reports', [ReportsController::class, 'index'])->name('reports.index');
    Route::get('/reports/fleet-analytics', [ReportsController::class, 'fleetReports'])->name('reports.fleet');
    Route::get('/reports/part-analytics', [ReportsController::class, 'partsAnalytics'])->name('reports.part');

    Route::post('maintenance-parts', [MaintenancePartsController::class, 'store'])->name('maintenance-parts.store');
    Route::put('maintenance-parts/{maintenancePart}', [MaintenancePartsController::class, 'update'])->name('maintenance-parts.update');
    Route::delete('maintenance-parts/{maintenancePart}', [MaintenancePartsController::class, 'destroy'])->name('maintenance-parts.destroy');

    Route::middleware(['role:Admin'])->group(function () {
        Route::put('/personnel/{person}/role', [PersonnelController::class, 'updateRole'])->name('personnel.updateRole');
        Route::put('/personnel/{person}/verify', [PersonnelController::class, 'verifyPersonnel'])->name('personnel.verify');
        Route::put('/personnel/{person}/unverify', [PersonnelController::class, 'unverifyPersonnel'])->name('personnel.unverify');
        Route::delete('/personnel/{person}', [PersonnelController::class, 'destroy'])->name('personnel.destroy');
    });

    Route::get('/trips/check-availability', [TripController::class, 'checkAvailability'])->name('trips.check-availability');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
