import TripForm from '@/components/trip/trip-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs = [
    { title: 'Trips', href: '/vehicles/trips' },
    { title: 'New trip', href: 'vehicles/trips/add-trip' },
];

const pageDetails = {
    title: 'Add New Trip',
    description: 'Record the details of a vehicle trip.',
};

export default function AddTrip({ vehicles, users }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        date_filed: '',
        trip_number: '',
        start_date: '',
        end_date: '',
        purpose: '',
        destination: '',
        departure_time: '',
        requesting_party: '',
        vehicle_id: '',
        driver_id: '',
        status: '',
    });

    const addTrip = (e) => {
        e.preventDefault();
        post(route('trips.store'), {
            data,
            onSuccess: () => reset(),
            onError: (errors) => console.log(errors),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Add New Trip" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Trip</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TripForm
                            formData={data}
                            formType={'add'}
                            setData={setData}
                            onSubmit={addTrip}
                            processing={processing}
                            errors={errors}
                            vehicles={vehicles}
                            users={users}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
