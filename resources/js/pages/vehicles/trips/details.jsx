import { DisplayTable } from '@/components/display-table';
import { PassengerViewOnlyColumn } from '@/components/passenger/passenger-view-only-column';
import TripLogDetails from '@/components/trip/trip-log-details';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { format, parse } from 'date-fns';
import { ArrowLeft, FileText } from 'lucide-react';

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

function setAsPartyHead(passengerId) {
    router.post(`/passengers/${passengerId}/assign-party-head`, {
        preserveScroll: true,
        onSuccess: () => {
            console.log('Party head updated');
        },
    });
}

export default function TripDetails({ trip }) {
    // Format the departure time to 12-hour format
    const formattedTime = trip.departure_time ? format(parse(trip.departure_time, 'HH:mm:ss', new Date()), 'h:mm a') : '';
    const user = usePage().props.auth.user;

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Trip Details" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg">
                <div className="flex justify-between">
                    <Button variant="outline" className="bg-white" onClick={() => router.get(route('trips.index'))}>
                        <ArrowLeft /> Trip List
                    </Button>
                    {trip.status === 'assigned' && user.role.name === 'Driver' && (
                        <Button variant="default" onClick={() => router.get(route('trip-logs.create', trip.trip_id))}>
                            <FileText className="mr-2 h-4 w-4" />
                            Start Trip
                        </Button>
                    )}
                    {trip.status === 'ongoing' && (
                        <Button
                            className="border-2 border-[#006600] bg-white text-black hover:bg-[#005500] hover:text-white"
                            onClick={() => router.get(route('trip-logs.end', trip.trip_id))}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            End Trip
                        </Button>
                    )}
                    {trip.status === 'completed' && (
                        <Button
                            className="border-2 border-[#006600] bg-white text-black hover:bg-[#005500] hover:text-white"
                            onClick={() => window.open(`/trips/${trip.trip_id}/pdf`, '_blank')}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            Print
                        </Button>
                    )}
                </div>
                {console.log(trip)}
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Trip Information</CardTitle>
                        <CardDescription>General overview of the trip.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                {/* Trip Number */}
                                <div className="flex flex-col space-y-2">
                                    <p className="font-medium">Trip Number</p>
                                    <p className="text-muted-foreground">{trip.trip_number}</p>
                                </div>
                                {/* Date Filed */}
                                <div className="flex flex-col space-y-2">
                                    <p className="font-medium">Date Filed</p>
                                    <p className="text-muted-foreground">{format(new Date(trip.date_filed), 'MMMM d, yyyy')}</p>
                                </div>
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
                                {/* Status */}
                                <div className="flex flex-col space-y-2">
                                    <p className="font-medium">Status</p>
                                    <p className="text-muted-foreground">{trip.status}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <Separator className="my-2" />
                    <CardFooter className="">
                        <div className="flex w-full flex-col justify-end gap-3 sm:flex-row">
                            {trip.status === 'pending' && (
                                <Link
                                    href={`${trip.trip_id}/edit`}
                                    className="rounded-md border-2 border-[#006600] px-6 py-1 text-center hover:bg-gray-100"
                                >
                                    Edit Trip
                                </Link>
                            )}
                            {trip.status === 'pending' && (
                                <Button
                                    className="rounded-md bg-[#006600] px-6 py-2 text-center text-white hover:bg-[#005500]"
                                    onClick={() => {
                                        router.get(`/trips/${trip.trip_id}/assign`);
                                    }}
                                >
                                    Assign
                                </Button>
                            )}
                        </div>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Passengers</CardTitle>
                        <CardDescription className="flex justify-between">List of passengers of the trip.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DisplayTable
                            columns={PassengerViewOnlyColumn}
                            data={trip.passengers}
                            handleEdit={setAsPartyHead}
                            handleView={undefined}
                            handleDelete={undefined}
                        />
                    </CardContent>
                </Card>
                {trip.trip_log_id && (
                    <TripLogDetails pre_trip={trip.pre_trip} post_trip={trip.post_trip} trip_log_id={trip.trip_log_id} trip_status={trip.status} />
                )}
            </div>
        </AppLayout>
    );
}
