import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import { Head, useForm } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import AccomplishmentForm from '@/components/accomplishment/accomplishment-form';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    {
        title: 'Service Request Accomplishments',
        href: '/services/completed',
    },
    {
        title: 'Edit',
        href: '/services/completed/edit',
    },
];

const pageDetails = {
    title: 'Edit Accomplishment Details',
    description: 'Update the details of the completed services.',
};

export default function EditAccomplishment({ users, serviceRequests, serviceAccomplishment }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        request_id: serviceAccomplishment.request_id,
        started_at: serviceAccomplishment.started_at,
        completed_at: serviceAccomplishment.completed_at,
        conducted_by: serviceAccomplishment.conducted_by,
        verified_by: serviceAccomplishment.verified_by,
    });

    const updateAccomplishment = (e) => {
        e.preventDefault();

        put(route('completed.update', serviceAccomplishment.accomplishment_id), {
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
            {console.log(serviceAccomplishment)}
            <Head title="Inspections" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Inspection Information</CardTitle>
                        <CardDescription>Updating the details of the inspection.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AccomplishmentForm
                            formData={data}
                            formType={'edit'}
                            setData={setData}
                            onSubmit={updateAccomplishment}
                            processing={processing}
                            errors={errors}
                            serviceRequests={serviceRequests}
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
