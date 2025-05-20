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
        if($user->role->name) {
            // Get data based on user role
            switch($user->role->name) {
            case 'Admin':
                return $this->getAdminDashboard();
            case 'Driver':
                return $this->getDriverDashboard();
            case 'Mechanic':
                return $this->getMechanicDashboard();
            case 'Staff':
                return $this->getStaffDashboard();
            default:
                return redirect()->route('login');
            }
        }
        else {
            return redirect()->route('login');
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
            
                'staff' => User::whereHas('role', function ($query) {
                    $query->where('name', 'Staff');
                })->count(),
            ]
        ]);
    }

    private function getDriverDashboard()
    {
        $driver = auth()->user();
        $today = Carbon::now()->setTimezone('Asia/Manila')->format('Y-m-d');
        $activeVehicle = Trip::where('driver_id', auth()->user()->id)
                    ->where('status', 'approved')
                    ->where('start_date', '<=', $today)
                    ->with('vehicle')
                    ->orderBy('start_date', 'desc')
                    ->first()?->vehicle;
                if ($activeVehicle) {
                    $latestOdometerReading = $activeVehicle->odometerLogs()
                        ->latest('logged_at')
                        ->first();
                
                    $nextMaintenance = $activeVehicle->maintenancePlans()
                        ->whereDate('scheduled_date', '>=', now())
                        ->orderBy('scheduled_date')
                        ->first();
                } else {
                    $latestOdometerReading = 0;
                    $nextMaintenance = 0;
                }
        
        return Inertia::render('dashboard/driver', [
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
            
                'staff' => User::whereHas('role', function ($query) {
                    $query->where('name', 'Staff');
                })->count(),
            ], 
            'activeVehicle' => $activeVehicle,
            'latestOdometerReading' => $latestOdometerReading,
            'nextMaintenance' => $nextMaintenance,
            'upcomingTrips' => Trip::where('driver_id', auth()->user()->id)
                ->where('status', 'approved')
                ->where('start_date', '>=', $today)
                ->orderBy('start_date')
                ->get(),
                
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
            
                'staff' => User::whereHas('role', function ($query) {
                    $query->where('name', 'Staff');
                })->count(),
            ], 
            'uninspectedRequests' => ServiceRequest::where('status', 'received')->get(),
            'approvedRequests' => ServiceRequest::where('status', 'approved')->get(),
        ]);
    }

    private function getStaffDashboard()
    {
        return Inertia::render('dashboard/staff', [
            
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
            
                'staff' => User::whereHas('role', function ($query) {
                    $query->where('name', 'Staff');
                })->count(),
            ], 
            'pendingTrips' => Trip::where('status', 'pending')->get(),
            'pendingRequests' => ServiceRequest::where('status', 'pending')->get(),
        ]);
    }
}
