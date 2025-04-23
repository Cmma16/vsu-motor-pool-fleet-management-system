<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\RepairsController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
