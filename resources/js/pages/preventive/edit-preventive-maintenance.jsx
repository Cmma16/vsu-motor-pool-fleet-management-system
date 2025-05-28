import RepairForm from '@/components/repairs/repair-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs = [
    {
        title: 'Preventive Maintenance',
        href: '/preventive',
    },
    {
        title: 'Edit',
        href: 'preventive/edit',
    },
];

const pageDetails = {
    title: 'Edit Preventive Maintenance Details',
    description: 'Update the details of the preventive maintenance record.',
};

export default function EditPreventive({ preventive, vehicles, users, serviceRequests, odometerLogs }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        vehicle_id: preventive.vehicle_id,
        request_id: preventive.request_id,
        date_in: preventive.date_in,
        date_completed: preventive.date_completed,
        performed_by: preventive.performed_by,
        confirmed_by: preventive.confirmed_by,
        maintenance_summary: preventive.summary,
        odometer_id: preventive.odometer_id,
    });

    const editPreventive = (e) => {
        e.preventDefault();

        put(route('preventive.update', preventive.preventive_id), {
            // data, // Sends all form data
            // forceFormData: true, // Ensures file uploads and proper formatting
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Preventive maintenance record updated', {
                    description: 'Preventive maintenance record updated successfully',
                });
                reset(); // Reset all fields after a successful submission
            },
            onError: (errors) => {
                toast.error('Failed to update record', {
                    description: 'An error occurred while updating the record',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Preventive Maintenance" />
            <div className="mx-2 my-4 flex flex-col gap-6 md:flex-row md:gap-8">
                <Card className="mx-auto w-full md:max-w-xl">
                    <CardHeader>
                        <CardTitle>Preventive Maintenance Information</CardTitle>
                        <CardDescription>Update the details of the record.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RepairForm
                            formData={data}
                            formType={'edit'}
                            setData={setData}
                            onSubmit={editPreventive}
                            processing={processing}
                            errors={errors}
                            vehicles={vehicles}
                            users={users}
                            serviceRequests={serviceRequests}
                            odometerLogs={odometerLogs}
                            lockInputs={true}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
