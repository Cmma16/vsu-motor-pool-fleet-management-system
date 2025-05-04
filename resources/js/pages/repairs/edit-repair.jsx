import RepairForm from '@/components/repairs/repair-form';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import { Head, useForm } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    {
        title: 'Repairs',
        href: '/repairs',
    },
    {
        title: 'Edit',
        href: 'repairs/edit',
    },
];

const pageDetails = {
    title: 'Edit Repair Details',
    description: 'Update the details of the repair request.',
};

export default function EditRepair({ repair, vehicles, users, serviceRequests }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        vehicle_id: repair.vehicle_id,
        request_id: repair.request_id,
        performed_by: repair.performed_by,
        confirmed_by: repair.confirmed_by,
        description: repair.description,
        status: repair.status,
    });

    const editRepair = (e) => {
        e.preventDefault();

        put(route('repairs.update', repair.repair_id), {
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
            <Head title="Repairs" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Repair Information</CardTitle>
                        <CardDescription>Update the details of the repair request.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RepairForm
                            formData={data}
                            formType={'edit'}
                            setData={setData}
                            onSubmit={editRepair}
                            processing={processing}
                            errors={errors}
                            vehicles={vehicles}
                            users={users}
                            serviceRequests={serviceRequests}
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
