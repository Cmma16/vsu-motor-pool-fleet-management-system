import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { format, parse } from 'date-fns';

// import { Button } from 'react-day-picker';

const breadcrumbs = [
    {
        title: 'Trips',
        href: '/vehicles/trips',
    },
    {
        title: 'Details',
        href: 'vehicles/trips/details',
    },
];

const pageDetails = {
    title: 'Trip Details',
    description: 'Comprehensive information about the trip.',
};

export default function TripDetails({ trip }) {
    // Format the departure time to 12-hour format
    const formattedTime = trip.departure_time ? format(parse(trip.departure_time, 'HH:mm', new Date()), 'h:mm a') : '';

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Trip Details" />
            {console.log(trip)}
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Trip Information</CardTitle>
                        <CardDescription>General overview of the trip.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Trip Number */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="trip_number">Trip Number</Label>
                                    <span>{trip.trip_number}</span>
                                </div>
                                {/* Date Filed */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="date_filed">Date Filed</Label>
                                    <span>{trip.date_filed}</span>
                                </div>
                                {/* Start Date */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="start_date">Start Date</Label>
                                    <span>{trip.start_date}</span>
                                </div>
                                {/* End Date */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="end_date">End Date</Label>
                                    <span>{trip.end_date}</span>
                                </div>
                                {/* Purpose */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="purpose">Purpose</Label>
                                    <span>{trip.purpose}</span>
                                </div>
                                {/* Destination */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="destination">Destination</Label>
                                    <span>{trip.destination}</span>
                                </div>
                                {/* Departure Time */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="departure_time">Departure Time</Label>
                                    <span>{formattedTime}</span>
                                </div>
                                {/* Requesting Party */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="requesting_party">Requesting Party</Label>
                                    <span>{trip.requesting_party}</span>
                                </div>
                                {/* Vehicle */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="vehicle">Vehicle</Label>
                                    <span>{trip.vehicle_name}</span>
                                </div>
                                {/* Driver */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="driver">Driver</Label>
                                    <span>{trip.driver_name}</span>
                                </div>
                                {/* Status */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <span>{trip.status}</span>
                                </div>

                                <Link
                                    href={`${trip.trip_id}/edit`}
                                    className="col-span-2 w-1/3 rounded-md bg-[#006600] px-3 py-2 text-center text-white hover:bg-[#005500]"
                                >
                                    Edit Trip
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
