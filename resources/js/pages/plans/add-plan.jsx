import PlanForm from '@/components/plans/plan-form';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import { Head, useForm } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Maintenance Plans',
        href: '/plans',
    },
    {
        title: 'New maintenance plan',
        href: '/plans/create',
    },
];

const pageDetails = {
    title: 'Vehicle Maintenance Plan',
    description: 'Record the details of a vehicle maintenance plan.',
};

export default function AddPlan({ vehicles, users }) {
    const user = usePage().props.auth.user;
    const { data, setData, post, processing, errors, reset } = useForm({
        vehicle_id: '',
        scheduled_date: '',
        created_by: user.id,
        status: 'pending',
    });

    const createPlan = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('plans.store'), {
            data,
            onSuccess: () => reset(),
            onError: (errors) => console.log(errors),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Repairs" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg">
                <Card className="mx-auto w-full md:max-w-xl">
                    <CardHeader>
                        <CardTitle>Plan Information</CardTitle>
                        <CardDescription>Enter the details of the maintenance plan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PlanForm
                            formData={data}
                            formType={'add'}
                            setData={setData}
                            onSubmit={createPlan}
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
