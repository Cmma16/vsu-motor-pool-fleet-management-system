import RequestForm from '@/components/request/request-form';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import { Head, useForm } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';
import { toast } from 'sonner';

const breadcrumbs = [
    {
        title: 'Service Requests',
        href: '/services/requests',
    },
    {
        title: 'Edit',
        href: '/services/requests/edit',
    },
];

const pageDetails = {
    title: 'Edit Request Details',
    description: 'Update the details of the service request.',
};

export default function EditRequest({ vehicles, users, serviceRequest, maintenancePlans }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        vehicle_id: serviceRequest.vehicle_id,
        plan_id: serviceRequest.plan_id,
        requested_by: serviceRequest.requested_by,
        date_filed: serviceRequest.date_filed,
        service_type: serviceRequest.service_type,
        work_description: serviceRequest.work_description,
        received_by: serviceRequest.received_by,
        date_received: serviceRequest.date_received,
        status: serviceRequest.status,
    });

    const editRequest = (e) => {
        e.preventDefault();

        put(route('requests.update', serviceRequest.request_id), {
            // data, // Sends all form data
            // forceFormData: true, // Ensures file uploads and proper formatting
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Service request updated');
                reset(); // Reset all fields after a successful submission
            },
            onError: (errors) => {
                toast.error('Failed to update service request', {
                    description: 'Something went wrong. Please try again.',
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
                        <CardDescription>Update the details of the repair request.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RequestForm
                            formData={data}
                            formType={'edit'}
                            setData={setData}
                            onSubmit={editRequest}
                            processing={processing}
                            errors={errors}
                            vehicles={vehicles}
                            maintenancePlans={maintenancePlans}
                            users={users}
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
