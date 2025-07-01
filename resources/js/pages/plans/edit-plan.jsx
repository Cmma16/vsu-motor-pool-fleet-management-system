import PlanForm from '@/components/plans/plan-form';

import { Head, useForm } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    {
        title: 'Maintenance Plans',
        href: '/plans',
    },
    {
        title: 'Edit',
        href: 'plans/edit',
    },
];

const pageDetails = {
    title: 'Edit Plan Details',
    description: 'Update the details of the maintenance plan.',
};

export default function EditPlan({ maintenancePlan, vehicles, users }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        vehicle_id: maintenancePlan.vehicle_id,
        description: maintenancePlan.description,
        scheduled_date: maintenancePlan.scheduled_date,
        created_by: maintenancePlan.created_by,
        status: maintenancePlan.status,
    });

    const updatePlan = (e) => {
        e.preventDefault();

        put(route('plans.update', maintenancePlan.plan_id), {
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
            {console.log(maintenancePlan)}
            <Head title="Repairs" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg">
                <Card className="mx-auto w-full md:max-w-xl">
                    <CardHeader>
                        <CardTitle>Plan Information</CardTitle>
                        <CardDescription>Update the details of the maintenance plan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PlanForm
                            formData={data}
                            formType={'edit'}
                            setData={setData}
                            onSubmit={updatePlan}
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
