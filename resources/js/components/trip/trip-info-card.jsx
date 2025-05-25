import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format, parse } from 'date-fns';

export default function TripInfoCard({ trip }) {
    // Format the departure time to 12-hour format
    const formattedTime = trip.departure_time ? format(parse(trip.departure_time, 'HH:mm', new Date()), 'h:mm a') : '';

    return (
        <Card className="p-4">
            <CardHeader>
                <CardTitle>Trip Information</CardTitle>
                <CardDescription className="flex justify-between gap-2">
                    General overview of the trip.
                    <Badge variant="outline" className="text-sm">
                        Trip Number: {trip.trip_number}
                    </Badge>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {/* Start Date */}
                        <div className="flex flex-col space-y-2">
                            <p className="font-medium">Scheduled Date</p>
                            {trip.start_date !== trip.end_date ? (
                                <p className="text-muted-foreground">{`${format(new Date(trip.start_date), 'MMMM d, yyyy')} - ${format(new Date(trip.end_date), 'MMMM d, yyyy')}`}</p>
                            ) : (
                                <p className="text-muted-foreground">{format(new Date(trip.start_date), 'MMMM d, yyyy')}</p>
                            )}
                        </div>
                        {/* Departure Time */}
                        <div className="flex flex-col space-y-2">
                            <p className="font-medium">Departure Time</p>
                            <p className="text-muted-foreground">{formattedTime}</p>
                        </div>
                        {/* Destination */}
                        <div className="flex flex-col space-y-2">
                            <p className="font-medium">Destination</p>
                            <p className="text-muted-foreground">{trip.destination}</p>
                        </div>
                        {/* Requesting Party */}
                        <div className="flex flex-col space-y-2">
                            <p className="font-medium">Requesting Party</p>
                            <p className="text-muted-foreground">{trip.requesting_party}</p>
                        </div>
                        {/* Passenger Count */}
                        <div className="flex flex-col space-y-2">
                            <p className="font-medium">Passengers ({trip.passengers.length})</p>
                            <ul className="list-disc pl-5">
                                {trip.passengers.map((passenger) => (
                                    <li key={passenger.id} className="text-muted-foreground">
                                        {passenger.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Purpose */}
                        <div className="flex flex-col space-y-2">
                            <p className="font-medium">Purpose</p>
                            <p className="text-muted-foreground">{trip.purpose}</p>
                        </div>
                        {/* Vehicle */}
                        {trip.vehicle?.name && (
                            <div className="flex flex-col space-y-2">
                                <p className="font-medium">Vehicle</p>
                                <p className="text-muted-foreground">{trip.vehicle.name}</p>
                            </div>
                        )}
                        {/* Driver */}
                        {trip.driver_name && (
                            <div className="flex flex-col space-y-2">
                                <p className="font-medium">Driver</p>
                                <p className="text-muted-foreground">{trip.driver_name}</p>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
