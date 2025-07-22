import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { router } from '@inertiajs/react';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';
import { CalendarIcon, Clock, FileText, MapPin } from 'lucide-react';

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
        case 'rejected':
            return (
                <Badge variant="default" className="bg-red-500">
                    Rejected
                </Badge>
            );
        case 'received':
            return (
                <Badge variant="secondary" className="bg-gray-500">
                    Received
                </Badge>
            );
        case 'dispatched':
            return (
                <Badge variant="default" className="bg-blue-500">
                    Dispatched
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

export default function TripDisplaySection({ trips, sectionTitle, sectionDescription, handleViewDetails }) {
    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>{sectionTitle}</CardTitle>
                <CardDescription>{sectionDescription}</CardDescription>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
                {trips.length > 0 ? (
                    <div className="grid gap-4">
                        {trips.map((trip) => (
                            <div key={trip.trip_number} className="flex flex-col justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold">{trip.purpose}</h3>
                                    {getStatusBadge(trip.status)}
                                </div>
                                <div className="flex flex-row justify-between pt-2">
                                    <div className="mb-4 flex flex-col gap-2 md:mb-0">
                                        <div className="text-muted-foreground flex items-center text-sm">
                                            <Clock className="mr-2 h-4 w-4" />
                                            {formatTripDate(trip.start_date, trip.departure_time)}
                                        </div>
                                        <div className="text-muted-foreground flex items-center text-sm">
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {format(parseISO(trip.start_date), 'MMM d')}
                                            {trip.start_date !== trip.end_date && ` - ${format(parseISO(trip.end_date), 'MMM d')}`}
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-start gap-4 md:flex-col">
                                        <div className="mb-4 flex flex-col gap-2 md:mb-0">
                                            <div className="text-muted-foreground flex items-center text-sm">
                                                <MapPin className="mr-2 h-4 w-4" />
                                                {trip.destination}
                                            </div>
                                            <div className="text-muted-foreground flex items-center text-sm">
                                                <FileText className="mr-2 h-4 w-4" />
                                                Trip #{trip.trip_number} • {trip.requesting_party}
                                            </div>
                                        </div>

                                        <div>
                                            <Button variant="outline" onClick={() => handleViewDetails(trip.trip_id)}>
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-muted-foreground py-6 text-center">No upcoming trips data found</div>
                )}
            </CardContent>
            <CardFooter className="flex items-center justify-center">
                {trips.length > 4 && (
                    <Button variant="ghost" className="w-full cursor-pointer hover:bg-gray-200" onClick={() => router.get('/vehicles/trips')}>
                        View All
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
