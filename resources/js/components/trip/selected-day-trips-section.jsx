import { format } from 'date-fns';
import { Clock, MapPin, MoreHorizontal, Users } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

export function SelectedDayTripsSection({ selectedDateTrips, date, getStatusBadge }) {
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
                            <div key={trip.id} className="flex flex-col justify-between rounded-lg border p-4 md:flex-row">
                                <div className="mb-4 flex flex-col gap-2 md:mb-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold">{trip.title}</h3>
                                        {getStatusBadge(trip.status)}
                                    </div>
                                    <div className="text-muted-foreground flex items-center text-sm">
                                        <Clock className="mr-2 h-4 w-4" />
                                        {format(trip.date, 'h:mm a')} • {trip.duration}
                                    </div>
                                    <div className="text-muted-foreground flex items-center text-sm">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        {trip.startLocation} to {trip.endLocation}
                                    </div>
                                </div>
                                <div className="flex flex-row items-start gap-4 md:flex-col">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={trip.driverAvatar || '/placeholder.svg'} alt={trip.driver} />
                                            <AvatarFallback>
                                                {trip.driver
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="text-sm">
                                            <p className="font-medium">{trip.driver}</p>
                                            <p className="text-muted-foreground text-xs">{trip.vehicle}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Users className="mr-2 h-4 w-4" />
                                        {trip.passengers} passengers
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
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Edit Trip</DropdownMenuItem>
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
