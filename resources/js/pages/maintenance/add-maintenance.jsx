import MaintenanceForm from '@/components/maintenance/maintenance-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    { title: 'Maintenance', href: '/maintenance' },
    { title: 'New maintenance', href: '/maintenance/add-maintenance' },
];

const pageDetails = {
    title: 'Vehicle Maintenance Record',
    description: 'Record the details of a vehicle maintenance.',
};

export default function AddMaintenance({ maintenancePlans, vehicles, users, serviceRequests, odometerLogs, requestId, vehicleId, planId }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        plan_id: planId || '',
        vehicle_id: vehicleId || '',
        request_id: requestId || '',
        date_in: '',
        date_completed: '',
        odometer_id: '',
        performed_by: '',
        confirmed_by: '',
        date_confirmed: '',
        maintenance_summary: '',
    });

    const createMaintenance = (e) => {
        console.log(data); //delete this
        e.preventDefault();

        // Create a shallow copy of data
        const submitData = { ...data };
        delete submitData.vehicle_id;
        delete submitData.plan_id;

        post(route('maintenance.store'), {
            data: submitData,
            onSuccess: () => {
                toast.success('Maintenance recorded', {
                    description: 'Maintenance record created successfully',
                });
                reset();
            },
            onError: (errors) => {
                toast.error('Failed to create maintenance record');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Maintenance" />
            <div className="flex min-h-screen items-center justify-center">
                <Card className="m-4 w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg">
                    <CardHeader>
                        <CardTitle>Maintenance Information</CardTitle>
                        <CardDescription>Enter the details of the maintenance conducted.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MaintenanceForm
                            formData={data}
                            formType={'add'}
                            setData={setData}
                            onSubmit={createMaintenance}
                            processing={processing}
                            errors={errors}
                            vehicles={vehicles}
                            users={users}
                            serviceRequests={serviceRequests}
                            odometerLogs={odometerLogs}
                            maintenancePlans={maintenancePlans}
                            lockInputs={requestId && vehicleId && planId}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
