import RepairForm from '@/components/repairs/repair-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import { toast } from 'sonner';

const breadcrumbs = [
    { title: 'Preventive Maintenance', href: '/preventive' },
    { title: 'New preventive maintenance record', href: '/repairs/add-preventive' },
];

const pageDetails = {
    title: 'Vehicle Preventive Maintenance Record',
    description: 'Record the details of a vehicle preventive maintenance record.',
};

export default function AddPreventive({ vehicles, users, serviceRequests, odometerLogs, requestId, vehicleId }) {
    const [stage, setStage] = React.useState(1);

    const { data, setData, post, processing, errors, reset } = useForm({
        vehicle_id: vehicleId || '',
        request_id: requestId || '',
        date_in: '',
        date_completed: '',
        odometer_id: '',
        maintenance_summary: '',
        parts_used: [],
    });

    const createPreventiveMaintenance = (e) => {
        e.preventDefault();
        post(route('preventive.store'), {
            data,
            onSuccess: () => {
                toast.success('Preventive Maintenance Recorded', {
                    description: 'Preventive maintenance record created successfully.',
                });
                reset();
            },
            onError: (errors) => {
                toast.error('Error', {
                    description: 'An error occurred while creating the preventive maintenance record.',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Preventive Miantenance" />
            <div className="mx-2 my-4 flex flex-col gap-6 md:flex-row md:gap-8">
                <Card className="mx-auto w-full md:max-w-xl">
                    <CardHeader>
                        <CardTitle>{stage === 1 ? 'Preventive Maintenance Details' : 'Parts used'}</CardTitle>
                        <CardDescription>Enter the details of the preventive maintenance conducted.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RepairForm
                            formData={data}
                            formType={'add'}
                            setData={setData}
                            onSubmit={createPreventiveMaintenance}
                            processing={processing}
                            errors={errors}
                            vehicles={vehicles}
                            users={users}
                            serviceRequests={serviceRequests}
                            odometerLogs={odometerLogs}
                            lockInputs={requestId && vehicleId}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
