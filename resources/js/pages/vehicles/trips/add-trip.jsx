import PassengerAddingForm from '@/components/passenger/passenger-adding-form';
import TripForm from '@/components/trip/trip-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import React from 'react';
import { toast } from 'sonner';

const breadcrumbs = [
    { title: 'Trips', href: '/vehicles/trips' },
    { title: 'New trip', href: 'vehicles/trips/add-trip' },
];

const pageDetails = {
    title: 'Add New Trip',
    description: 'Record the details of a vehicle trip.',
};

export default function AddTrip({ vehicles, users }) {
    const [stage, setStage] = React.useState(1);

    const { data, setData, post, processing, errors, reset } = useForm({
        date_filed: format(new Date(), 'yyyy-MM-dd'),
        trip_number: '',
        start_date: '',
        end_date: '',
        purpose: '',
        destination: '',
        departure_time: '',
        requesting_party: '',
        passengers: [],
    });

    const nextStage = (e) => {
        e.preventDefault(); // prevent form from submitting
        setStage((prev) => prev + 1);
    };

    const previousStage = () => {
        setStage((prev) => prev - 1);
    };

    const addTrip = (e) => {
        e.preventDefault();
        post(
            route('trips.store'),
            { data },
            {
                onSuccess: () => {
                    toast.success('Trip added successfully');
                    reset();
                },
                onError: (errors) => {
                    toast.error('Failed to add trip');
                    console.log(errors);
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Add New Trip" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card>
                    <CardHeader>
                        <CardTitle>{stage === 1 ? 'Trip Details' : 'Passenger Information'}</CardTitle>
                        <CardDescription>
                            {stage === 1 ? 'Provide the necessary information for the trip.' : 'Add all passengers who will be traveling'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {stage === 1 ? (
                            <TripForm
                                formData={data}
                                setData={setData}
                                onSubmit={nextStage}
                                processing={processing}
                                errors={errors}
                                vehicles={vehicles}
                                users={users}
                                formType="create"
                            />
                        ) : (
                            <PassengerAddingForm
                                formData={data}
                                setData={setData}
                                onPreviousStep={previousStage}
                                onSubmit={addTrip}
                                isSubmitting={processing}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
