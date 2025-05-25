import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { ScrollArea } from '@/components/ui/scroll-area';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { endOfDay, format, isToday, isTomorrow, isWithinInterval, parseISO, startOfDay } from 'date-fns';
import { Calendar, Car, Check, Filter, List, Table, X } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { DataTable } from '@/components/data-table';
import { CurrentDayTripsSection } from '@/components/trip/current-day-trips-section';
import { SelectedDayTripsSection } from '@/components/trip/selected-day-trips-section';
import { TripColumn } from '@/components/trip/trip-column';
import { TripSummaryCard } from '@/components/trip/trip-summary-card';
import { UpcomingTripsSection } from '@/components/trip/upcoming-trips-section';
import { usePage } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Trips',
        href: '/trips',
    },
];

const getUniqueVehicles = (trips) => {
    const vehicleMap = new Map();

    trips.forEach((trip) => {
        // Only add vehicles that are actually assigned
        if (trip.vehicle && trip.vehicle.vehicle_id && typeof trip.vehicle === 'object') {
            if (!vehicleMap.has(trip.vehicle.vehicle_id)) {
                vehicleMap.set(trip.vehicle.vehicle_id, {
                    id: trip.vehicle.vehicle_id,
                    name: trip.vehicle.vehicle_name || 'N/A',
                    type: trip.vehicle.vehicle_type || 'N/A',
                    plate_number: trip.vehicle.plate_number || 'N/A',
                });
            }
        }
    });

    return Array.from(vehicleMap.values());
};

function getStatusBadge(status) {
    switch (status) {
        case 'pending':
            return (
                <Badge variant="outline" className="bg-gray-100">
                    Pending
                </Badge>
            );
        case 'assigned':
            return (
                <Badge variant="default" className="bg-green-500">
                    Assigned
                </Badge>
            );
        case 'received':
            return (
                <Badge variant="default" className="bg-blue-500">
                    Received
                </Badge>
            );
        case 'ongoing':
            return (
                <Badge variant="default" className="bg-yellow-500">
                    Ongoing
                </Badge>
            );
        case 'completed':
            return (
                <Badge variant="secondary" className="bg-gray-500">
                    Completed
                </Badge>
            );
        case 'cancelled':
            return (
                <Badge variant="destructive" className="bg-red-500">
                    Cancelled
                </Badge>
            );
        default:
            return (
                <Badge variant="outline" className="bg-gray-200">
                    {status}
                </Badge>
            );
    }
}

// Helper function to format date display
function formatTripDate(date, time) {
    const fullDate = parseISO(`${date}T${time}`);

    if (isToday(fullDate)) {
        return `Today at ${format(fullDate, 'h:mm a')}`;
    } else if (isTomorrow(fullDate)) {
        return `Tomorrow at ${format(fullDate, 'h:mm a')}`;
    } else {
        return format(fullDate, 'MMM d, yyyy h:mm a');
    }
}

const editTrip = (id) => {
    router.get(route('trips.edit', { id }));
};

const viewTripDetails = (id) => {
    router.get(route('trips.show', { id }));
};

const deleteTrip = (id) => {
    router.delete(
        route(
            'trips.destroy',
            { id },
            {
                onSuccess: () => {
                    toast.success('Trip deleted successfully');
                },
                onError: () => {
                    toast.error('Failed to delete trip');
                },
            },
        ),
    );
};

export default function TripsIndex({ trips = [] }) {
    const [date, setDate] = React.useState(new Date());
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedVehicles, setSelectedVehicles] = useState([]);
    const [filteredTrips, setFilteredTrips] = useState(trips);
    const [uniqueVehicles, setUniqueVehicles] = useState([]);

    useEffect(() => {
        const savedSearch = localStorage.getItem('searchText');
        if (savedSearch) {
            setSearchQuery(savedSearch);
        }
    }, []);

    // ✅ Save search to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('searchText', searchQuery);
    }, [searchQuery]);

    const user = usePage().props.auth.user;

    const pageDetails = {
        title: 'Vehicle Trips',
        description: user.role.name === 'Driver' ? 'Showing trips relevant to you.' : 'Monitor and manage all fleet trips',
    };

    // Initialize unique vehicles
    useEffect(() => {
        setUniqueVehicles(getUniqueVehicles(trips));
    }, []);

    // Apply filters whenever filter criteria change
    useEffect(() => {
        let result = trips;

        // Apply vehicle filter if any vehicles are selected
        if (selectedVehicles.length > 0) {
            result = result.filter((trip) => selectedVehicles.includes(trip.vehicle.vehicle_id));
        }

        // Apply status filter if not "all"
        if (statusFilter !== 'all') {
            result = result.filter((trip) => trip.status === statusFilter);
        }

        // Apply search query if not empty
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (trip) =>
                    trip.purpose.toLowerCase().includes(query) ||
                    trip.destination.toLowerCase().includes(query) ||
                    trip.requesting_party.toLowerCase().includes(query) ||
                    trip.trip_number.toString().toLowerCase().includes(query) ||
                    (trip.vehicle?.vehicle_name?.toLowerCase() || '').includes(query) ||
                    (trip.driver_name?.toLowerCase() || '').includes(query),
            );
        }

        setFilteredTrips(result);
    }, [selectedVehicles, statusFilter, searchQuery]);

    // Toggle vehicle selection
    const toggleVehicleSelection = (vehicleId) => {
        setSelectedVehicles((prev) => {
            if (prev.includes(vehicleId)) {
                return prev.filter((id) => id !== vehicleId);
            } else {
                return [...prev, vehicleId];
            }
        });
    };

    // Clear all filters
    const clearFilters = () => {
        setSelectedVehicles([]);
        setStatusFilter('all');
        setSearchQuery('');
    };

    const todayTrips = filteredTrips.filter((trip) => isToday(parseISO(trip.start_date)));
    const upcomingTrips = filteredTrips.filter((trip) => {
        const startDate = parseISO(trip.start_date);
        return startDate > new Date() && !isToday(startDate);
    });

    const handleStatusUpdate = (id, status) => {
        router.patch(
            route('trips.updateStatus', id),
            {
                status: status,
            },
            {
                onSuccess: () => {
                    toast('Trip status updated successfully');
                },
                onError: () => {
                    toast('Failed to update trip status');
                },
            },
        );
    };

    const selectedDateTrips = filteredTrips.filter((trip) => {
        const startDate = startOfDay(parseISO(trip.start_date));
        const endDate = endOfDay(parseISO(trip.end_date));
        const selectedDate = startOfDay(date || new Date());

        // Check if selected date falls within the trip's date range
        return isWithinInterval(selectedDate, { start: startDate, end: endDate });
    });

    const startTrip = (id) => {
        console.log(id);
        router.get(route('trip-logs.create', { id }));
    };

    const endTrip = (id) => {
        router.get(route('trip-logs.end', { id }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Vehicles" />
            {console.log(trips)}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto py-6">
                    <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <div className="flex items-center gap-2">
                            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                                <DialogTrigger asChild>
                                    <Button variant={selectedVehicles.length > 0 ? 'default' : 'outline'}>
                                        <Filter className="mr-2 h-4 w-4" />
                                        Filter
                                        {selectedVehicles.length > 0 && (
                                            <Badge variant="secondary" className="ml-2">
                                                {selectedVehicles.length}
                                            </Badge>
                                        )}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Filter Trips</DialogTitle>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <h3 className="mb-4 text-sm font-medium">Filter by Vehicle</h3>
                                        <ScrollArea className="h-[300px] pr-4">
                                            <div className="space-y-4">
                                                {uniqueVehicles.map((vehicle) => (
                                                    <div key={vehicle.id} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={vehicle.id}
                                                            checked={selectedVehicles.includes(vehicle.id)}
                                                            onCheckedChange={() => toggleVehicleSelection(vehicle.id)}
                                                        />
                                                        <label
                                                            htmlFor={vehicle.id}
                                                            className="flex-1 text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            <div>
                                                                {vehicle.name} ({vehicle.type})
                                                            </div>
                                                            <div className="text-muted-foreground text-xs">{vehicle.plate_number}</div>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    </div>
                                    <div className="flex justify-between">
                                        <Button variant="outline" onClick={clearFilters}>
                                            <X className="mr-2 h-4 w-4" />
                                            Clear Filters
                                        </Button>
                                        <Button onClick={() => setIsFilterOpen(false)}>
                                            <Check className="mr-2 h-4 w-4" />
                                            Apply Filters
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            {user.role.name !== 'Driver' && (
                                <Button
                                    variant="default"
                                    size="default"
                                    className="flex items-center"
                                    onClick={() => router.get(route('trips.create'))}
                                >
                                    <Car className="mr-2 h-4 w-4" />
                                    New Trip
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {/* Summary Cards */}
                        <TripSummaryCard todayTrips={todayTrips} upcomingTrips={upcomingTrips} trips={trips} />

                        {/* Main Content */}
                        <Tabs defaultValue="list" className="w-full">
                            <div className="mb-4 flex items-center justify-between">
                                <TabsList className="bg-white">
                                    <TabsTrigger value="list" className="flex items-center">
                                        <List className="mr-2 h-4 w-4" />
                                        List View
                                    </TabsTrigger>
                                    <TabsTrigger value="calendar" className="flex items-center">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Calendar View
                                    </TabsTrigger>
                                    <TabsTrigger value="table" className="flex items-center">
                                        <Table className="mr-2 h-4 w-4" />
                                        Table View
                                    </TabsTrigger>
                                </TabsList>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="text"
                                        placeholder="Search trip/driver/vehicle..."
                                        className="w-[200px] md:w-[300px]"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger className="w-[130px] bg-white">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="all" className="bg-white">
                                                All Statuses
                                            </SelectItem>
                                            <SelectItem value="pending" className="bg-white">
                                                Pending
                                            </SelectItem>
                                            <SelectItem value="rejected" className="bg-white">
                                                Rejected
                                            </SelectItem>
                                            <SelectItem value="assigned" className="bg-white">
                                                Assigned
                                            </SelectItem>
                                            <SelectItem value="received" className="bg-white">
                                                Received
                                            </SelectItem>
                                            <SelectItem value="ongoing" className="bg-white">
                                                Ongoing
                                            </SelectItem>
                                            <SelectItem value="completed" className="bg-white">
                                                Completed
                                            </SelectItem>
                                            <SelectItem value="cancelled" className="bg-white">
                                                Cancelled
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <TabsContent value="list" className="space-y-4">
                                <div className="grid gap-4">
                                    {/* Today's Trips */}
                                    <CurrentDayTripsSection
                                        todayTrips={todayTrips}
                                        formatTripDate={formatTripDate}
                                        getStatusBadge={getStatusBadge}
                                        editTrip={editTrip}
                                        viewTripDetails={viewTripDetails}
                                        handleStatusUpdate={handleStatusUpdate}
                                        startTrip={startTrip}
                                        endTrip={endTrip}
                                    />

                                    {/* Upcoming Trips */}
                                    <UpcomingTripsSection
                                        upcomingTrips={upcomingTrips}
                                        formatTripDate={formatTripDate}
                                        getStatusBadge={getStatusBadge}
                                        editTrip={editTrip}
                                        viewTripDetails={viewTripDetails}
                                        handleStatusUpdate={handleStatusUpdate}
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="calendar" className="space-y-4">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <Card className="col-span-1">
                                        <CardHeader className="bg-white">
                                            <CardTitle className="bg-white">Calendar</CardTitle>
                                            <CardDescription className="bg-white">Select a date to view scheduled trips</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex justify-center">
                                            <CalendarComponent
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                className="rounded-md border"
                                                classNames={{
                                                    day_selected: 'bg-primary text-primary-foreground',
                                                    day_today: 'bg-accent text-accent-foreground',
                                                }}
                                            />
                                        </CardContent>
                                    </Card>

                                    <SelectedDayTripsSection
                                        date={date}
                                        selectedDateTrips={selectedDateTrips}
                                        getStatusBadge={getStatusBadge}
                                        editTrip={editTrip}
                                        viewTripDetails={viewTripDetails}
                                        handleStatusUpdate={handleStatusUpdate}
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="table" className="space-y-4">
                                <DataTable
                                    columns={TripColumn}
                                    data={filteredTrips}
                                    handleView={viewTripDetails}
                                    handleEdit={editTrip}
                                    handleDelete={deleteTrip}
                                />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
