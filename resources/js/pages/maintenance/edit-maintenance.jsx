import MaintenanceEditForm from '@/components/maintenance/maintenance-edit-form';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import { Head, useForm } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    {
        title: 'Maintenance',
        href: '/maintenance',
    },
    {
        title: 'Edit',
        href: 'maintenance/edit',
    },
];

const pageDetails = {
    title: 'Edit Maintenance Details',
    description: 'Update the details of the maintenance request.',
};

export default function EditMaintenance({ maintenance, odometerLogs, vehicles }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        date_in: maintenance.date_in,
        date_completed: maintenance.date_completed,
        maintenance_summary: maintenance.maintenance_summary,
        odometer_id: maintenance.odometer_id,
    });

    const editMaintenance = (e) => {
        console.log(data);
        e.preventDefault();

        put(route('maintenance.update', maintenance.maintenance_id), {
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
            {/* delete this */}
            {/* {console.log(maintenance)} */}
            <Head title="Maintenance" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Maintenance Information</CardTitle>
                        <CardDescription>Update the details of the maintenance record.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MaintenanceEditForm
                            formData={data}
                            formType={'edit'}
                            setData={setData}
                            onSubmit={editMaintenance}
                            processing={processing}
                            errors={errors}
                            presets={maintenance}
                            odometerLogs={odometerLogs}
                            vehicles={vehicles}
                            lockInputs={true}
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
