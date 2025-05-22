import InspectionForm from '@/components/inspection/inspection-form';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import { Head, useForm } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    { title: 'Service Requests Inspection', href: '/services/request-inspections' },
    { title: 'New service request inspection', href: 'services/request-inspections/create' },
];

const pageDetails = {
    title: 'Create Service Request Inspection',
    description: 'Record the details of a vehicle repair.',
};

export default function CreateInspection({ serviceRequests, users, requestId }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        request_id: requestId,
        started_at: '',
        completed_at: '',
        parts_available: '',
        personnel_available: '',
        estimated_duration: '',
        conducted_by: '',
        confirmed_by: '',
    });

    const createInspection = (e) => {
        e.preventDefault();
        post(route('request-inspections.store'), {
            data,
            onSuccess: () => reset(),
            onError: (errors) => console.log(errors),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            {console.log(requestId)}
            <Head title="Repairs" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Inspection Information</CardTitle>
                        <CardDescription>Enter the details of the inspection.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <InspectionForm
                            formData={data}
                            formType={'add'}
                            setData={setData}
                            onSubmit={createInspection}
                            processing={processing}
                            errors={errors}
                            serviceRequests={serviceRequests}
                            users={users}
                            lockInputs={requestId ? true : false}
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
