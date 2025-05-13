import { CalendarIcon, Car, Clock, FileText, MapPin, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format, parseISO } from 'date-fns';

export function UpcomingTripsSection({ upcomingTrips, formatTripDate, getStatusBadge, editTrip, viewTripDetails }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Trips</CardTitle>
                <CardDescription>Trips scheduled for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
                {upcomingTrips.length > 0 ? (
                    <div className="grid gap-4">
                        {upcomingTrips.map((trip) => (
                            <div key={trip.trip_number} className="flex flex-col justify-between rounded-lg border p-4 md:flex-row">
                                <div className="mb-4 flex flex-col gap-2 md:mb-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold">{trip.purpose}</h3>
                                        {getStatusBadge(trip.status)}
                                    </div>
                                    <div className="text-muted-foreground flex items-center text-sm">
                                        <Clock className="mr-2 h-4 w-4" />
                                        {formatTripDate(trip.start_date, trip.departure_time)}
                                    </div>
                                    <div className="text-muted-foreground flex items-center text-sm">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {format(parseISO(trip.start_date), 'MMM d')}
                                        {trip.start_date !== trip.end_date && ` - ${format(parseISO(trip.end_date), 'MMM d')}`}
                                    </div>
                                    <div className="text-muted-foreground flex items-center text-sm">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        {trip.destination}
                                    </div>
                                    <div className="text-muted-foreground flex items-center text-sm">
                                        <FileText className="mr-2 h-4 w-4" />
                                        Trip #{trip.trip_number} • {trip.requesting_party}
                                    </div>
                                </div>
                                <div className="flex flex-row items-start gap-4 md:flex-col">
                                    <div className="flex items-center gap-2">
                                        <div className="text-sm">
                                            <p className="font-medium">{trip.driver_name}</p>
                                            <p className="text-muted-foreground text-xs">{trip.vehicle_name} (vehicle type here)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Car className="mr-2 h-4 w-4" />
                                        {trip.plate_number}
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">More options</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => viewTripDetails(trip.trip_id)}>View Details</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => editTrip(trip.trip_id)}>Edit Trip</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Cancel Trip</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-muted-foreground py-6 text-center">No upcoming trips scheduled</div>
                )}
            </CardContent>
        </Card>
    );
}
