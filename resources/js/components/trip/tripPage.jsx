import { addDays, format, isToday, isTomorrow } from 'date-fns';
import { Calendar, Car, Filter, List } from 'lucide-react';
import { useState } from 'react';

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

const trips = [
    {
        id: 'trip-001',
        title: 'Campus Tour for Prospective Students',
        driver: 'Alex Johnson',
        driverAvatar: '/',
        vehicle: 'Van 1 (Ford Transit)',
        status: 'scheduled',
        date: new Date(2025, 3, 29, 9, 0),
        startLocation: 'Main Campus',
        endLocation: 'Downtown Campus',
        passengers: 12,
        duration: '2 hours',
    },
    {
        id: 'trip-002',
        title: 'Faculty Conference Transport',
        driver: 'Maria Garcia',
        driverAvatar: '/',
        vehicle: 'Bus 3 (Mercedes Sprinter)',
        status: 'in-progress',
        date: new Date(2025, 4, 2, 13, 30),
        startLocation: 'Science Building',
        endLocation: 'Conference Center',
        passengers: 18,
        duration: '45 minutes',
    },
    {
        id: 'trip-003',
        title: 'Sports Team to Away Game',
        driver: 'James Wilson',
        driverAvatar: '/',
        vehicle: 'Bus 1 (Blue Bird)',
        status: 'scheduled',
        date: new Date(2025, 4, 2, 15, 0),
        startLocation: 'Athletics Complex',
        endLocation: 'State University',
        passengers: 24,
        duration: '3 hours',
    },
    {
        id: 'trip-004',
        title: 'Research Group Field Trip',
        driver: 'Sarah Ahmed',
        driverAvatar: '/',
        vehicle: 'Van 2 (Toyota Hiace)',
        status: 'scheduled',
        date: addDays(new Date(), 2),
        startLocation: 'Research Building',
        endLocation: 'Research Site Alpha',
        passengers: 8,
        duration: '4 hours',
    },
    {
        id: 'trip-005',
        title: 'Administrative Staff Meeting',
        driver: 'Robert Chen',
        driverAvatar: '/',
        vehicle: 'Sedan 2 (Toyota Camry)',
        status: 'completed',
        date: addDays(new Date(), -1),
        startLocation: 'Admin Building',
        endLocation: 'Downtown Office',
        passengers: 4,
        duration: '1 hour',
    },
];

function getStatusBadge(status) {
    switch (status) {
        case 'scheduled':
            return <Badge variant="outline">Scheduled</Badge>;
        case 'in-progress':
            return <Badge className="bg-green-500">In Progress</Badge>;
        case 'completed':
            return <Badge variant="secondary">Completed</Badge>;
        case 'cancelled':
            return <Badge variant="destructive">Cancelled</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
}

function formatTripDate(date) {
    if (isToday(date)) {
        return `Today at ${format(date, 'h:mm a')}`;
    } else if (isTomorrow(date)) {
        return `Tomorrow at ${format(date, 'h:mm a')}`;
    } else {
        return format(date, "MMM d, yyyy 'at' h:mm a");
    }
}

export function TripsPage() {
    const [date, setDate] = useState(new Date());

    const todayTrips = trips.filter((trip) => isToday(trip.date));
    const upcomingTrips = trips.filter((trip) => trip.date > new Date() && !isToday(trip.date));

    const selectedDateTrips = date
        ? trips.filter(
              (trip) =>
                  date.getDate() === trip.date.getDate() &&
                  date.getMonth() === trip.date.getMonth() &&
                  date.getFullYear() === trip.date.getFullYear(),
          )
        : [];

    return (
        <div className="container mx-auto py-6">
            <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="flex items-center gap-2">
                    <Button>
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                    <Button variant="default">
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
                            <UpcomingTripsSection upcomingTrips={upcomingTrips} formatTripDate={formatTripDate} getStatusBadge={getStatusBadge} />
                        </div>
                    </TabsContent>

                    <TabsContent value="calendar">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <Card className="col-span-1">
                                <CardHeader>
                                    <CardTitle>Calendar</CardTitle>
                                    <CardDescription>Select a date to view scheduled trips</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <CalendarComponent mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                                </CardContent>
                            </Card>

                            <SelectedDayTripsSection date={date} selectedDateTrips={selectedDateTrips} getStatusBadge={getStatusBadge} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
