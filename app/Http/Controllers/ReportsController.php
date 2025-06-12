<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use App\Models\Vehicle;
use App\Models\ServiceRequest;
use App\Models\Part;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
} 