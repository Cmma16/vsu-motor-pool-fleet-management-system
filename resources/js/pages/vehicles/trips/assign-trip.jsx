import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { format, parse } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

// import { Button } from 'react-day-picker';

const breadcrumbs = [
    {
        title: 'Trips',
        href: '/vehicles/trips',
    },
    {
        title: 'Assign Trip',
        href: 'vehicles/trips/assign-trip',
    },
];

const pageDetails = {
    title: 'Assign Trip',
    description: 'Assign a driver and vehicle to the trip.',
};

function setAsPartyHead(passengerId) {
    router.post(`/passengers/${passengerId}/assign-party-head`, {
        preserveScroll: true,
        onSuccess: () => {
            console.log('Party head updated');
        },
    });
}

export default function AssignTrip({ trip, availableVehicles, availableDrivers }) {
    // Format the departure time to 12-hour format
    const formattedTime = trip.departure_time ? format(parse(trip.departure_time, 'HH:mm', new Date()), 'h:mm a') : '';
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAssigning, setIsAssigning] = useState(false);
    const [error, setError] = useState(null);

    const { data, setData, put, processing, errors, reset } = useForm({
        trip_number: trip.trip_number,
        date_filed: trip.date_filed,
        start_date: trip.start_date,
        end_date: trip.end_date,
        purpose: trip.purpose,
        destination: trip.destination,
        departure_time: trip.departure_time,
        requesting_party: trip.requesting_party,
        status: trip.status,

        driver_id: '',
        vehicle_id: '',
    });

    const handleAssign = (e) => {
        setIsSubmitting(true);
        e.preventDefault();
        console.log(data);
        put(route('trips.update', trip.trip_id), {
            // data, // Sends all form data
            // forceFormData: true, // Ensures file uploads and proper formatting
            preserveScroll: true,
            onSuccess: () => {
                reset(); // Reset all fields after a successful submission
                setIsSubmitting(false);
            },
            onError: (errors) => {
                console.log(errors); // Log errors for debugging
                setIsSubmitting(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Assign Trip" />
            <div className="mb-8 grid gap-6 p-4 md:grid-cols-2">
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
                                    <p className="font-medium">Passengers ({trip.passenger_count})</p>
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
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Assignment</CardTitle>
                        <CardDescription>Select an available driver and vehicle</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="driver">Driver</Label>
                            <Select value={data.driver_id} onValueChange={(value) => setData('driver_id', value)}>
                                <SelectTrigger id="driver">
                                    <SelectValue placeholder="Select a driver" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className="flex flex-row gap-2">
                                        <p className="text-muted-foreground">Showing {availableDrivers.length} available drivers</p>
                                    </div>
                                    {availableDrivers.map((driver) => (
                                        <SelectItem key={driver.id} value={driver.id}>
                                            {driver.first_name} {driver.last_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <Label htmlFor="vehicle">Vehicle</Label>
                            <Select value={data.vehicle_id} onValueChange={(value) => setData('vehicle_id', value)}>
                                <SelectTrigger id="vehicle">
                                    <SelectValue placeholder="Select a vehicle" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className="flex flex-row gap-2">
                                        <p className="text-muted-foreground">Showing {availableVehicles.length} available vehicles</p>
                                    </div>
                                    {availableVehicles.map((vehicle) => (
                                        <SelectItem key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
                                            {vehicle.vehicle_name} ({vehicle.vehicle_type}) - {vehicle.capacity} passengers
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-row gap-2">
                        <Button className="w-full" onClick={handleAssign} disabled={!data.driver_id || !data.vehicle_id || isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Assigning...
                                </>
                            ) : (
                                'Confirm Assignment'
                            )}
                        </Button>
                        {!availableDrivers.length ||
                            (!availableVehicles.length && (
                                <Button className="w-full" variant="destructive" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Rejecting...
                                        </>
                                    ) : (
                                        'Reject Trip'
                                    )}
                                </Button>
                            ))}
                    </CardFooter>
                </Card>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </AppLayout>
    );
}
