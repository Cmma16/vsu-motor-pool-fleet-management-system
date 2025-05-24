import { CalendarIcon, Car, Clock, FileText, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';

export function UpcomingTripsSection({ upcomingTrips, formatTripDate, getStatusBadge, editTrip, viewTripDetails }) {
    const user = usePage().props.auth.user;

    const formatStatus = (string) => {
        if (!string) {
            return ''; // handle empty strings to avoid errors
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
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
                                            <p className="text-muted-foreground text-xs">{trip.vehicle.vehicle_name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Car className="mr-2 h-4 w-4" />
                                        {trip.plate_number}
                                    </div>

                                    <div className="flex items-center text-sm">
                                        <p className="font-medium">
                                            {formatStatus(trip.status)} at {format(parseISO(trip.updated_at), 'PPP')}
                                        </p>
                                    </div>

                                    <div className="flex flex-row gap-2">
                                        <Button variant="outline" onClick={() => viewTripDetails(trip.trip_id)}>
                                            View
                                        </Button>
                                        {user.role.name !== 'Driver' && (
                                            <Button variant="outline" onClick={() => cancelTrip(trip.trip_id)}>
                                                Cancel
                                            </Button>
                                        )}
                                        {trip.status === 'pending' ||
                                            trip.status === 'rejected' ||
                                            (trip.status === 'cancelled' && (
                                                <Button variant="destructive" onClick={() => deleteTrip(trip.trip_id)}>
                                                    Delete
                                                </Button>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-muted-foreground py-6 text-center">No upcoming trips data found</div>
                )}
            </CardContent>
        </Card>
    );
}
