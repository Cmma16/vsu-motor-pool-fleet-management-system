import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import { Head, useForm } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import InspectionForm from '@/components/inspection/inspection-form';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    {
        title: 'Service Request Inspections',
        href: '/services/request-inspections',
    },
    {
        title: 'Edit',
        href: '/services/request-inspections/edit',
    },
];

const pageDetails = {
    title: 'Edit Inspection Details',
    description: 'Update the details of the conducted inspection.',
};

export default function EditInspection({ users, serviceRequests, serviceInspection }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        request_id: serviceInspection.request_id,
        started_at: serviceInspection.started_at,
        completed_at: serviceInspection.completed_at,
        parts_available: serviceInspection.parts_available,
        personnel_available: serviceInspection.personnel_available,
        estimated_duration: serviceInspection.estimated_duration,
        conducted_by: serviceInspection.conducted_by,
        confirmed_by: serviceInspection.confirmed_by,
    });

    const updateInspection = (e) => {
        e.preventDefault();

        put(route('request-inspections.update', serviceInspection.inspection_id), {
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
            {console.log(serviceInspection)}
            <Head title="Inspections" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Inspection Information</CardTitle>
                        <CardDescription>Updating the details of the inspection.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <InspectionForm
                            formData={data}
                            formType={'edit'}
                            setData={setData}
                            onSubmit={updateInspection}
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
