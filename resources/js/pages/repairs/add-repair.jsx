import RepairForm from '@/components/repairs/repair-form';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import { Head, useForm } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    { title: 'Repairs', href: '/repairs' },
    { title: 'New repair', href: '/repairs/create' },
];

const pageDetails = {
    title: 'Vehicle Repair Record',
    description: 'Record the details of a vehicle repair.',
};

export default function AddRepair({ vehicles, users, serviceRequests, odometerLogs }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        vehicle_id: '',
        request_id: '',
        performed_by: '',
        confirmed_by: '',
        description: '',
        status: '',
    });

    const createRepair = (e) => {
        e.preventDefault();
        post(route('repairs.store'), {
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
                        <RepairForm
                            formData={data}
                            formType={'add'}
                            setData={setData}
                            onSubmit={createRepair}
                            processing={processing}
                            errors={errors}
                            vehicles={vehicles}
                            users={users}
                            serviceRequests={serviceRequests}
                            odometerLogs={odometerLogs}
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
