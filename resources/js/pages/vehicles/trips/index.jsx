import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { endOfDay, format, isToday, isTomorrow, isWithinInterval, parseISO, startOfDay } from 'date-fns';
import { Calendar, Car, Filter, List } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CurrentDayTripsSection } from '@/components/trip/current-day-trips-section';
import { SelectedDayTripsSection } from '@/components/trip/selected-day-trips-section';
import { TripSummaryCard } from '@/components/trip/trip-summary-card';
import { UpcomingTripsSection } from '@/components/trip/upcoming-trips-section';

const breadcrumbs = [
    {
        title: 'Trips',
        href: '/trips',
    },
];

const pageDetails = {
    title: 'Vehicle Trips',
    description: 'Monitor and manage all fleet trips',
};

function getStatusBadge(status) {
    switch (status) {
        case 'pending':
            return <Badge variant="outline">Scheduled</Badge>;
        case 'approved':
            return <Badge className="bg-green-500">Approved</Badge>;
        case 'ongoing':
            return <Badge className="bg-yellow-500">Ongoing</Badge>;
        case 'completed':
            return <Badge variant="secondary">Completed</Badge>;
        case 'cancelled':
            return <Badge variant="destructive">Cancelled</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
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

export default function TripsIndex({ trips = [] }) {
    const [date, setDate] = React.useState(new Date());

    const todayTrips = trips.filter((trip) => isToday(parseISO(trip.start_date)));
    const upcomingTrips = trips.filter((trip) => {
        const startDate = parseISO(trip.start_date);
        return startDate > new Date() && !isToday(startDate);
    });

    const selectedDateTrips = trips.filter((trip) => {
        const startDate = startOfDay(parseISO(trip.start_date));
        const endDate = endOfDay(parseISO(trip.end_date));
        const selectedDate = startOfDay(date || new Date());

        // Check if selected date falls within the trip's date range
        return isWithinInterval(selectedDate, { start: startDate, end: endDate });
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Vehicles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto py-6">
                    <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <div className="flex items-center gap-2">
                            <Button>
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                            <Button variant="default" onClick={() => router.get(route('trips.create'))}>
                                <Car className="mr-2 h-4 w-4" />
                                New Trip
                            </Button>
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
                                </TabsList>

                                <div className="flex items-center gap-2">
                                    <Input placeholder="Search trips..." className="w-[200px] md:w-[300px]" />
                                    <Select defaultValue="all">
                                        <SelectTrigger className="w-[130px] bg-white">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Statuses</SelectItem>
                                            <SelectItem value="scheduled">Scheduled</SelectItem>
                                            <SelectItem value="in-progress">In Progress</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <TabsContent value="list" className="space-y-4">
                                <div className="grid gap-4">
                                    {/* Today's Trips */}
                                    <CurrentDayTripsSection todayTrips={todayTrips} formatTripDate={formatTripDate} getStatusBadge={getStatusBadge} />

                                    {/* Upcoming Trips */}
                                    <UpcomingTripsSection
                                        upcomingTrips={upcomingTrips}
                                        formatTripDate={formatTripDate}
                                        getStatusBadge={getStatusBadge}
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="calendar">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <Card className="col-span-1">
                                        <CardHeader>
                                            <CardTitle>Calendar</CardTitle>
                                            <CardDescription>Select a date to view scheduled trips</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex justify-center">
                                            <CalendarComponent mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                                        </CardContent>
                                    </Card>

                                    <SelectedDayTripsSection date={date} selectedDateTrips={selectedDateTrips} getStatusBadge={getStatusBadge} />
                                </div>
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
