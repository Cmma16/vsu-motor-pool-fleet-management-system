import TripInfoCard from '@/components/trip/trip-info-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { format, parse } from 'date-fns';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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

export default function AssignTrip({ trip, availableVehicles, availableDrivers }) {
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
        departure_time: format(parse(trip.departure_time, 'HH:mm:ss', new Date()), 'hh:mm'),
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
                toast.success('Trip assigned successfully');
                reset(); // Reset all fields after a successful submission
                setIsSubmitting(false);
            },
            onError: (errors) => {
                toast.error('Failed to assign trip');
                console.log(errors); // Log errors for debugging
                setIsSubmitting(false);
            },
        });
    };

    const handleStatusUpdate = (id, status) => {
        router.patch(
            route('trips.updateStatus', id),
            {
                status: status,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast('Trip status updated successfully');
                },
                onError: () => {
                    toast('Failed to update trip status');
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Assign Trip" />
            <Button variant="outline" className="mx-4 self-start bg-white" onClick={() => router.get(route('trips.show', trip.trip_id))}>
                <ArrowLeft /> Trip Details
            </Button>
            <div className="mb-8 grid gap-6 p-4 md:grid-cols-2">
                <TripInfoCard trip={trip} />
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
                    <CardFooter className="flex flex-col gap-2 sm:flex-row">
                        <Button className="w-full sm:w-1/2" onClick={handleAssign} disabled={!data.driver_id || !data.vehicle_id || isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Assigning...
                                </>
                            ) : (
                                'Confirm Assignment'
                            )}
                        </Button>
                        <Button
                            className="w-full sm:w-1/2"
                            variant="destructive"
                            onClick={() => handleStatusUpdate(trip.trip_id, 'rejected')}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Rejecting...
                                </>
                            ) : (
                                'Reject Trip'
                            )}
                        </Button>
                    </CardFooter>
                </Card>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </AppLayout>
    );
}
