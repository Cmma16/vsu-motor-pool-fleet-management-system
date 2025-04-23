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
    title: 'Schedule a Repair',
    description: 'Schedule a repair for your vehicle.',
};

export default function AddRepair({ vehicles, users }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        vehicle_id: '',
        description: '',
        scheduled_date: '',
        required_by: '',
        urgency_level: '',
        assigned_personnel: '',
        status: 'pending',
        requested_by: '',
    });

    const createRepair = (e) => {
        e.preventDefault();
        console.log(data);
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
                        <CardDescription>Enter the details of the repair you want to schedule.</CardDescription>
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
