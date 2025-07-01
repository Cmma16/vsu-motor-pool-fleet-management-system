import { DisplayTable } from '@/components/display-table';
import { PassengerColumn } from '@/components/passenger/passenger-column';
import { PassengerModal } from '@/components/passenger/passenger-modal';
import TripForm from '@/components/trip/trip-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs = [
    {
        title: 'Trips',
        href: '/vehicles/trips',
    },
    {
        title: 'Edit',
        href: '/vehicles/trips/edit-trip',
    },
];

const pageDetails = {
    title: 'Edit Trip Details',
    description: 'Update the details of the trip.',
};
function setAsPartyHead(passengerId) {
    router.post(
        `/passengers/${passengerId}/assign-party-head`,
        {},
        {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Party head updated successfully');
            },
            onError: () => {
                toast.error('Failed to update party head');
            },
        },
    );
}

export default function EditTrip({ vehicles, users, trip }) {
    // Format the departure time to HH:MM format
    const formattedDepartureTime = trip.departure_time ? trip.departure_time.substring(0, 5) : '';

    const { data, setData, put, processing, errors, reset } = useForm({
        date_filed: trip.date_filed,
        trip_number: trip.trip_number,
        start_date: trip.start_date,
        end_date: trip.end_date,
        purpose: trip.purpose,
        destination: trip.destination,
        departure_time: formattedDepartureTime,
        requesting_party: trip.requesting_party,
        status: trip.status,
    });

    const editTrip = (e) => {
        e.preventDefault();
        console.log(data);
        put(route('trips.update', trip.trip_id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Trip updated successfully');
                reset(); // Reset all fields after a successful submission
            },
            onError: (errors) => {
                toast.error('Failed to update trip');
                console.log(errors); // Log errors for debugging
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Repairs" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Trip Information</CardTitle>
                        <CardDescription>Update the details of the trip.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TripForm
                            formData={data}
                            formType={'edit'}
                            setData={setData}
                            onSubmit={editTrip}
                            processing={processing}
                            errors={errors}
                            vehicles={vehicles}
                            users={users}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Passengers</CardTitle>
                        <CardDescription className="flex justify-between">
                            List of passengers of the trip.
                            {trip.status === 'pending' && <PassengerModal trip_id={trip.trip_id} formType="add" />}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DisplayTable
                            columns={PassengerColumn}
                            data={trip.passengers}
                            handleEdit={setAsPartyHead}
                            handleView={undefined}
                            handleDelete={undefined}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
