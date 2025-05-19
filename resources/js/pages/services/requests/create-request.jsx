import RequestForm from '@/components/request/request-form';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import { Head, useForm } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    { title: 'Service Requests', href: '/services/requests' },
    { title: 'New request', href: 'services/requests/create' },
];

const pageDetails = {
    title: 'Create Service Requests',
    description: 'Record the details of a vehicle repair.',
};

export default function CreateRequest({ vehicles }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        vehicle_id: '',
        requested_by: '',
        date_filed: '',
        service_type: '',
        work_description: '',
        received_by: '',
        date_received: '',
        status: '',
    });

    const createRepair = (e) => {
        e.preventDefault();
        post(route('requests.store'), {
            data,
            onSuccess: () => reset(),
            onError: (errors) => console.log(errors),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Repairs" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Repair Information</CardTitle>
                        <CardDescription>Enter the details of the repair.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RequestForm
                            formData={data}
                            formType={'add'}
                            setData={setData}
                            onSubmit={createRepair}
                            processing={processing}
                            errors={errors}
                            vehicles={vehicles}
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
