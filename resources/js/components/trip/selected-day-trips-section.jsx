import { format, parseISO } from 'date-fns';
import { Car, Clock, FileText, MapPin, MoreHorizontal, User, Users } from 'lucide-react';

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

export function SelectedDayTripsSection({ selectedDateTrips, date, getStatusBadge, editTrip, viewTripDetails }) {
    return (
        <Card className="col-span-1 md:col-span-2">
            <CardHeader>
                <CardTitle>{date ? format(date, 'MMMM d, yyyy') : 'Select a date'}</CardTitle>
                <CardDescription>{selectedDateTrips.length} trips scheduled</CardDescription>
            </CardHeader>
            <CardContent>
                {selectedDateTrips.length > 0 ? (
                    <div className="grid gap-4">
                        {selectedDateTrips.map((trip) => (
                            <div key={trip.trip_number} className="flex flex-col justify-between rounded-lg border p-4 md:flex-row">
                                <div className="mb-4 flex flex-col gap-2 md:mb-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold">{trip.purpose}</h3>
                                        {getStatusBadge(trip.status)}
                                    </div>
                                    <div className="text-muted-foreground flex items-center text-sm">
                                        <Clock className="mr-2 h-4 w-4" />
                                        {format(parseISO(`${trip.start_date}T${trip.departure_time}`), 'h:mm a')}
                                        {trip.start_date !== trip.end_date && (
                                            <span className="ml-2">
                                                ({format(parseISO(trip.start_date), 'MMM d')} - {format(parseISO(trip.end_date), 'MMM d')})
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-muted-foreground flex items-center text-sm">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        {trip.destination}
                                    </div>
                                    <div className="text-muted-foreground flex items-center text-sm">
                                        <FileText className="mr-2 h-4 w-4" />
                                        Trip #{trip.trip_number} • Filed on {format(parseISO(trip.date_filed), 'MMM d, yyyy')}
                                    </div>
                                    <div className="text-muted-foreground flex items-center text-sm">
                                        <Users className="mr-2 h-4 w-4" />
                                        Requested by: {trip.requesting_party}
                                    </div>
                                </div>
                                <div className="flex flex-row items-start gap-4 md:flex-col">
                                    <div className="flex items-center gap-2">
                                        <User className="mr-2 h-4 w-4" />
                                        <p className="font-medium">{trip.driver_name}</p>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Car className="mr-2 h-4 w-4" />
                                        {trip.vehicle.vehicle_name} ({trip.vehicle.plate_number})
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
                    <div className="text-muted-foreground py-12 text-center">No trips scheduled for this date</div>
                )}
            </CardContent>
        </Card>
    );
}
