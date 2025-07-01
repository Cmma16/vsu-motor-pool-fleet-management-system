import RequestForm from '@/components/request/request-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs = [
    { title: 'Service Requests', href: '/services/requests' },
    { title: 'New request', href: 'services/requests/create' },
];

const pageDetails = {
    title: 'New Service Requests',
    description: 'Complete the form below to add a new service request.',
};

export default function CreateRequest({ vehicles, maintenancePlans }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        vehicle_id: '',
        plan_id: '',
        requested_by: '',
        date_filed: '',
        service_type: '',
        work_description: '',
        received_by: '',
        date_received: '',
        status: '',
    });

    const createRepair = (e) => {
        e.preventDefault();

        if (data.service_type === 'repair') {
            data.plan_id = null;
        }

        post(route('requests.store'), {
            data,
            onSuccess: () => {
                toast.success('Service request submitted', {
                    description: `The ${data.service_type} request has been created successfully.`,
                });
                reset();
            },
            onError: (errors) => {
                toast.error('Error', {
                    description: 'An error occurred while creating the request.',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Repairs" />
            <div className="mx-auto my-8 mb-3 w-full max-w-xl space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Service Request Information</CardTitle>
                        <CardDescription>Enter the details of the service required.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RequestForm
                            formData={data}
                            formType={'add'}
                            setData={setData}
                            onSubmit={createRepair}
                            processing={processing}
                            errors={errors}
                            vehicles={vehicles}
                            maintenancePlans={maintenancePlans}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
