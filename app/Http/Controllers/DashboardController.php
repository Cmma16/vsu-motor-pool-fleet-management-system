<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehicle;
use App\Models\MaintenancePlan;
use App\Models\ServiceRequest;
use App\Models\OdometerLog;
use App\Models\Part;
use App\Models\User;
use App\Models\Repairs;
use App\Models\Trip;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        if(!$user->role_id) {
            return redirect()->route('login');
        }
        else {
            // Get data based on user role
            switch($user->role->name) {
            case 'Admin':
                return $this->getAdminDashboard();
            case 'Driver':
                return $this->getDriverDashboard();
            case 'Mechanic':
                return $this->getMechanicDashboard();
            case 'Manager':
                return $this->getManagerDashboard();
            }
        }
    }

    private function getAdminDashboard()
    {
        return Inertia::render('dashboard/admin', [
            'vehicleStats' => [
                'total' => Vehicle::count(),
                'available' => Vehicle::where('status', 'available')->count(),
                'inUse' => Vehicle::where('status', 'in use')->count(),
                'underMaintenance' => Vehicle::where('status', 'under maintenance')->count(),
                'retired' => Vehicle::where('status', 'retired')->count(),
            ],
            'maintenanceStats' => [
                'dueToday' => MaintenancePlan::where('scheduled_date', now())->count(),
                'dueSoon' => MaintenancePlan::where('scheduled_date', '>', now())->where('scheduled_date', '<=', now()->addDays(7))->count(),
                'upcoming' => MaintenancePlan::where('scheduled_date', '>', now())->with('vehicle')->where('scheduled_date', '<=', now()->addDays(7))->get(),
            ],
            'serviceStats' => [
                'pending' => ServiceRequest::where('status', 'pending')->count(),
                'received' => ServiceRequest::where('status', 'received')->count(),
                'cancelled' => ServiceRequest::where('status', 'cancelled')->count(),
            ],
            'lowStockParts' =>  Part::whereRaw('stock_quantity < restock_threshold')->get(),
            'tripStats' => [
                'today' => Trip::whereDate('start_date', now())->count(),
            ],
            'personnelStats' => [
                'total' => User::count(),
                'driver' => User::whereHas('role', function ($query) {
                    $query->where('name', 'Driver');
                })->count(),
            
                'mechanic' => User::whereHas('role', function ($query) {
                    $query->where('name', 'Mechanic');
                })->count(),
            
                'manager' => User::whereHas('role', function ($query) {
                    $query->where('name', 'Manager');
                })->count(),
            ]
        ]);
    }

    private function getDriverDashboard()
    {
        $driver = auth()->user();
        $today = Carbon::now()->setTimezone('Asia/Manila')->format('Y-m-d');

        $activeVehicle = Trip::where('driver_id', $driver->id)
            ->whereIn('status', ['assigned', 'ongoing'])
            ->where('start_date', '<=', $today)
            ->where('end_date', '>=', $today)  // Trip hasn't ended yet
            ->with(['vehicle' => function ($query) {
                $query->with('latestOdometerLog');  // Eager load the latest odometer reading
            }])
            ->orderByRaw('CASE 
                WHEN status = "ongoing" THEN 1 
                WHEN status = "assigned" THEN 2 
                ELSE 3 
            END')  // Prioritize 'ongoing' over 'assigned'
            ->orderBy('start_date', 'desc')  // Then sort by start date
            ->first()?->vehicle;
                if ($activeVehicle) {
                    $latestOdometerReading = $activeVehicle->odometerLogs()
                        ->latest('logged_at')
                        ->first();
                
                    $nextMaintenance = $activeVehicle->maintenancePlans()
                        ->whereDate('scheduled_date', '>=', $today)
                        ->orderBy('scheduled_date')
                        ->first();
                } else {
                    $latestOdometerReading = 0;
                    $nextMaintenance = 0;
                }

            $upcomingTrips = Trip::where('driver_id', $driver->id)
            ->where('status', 'approved')
            ->where('start_date', '>=', $today)
            ->orderBy('start_date')
            ->get();

            
            $personnelStats = [
                'total' => User::count(),
                'driver' => User::whereHas('role', function ($query) {
                    $query->where('name', 'Driver');
                })->count(),
            
                'mechanic' => User::whereHas('role', function ($query) {
                    $query->where('name', 'Mechanic');
                })->count(),
            
                'manager' => User::whereHas('role', function ($query) {
                    $query->where('name', 'Manager');
                })->count(),
            ]; 
            $vehicleStats = [
                'total' => Vehicle::count(),
                'available' => Vehicle::where('status', 'available')->count(),
                'inUse' => Vehicle::where('status', 'in use')->count(),
                'underMaintenance' => Vehicle::where('status', 'under maintenance')->count(),
                'retired' => Vehicle::where('status', 'retired')->count(),
            ];
            $myRequests = ServiceRequest::with('vehicle')->where('requested_by', $driver->id)->orderBy('date_filed', 'desc')->limit(2)->get();
        
        return Inertia::render('dashboard/driver', [
            'maintenanceStats' => [
                'dueToday' => MaintenancePlan::where('scheduled_date', now())->count(),
                'dueSoon' => MaintenancePlan::where('scheduled_date', '>', now())->where('scheduled_date', '<=', now()->addDays(7))->count(),
            ],
            'serviceStats' => [
                'pending' => ServiceRequest::where('status', 'pending')->count(),
            ],
            'tripStats' => [
                'today' => Trip::whereDate('start_date', now())->count(),
            ],
            'activeVehicle' => $activeVehicle,
            'latestOdometerReading' => $latestOdometerReading,
            'nextMaintenance' => $nextMaintenance,
            'upcomingTrips' => $upcomingTrips,
            'personnelStats' => $personnelStats,
            'vehicleStats' => $vehicleStats,
            'myRequests' => $myRequests,
        ]);
    }

    private function getMechanicDashboard()
    {
        $mechanic = auth()->user();
        
        return Inertia::render('dashboard/mechanic', [
            'vehicleStats' => [
                'total' => Vehicle::count(),
                'available' => Vehicle::where('status', 'available')->count(),
                'inUse' => Vehicle::where('status', 'in use')->count(),
                'underMaintenance' => Vehicle::where('status', 'under maintenance')->count(),
                'retired' => Vehicle::where('status', 'retired')->count(),
            ],
            'maintenanceStats' => [
                'dueToday' => MaintenancePlan::where('scheduled_date', now())->count(),
                'dueSoon' => MaintenancePlan::where('scheduled_date', '>', now())->where('scheduled_date', '<=', now()->addDays(7))->count(),
            ],
            'serviceStats' => [
                'pending' => ServiceRequest::where('status', 'pending')->count(),
            ],
            'tripStats' => [
                'today' => Trip::whereDate('start_date', now())->count(),
            ],
            'personnelStats' => [
                'total' => User::count(),
                'driver' => User::whereHas('role', function ($query) {
                    $query->where('name', 'Driver');
                })->count(),
            
                'mechanic' => User::whereHas('role', function ($query) {
                    $query->where('name', 'Mechanic');
                })->count(),
            
                'manager' => User::whereHas('role', function ($query) {
                    $query->where('name', 'Manager');
                })->count(),
            ], 
            'uninspectedRequests' => ServiceRequest::where('status', 'received')->get(),
            'approvedRequests' => ServiceRequest::where('status', 'approved')->get(),
        ]);
    }

    private function getManagerDashboard()
    {
        return Inertia::render('dashboard/manager', [
            
            'vehicleStats' => [
                'total' => Vehicle::count(),
                'available' => Vehicle::where('status', 'available')->count(),
                'inUse' => Vehicle::where('status', 'in use')->count(),
                'underMaintenance' => Vehicle::where('status', 'under maintenance')->count(),
                'retired' => Vehicle::where('status', 'retired')->count(),
            ],
            'maintenanceStats' => [
                'dueToday' => MaintenancePlan::where('scheduled_date', now())->count(),
                'dueSoon' => MaintenancePlan::where('scheduled_date', '>', now())->where('scheduled_date', '<=', now()->addDays(7))->count(),
            ],
            'serviceStats' => [
                'pending' => ServiceRequest::where('status', 'pending')->count(),
            ],
            'tripStats' => [
                'today' => Trip::whereDate('start_date', now())->count(),
            ],
            'personnelStats' => [
                'total' => User::count(),
                'driver' => User::whereHas('role', function ($query) {
                    $query->where('name', 'Driver');
                })->count(),
            
                'mechanic' => User::whereHas('role', function ($query) {
                    $query->where('name', 'Mechanic');
                })->count(),
            
                'manager' => User::whereHas('role', function ($query) {
                    $query->where('name', 'Manager');
                })->count(),
            ], 
            'pendingTrips' => Trip::where('status', 'pending')->get(),
            'pendingRequests' => ServiceRequest::where('status', 'pending')->get(),
        ]);
    }
}
