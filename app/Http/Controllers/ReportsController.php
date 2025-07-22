<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use App\Models\Vehicle;
use App\Models\ServiceRequest;
use App\Models\Part;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ReportsController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        $month = $request->input('month');
        $year = $request->input('year');
        $vehicleIds = $request->input('vehicle_ids', []);

        // Build the query with filters
        $query = Vehicle::withCount([
            'trips as total_trips' => function ($query) use ($startDate, $endDate, $month, $year) {
                $query->where('status', 'completed');

                if ($startDate && $endDate) {
                    $query->whereBetween('start_date', [$startDate, $endDate]);
                }

                if ($month) {
                    $query->whereMonth('start_date', $month);
                }

                if ($year) {
                    $query->whereYear('start_date', $year);
                }
            }
        ]);

        // Optional: filter specific vehicles
        if (!empty($vehicleIds)) {
            $query->whereIn('vehicle_id', $vehicleIds);
        }

        // Fetch vehicles sorted by trip count descending
        $tripData = $query
        ->orderByDesc('total_trips')
        ->get();

        // Get total number of trips
        $totalTrips = Trip::count();

        // Get total number of service requests
        $totalRequests = ServiceRequest::count();

        // Get total number of vehicles
        $totalVehicles = Vehicle::count();

        // Get vehicle with most completed trips
        $mostActiveVehicle = Vehicle::withCount(['trips' => function ($query) {
            $query->where('status', 'completed');
        }])
        ->orderByDesc('trips_count')
        ->first();

        $metrics = [
            'total_trips' => $totalTrips,
            'total_requests' => $totalRequests,
            'total_vehicles' => $totalVehicles,
            'most_active_vehicle' => [
                'name' => $mostActiveVehicle->vehicle_name,
                'trips' => $mostActiveVehicle->trips_count
            ]
        ];

        return Inertia::render('report/index', [
            'tripData' => $tripData->map(function ($tripData) {
                return [
                    'vehicle_name' => $tripData->vehicle_name,
                    'total_trips' => $tripData->total_trips,
                ];
            }),
            'metrics' => $metrics,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
                'month' => $month,
                'year' => $year,
                'vehicle_ids' => $vehicleIds,
            ]
        ]);
    }

    public function fleetReports(Request $request)
    {
        $reportType = $request->input('report_type', 'trip');
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        $month = $request->input('month');
        $year = $request->input('year');
        $vehicleIds = $request->input('vehicle_ids', []);

        $query = Vehicle::query();

        if ($reportType === "trip") {
            $query->withCount([
                'trips as total' => function ($q) use ($startDate, $endDate, $month, $year) {
                    if ($startDate && $endDate) {
                        $q->whereBetween('start_date', [$startDate, $endDate]);
                    }
                    if ($month) {
                        $q->whereMonth('start_date', $month);
                    }
                    if ($year) {
                        $q->whereYear('start_date', $year);
                    }
                }
            ]);
        } elseif ($reportType === 'repair') {
            $query->withCount([
                'serviceRequests as total' => function ($query) use ($startDate, $endDate, $month, $year) {
                    $query->whereHas('maintenance', function ($q) {
                        $q->whereHas('serviceRequest', function ($q2) {
                            $q2->where('service_type', 'repair');
                        });
                    });

                    if ($startDate && $endDate) {
                        $query->whereBetween('date_completed', [$startDate, $endDate]);
                    }
                    if ($month) {
                        $query->whereMonth('date_completed', $month);
                    }
                    if ($year) {
                        $query->whereYear('date_completed', $year);
                    }
                }
            ]);
        } elseif ($reportType === 'preventive') {
            $query->withCount([
                'serviceRequests as total' => function ($query) use ($startDate, $endDate, $month, $year) {
                    $query->whereHas('maintenance', function ($q) {
                        $q->whereHas('serviceRequest', function ($q2) {
                            $q2->where('service_type', 'preventive');
                        });
                    });
        
                    if ($startDate && $endDate) $query->whereBetween('date_completed', [$startDate, $endDate]);
                    if ($month) $query->whereMonth('date_completed', $month);
                    if ($year) $query->whereYear('date_completed', $year);
                }
            ]); 
        } else {
            return response()->json(['error' => 'Invalid report type'], 400);
        }

        if (!empty($vehicleIds)) {
            $query->whereIn('vehicle_id', $vehicleIds);
        }

        // Get total number of trips
        $totalTrips = Trip::count();

        // Get total number of service requests
        $totalRequests = ServiceRequest::count();

        // Get total number of vehicles
        $totalVehicles = Vehicle::count();

        // Get vehicle with most completed trips
        $mostActiveVehicle = Vehicle::withCount(['trips' => function ($query) {
            $query->where('status', 'completed');
        }])
        ->orderByDesc('trips_count')
        ->first();

        $metrics = [
            'total_trips' => $totalTrips,
            'total_requests' => $totalRequests,
            'total_vehicles' => $totalVehicles,
            'most_active_vehicle' => [
                'name' => $mostActiveVehicle->vehicle_name,
                'trips' => $mostActiveVehicle->trips_count
            ]
        ];

        $parts = Part::select('part_id', 'part_name', 'stock_quantity as current_stock', 'restock_threshold')
            ->orderBy('part_name')
            ->get();

        $resultData = $query
        ->orderByDesc('total')
            ->get();

        return Inertia::render('report/fleet-analytics', [
            'resultData' => $resultData->map(function ($resultData) {
                return [
                    'vehicle_name' => $resultData->vehicle_name,
                    'total' => $resultData->total,
                ];
            }),
            'parts' => $parts,
            'metrics' => $metrics,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
                'month' => $month,
                'year' => $year,
                'vehicle_ids' => $vehicleIds,
                'report_type' => $reportType,
            ]
        ]);
    }

    public function vehicleReports(Request $request)
    {
        $vehicles = Vehicle::orderBy('created_at', 'desc')->get()
            ->map(function ($vehicle) {
                return [
                    'vehicle_id' => $vehicle->vehicle_id,
                    'vehicle_name' => $vehicle->vehicle_name,
                    'asset_tag' => $vehicle->asset_tag,
                    'plate_number' => $vehicle->plate_number,
                ];
            });

        
            $vehicleIds = $request->vehicle_ids;
            $startDate = $request->start_date;
            $endDate = $request->end_date;
            $reportType = $request->report_type;
        
            $data = collect();
        
            if(!empty($vehicleIds))
            {
                foreach ($vehicleIds as $vehicleId) {
                    switch ($reportType) {
                        case 'trips':
                            $records = Trip::select([
                                'trips.trip_id',
                                'trips.trip_number',
                                'trips.start_date',
                                'trips.end_date',
                                'trips.destination',
                                'trips.purpose',
                                'vehicles.vehicle_name',
                                DB::raw("CONCAT(drivers.first_name, ' ', drivers.last_name) as driver_name"),
                            ])
                            ->join('vehicles', 'trips.vehicle_id', '=', 'vehicles.vehicle_id')
                            ->join('users as drivers', 'trips.driver_id', '=', 'drivers.id')
                            ->where('trips.vehicle_id', $vehicleId)
                            ->where('trips.status', 'completed')
                            ->whereBetween('trips.start_date', [$startDate, $endDate])
                            ->get();
                            break;
            
                        case 'repair':
                            $records = ServiceRequest::select([
                                'maintenance.maintenance_id',
                                'maintenance.date_in',
                                'maintenance.date_completed',
                                'vehicles.vehicle_name',
                                'service_requests.service_type',
                                'maintenance.maintenance_summary',
                            ])
                                ->join('maintenance', 'service_requests.request_id', '=', 'maintenance.request_id')
                                ->join('vehicles', 'service_requests.vehicle_id', '=', 'vehicles.vehicle_id')
                                ->where('service_requests.vehicle_id', $vehicleId)
                                ->where('service_requests.service_type', $reportType)
                                ->whereBetween('maintenance.date_completed', [$startDate, $endDate])
                                ->get();
                            break;
                        case 'maintenance':
                            $records = ServiceRequest::select([
                                'maintenance.maintenance_id',
                                'maintenance.date_in',
                                'maintenance.date_completed',
                                'vehicles.vehicle_name',
                                'service_requests.service_type',
                                'maintenance.maintenance_summary',
                            ])
                                ->join('maintenance', 'service_requests.request_id', '=', 'maintenance.request_id')
                                ->join('vehicles', 'service_requests.vehicle_id', '=', 'vehicles.vehicle_id')
                                ->where('service_requests.vehicle_id', $vehicleId)
                                ->whereIn('service_requests.service_type', ['maintenance', 'preventive'])
                                ->whereBetween('maintenance.date_completed', [$startDate, $endDate])
                                ->get();
                            break;
                        case 'all':
                            $records = ServiceRequest::select([
                                'maintenance.maintenance_id',
                                'maintenance.date_in',
                                'maintenance.date_completed',
                                'vehicles.vehicle_name',
                                'service_requests.service_type',
                                'maintenance.maintenance_summary',
                            ])
                                ->join('maintenance', 'service_requests.request_id', '=', 'maintenance.request_id')
                                ->join('vehicles', 'service_requests.vehicle_id', '=', 'vehicles.vehicle_id')
                                ->where('service_requests.vehicle_id', $vehicleId)
                                ->whereBetween('maintenance.date_completed', [$startDate, $endDate])
                                ->get();
                            break;
            
                        default:
                            $records = collect(); // Fallback
                    }
            
                    $data = $data->merge($records);
                }
            }

        return Inertia::render('report/detailed-report', [
            'vehicles' => $vehicles,
            'resultData' => $data,
            'filters' => [
                'vehicle_ids' => $vehicleIds,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'report_type' => $reportType,
            ],
        ]);
    }

} 