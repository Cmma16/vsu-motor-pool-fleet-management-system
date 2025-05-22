import TripForm from '@/components/trip/trip-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

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
            // data, // Sends all form data
            // forceFormData: true, // Ensures file uploads and proper formatting
            preserveScroll: true,
            onSuccess: () => {
                reset(); // Reset all fields after a successful submission
            },
            onError: (errors) => {
                console.log(errors); // Log errors for debugging
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Repairs" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
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
            </div>
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </div>
        </AppLayout>
    );
}
