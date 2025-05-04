import AccomplishmentForm from '@/components/accomplishment/accomplishment-form';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import { Head, useForm } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    { title: 'Service Request Accomplishments', href: '/services/completed' },
    { title: 'New service request accomplishment', href: 'services/completed/create' },
];

const pageDetails = {
    title: 'Create Accomplishment Record',
    description: 'Record the details of a completed service.',
};

export default function CreateAccomplishment({ serviceRequests, users }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        request_id: '',
        started_at: '',
        completed_at: '',
        conducted_by: '',
        verified_by: '',
    });

    const createAccomplishment = (e) => {
        e.preventDefault();
        post(route('completed.store'), {
            data,
            onSuccess: () => reset(),
            onError: (errors) => console.log(errors),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Service Accomplishments" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Inspection Information</CardTitle>
                        <CardDescription>Enter the details of the inspection.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AccomplishmentForm
                            formData={data}
                            formType={'add'}
                            setData={setData}
                            onSubmit={createAccomplishment}
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
