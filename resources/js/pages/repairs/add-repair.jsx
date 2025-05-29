import RepairForm from '@/components/repairs/repair-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs = [
    { title: 'Repairs', href: '/repairs' },
    { title: 'New repair', href: '/repairs/create' },
];

const pageDetails = {
    title: 'Vehicle Repair Record',
    description: 'Record the details of a vehicle repair.',
};

export default function AddRepair({ vehicles, users, serviceRequests, odometerLogs, requestId, vehicleId }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        vehicle_id: vehicleId || '',
        request_id: requestId || '',
        date_in: '',
        date_completed: '',
        odometer_id: '',
        maintenance_summary: '',
    });

    const createRepair = (e) => {
        e.preventDefault();
        post(route('repairs.store'), {
            data,
            onSuccess: () => {
                toast.success('Repair Recorded', {
                    description: 'Repair record created successfully.',
                });
                reset();
            },
            onError: (errors) => {
                toast.error('Error', {
                    description: 'An error occurred while creating the repair record.',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Repairs" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg">
                <Card className="mx-auto w-full md:max-w-xl">
                    <CardHeader>
                        <CardTitle>Repair Information</CardTitle>
                        <CardDescription>Enter the details of the repair.</CardDescription>
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
                            serviceRequests={serviceRequests}
                            odometerLogs={odometerLogs}
                            lockInputs={requestId && vehicleId}
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
