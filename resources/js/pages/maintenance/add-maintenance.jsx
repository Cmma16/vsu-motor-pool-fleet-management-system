import MaintenanceForm from '@/components/maintenance/maintenance-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, useForm } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    { title: 'Maintenance', href: '/maintenance' },
    { title: 'New maintenance', href: '/maintenance/add-maintenance' },
];

const pageDetails = {
    title: 'Vehicle Maintenance Record',
    description: 'Record the details of a vehicle maintenance.',
};

export default function AddMaintenance({ maintenancePlans, vehicles, users, serviceRequests, odometerLogs, requestId, vehicleId }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        plan_id: '',
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
        console.log(data);
        e.preventDefault();
        post(route('maintenance.store'), {
            data,
            onSuccess: () => reset(),
            onError: (errors) => console.log(errors),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Maintenance" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Maintenance Information</CardTitle>
                        <CardDescription>Enter the details of the maintenance.</CardDescription>
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
                            lockInputs={requestId && vehicleId}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
