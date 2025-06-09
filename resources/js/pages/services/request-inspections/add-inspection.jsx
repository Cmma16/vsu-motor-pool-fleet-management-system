import InspectionForm from '@/components/inspection/inspection-form';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { toast } from 'sonner';

import { Head, useForm } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { format } from 'date-fns';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    { title: 'Service Requests Inspection', href: '/services/request-inspections' },
    { title: 'New service request inspection', href: 'services/request-inspections/create' },
];

const pageDetails = {
    title: 'Create Service Request Inspection',
    description: 'Record the details of a vehicle repair.',
};

export default function CreateInspection({ serviceRequest, users, requestId }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        request_id: requestId,
        started_at: '',
        completed_at: '',
        parts_available: '',
        personnel_available: '',
        estimated_duration: '',
        conducted_by: '',
        confirmed_by: '',
    });

    const createInspection = (e) => {
        e.preventDefault();
        post(route('request-inspections.store'), {
            data,
            onSuccess: () => {
                reset();
                toast.success('Request inspected', {
                    description: 'Request inspection record created successfully',
                });
            },
            onError: (errors) => {
                toast.error(errors.message, {
                    description: 'Please try again',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            {console.log(requestId)}
            <Head title="Repairs" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Service Request Information</CardTitle>
                        <CardDescription>General overview of the request.</CardDescription>
                        {console.log(serviceRequest)}
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Vehicle Name */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="vehicle_name">Vehicle Name</Label>
                                    <span>{serviceRequest.vehicle_name}</span>
                                </div>
                                {/* Request By */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="requested_by">Requested by</Label>
                                    <span>{serviceRequest.requested_by}</span>
                                </div>
                                {/* Date Filed */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="date_filed">Date Filed</Label>
                                    <span>{format(serviceRequest.date_filed, 'LLL dd, y HH:mm')}</span>
                                </div>
                                {/* Service Type */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="service_type">Service Type</Label>
                                    <span>{serviceRequest.service_type}</span>
                                </div>
                                {/* Work Description */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="work_description">Work Description</Label>
                                    <span>{serviceRequest.work_description}</span>
                                </div>
                                {/* Received By */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="received_by">Received By</Label>
                                    <span>{serviceRequest.received_by}</span>
                                </div>
                                {/* Date Received */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="date_received">Date Received</Label>
                                    <span>{format(serviceRequest.date_received, 'LLL dd, y HH:mm')}</span>
                                </div>
                                {/* Status */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <span>{serviceRequest.status}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Inspection Information</CardTitle>
                        <CardDescription>Enter the details of the inspection.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <InspectionForm
                            formData={data}
                            formType={'add'}
                            setData={setData}
                            onSubmit={createInspection}
                            processing={processing}
                            errors={errors}
                            users={users}
                            lockInputs={requestId ? true : false}
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
