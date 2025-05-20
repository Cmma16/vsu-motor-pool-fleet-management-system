import MaintenanceForm from '@/components/maintenance/maintenance-form';
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

export default function EditMaintenance({ maintenance, vehicles, odometerLogs, maintenancePlans, users, serviceRequests }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        vehicle_id: maintenance.vehicle_id,
        request_id: maintenance.request_id,
        plan_id: maintenance.plan_id,
        date_in: maintenance.date_in,
        date_completed: maintenance.date_completed,
        performed_by: maintenance.performed_by,
        confirmed_by: maintenance.confirmed_by,
        date_confirmed: maintenance.date_confirmed,
        maintenance_summary: maintenance.maintenance_summary,
        odometer_id: maintenance.odometer_id,
    });

    const editMaintenance = (e) => {
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
            <Head title="Maintenance" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Maintenance Information</CardTitle>
                        <CardDescription>Update the details of the maintenance record.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MaintenanceForm
                            formData={data}
                            formType={'edit'}
                            setData={setData}
                            onSubmit={editMaintenance}
                            processing={processing}
                            errors={errors}
                            vehicles={vehicles}
                            users={users}
                            serviceRequests={serviceRequests}
                            odometerLogs={odometerLogs}
                            maintenancePlans={maintenancePlans}
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
