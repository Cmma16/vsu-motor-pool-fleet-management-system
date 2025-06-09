import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

import AppLayout from '@/layouts/app-layout';
// import { Button } from 'react-day-picker';

const breadcrumbs = [
    {
        title: 'Service Requests',
        href: '/services/requests',
    },
    {
        title: 'Details',
        href: 'services/requests/details',
    },
];

const pageDetails = {
    title: 'Request Details',
    description: 'Comprehensive information about the service being requested.',
};

const handleStatusUpdate = (id, status) => {
    router.patch(
        route('requests.updateStatus', id),
        {
            status: status,
        },
        {
            onSuccess: () => {
                toast.success(`Service request ${status}`, {
                    description: 'Service request status updated successfully',
                });
            },
            onError: (error) => {
                toast.error('Service request status update failed', {
                    description: 'Please try again',
                });
            },
            onFinish: () => {
                router.reload();
            },
        },
    );
};

export default function RequestDetails({ serviceRequest }) {
    const user = usePage().props.auth.user;
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Repair Details" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Service Request Information</CardTitle>
                        <CardDescription>General overview of the request.</CardDescription>
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
                                    <span>{serviceRequest.date_received ? format(serviceRequest.date_received, 'LLL dd, y HH:mm') : 'N/A'}</span>
                                </div>
                                {/* Status */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <span>{serviceRequest.status}</span>
                                </div>

                                {serviceRequest.status === 'inspected' && user.role.name === 'Manager' && (
                                    <div className="col-span-2 flex gap-2">
                                        <Button onClick={() => handleStatusUpdate(serviceRequest.request_id, 'approved')}>Approve Request</Button>
                                        <Button variant="destructive" onClick={() => handleStatusUpdate(serviceRequest.request_id, 'rejected')}>
                                            Reject Request
                                        </Button>
                                    </div>
                                )}

                                {serviceRequest.status === 'pending' && user.role.name === 'Driver' && (
                                    <Link
                                        href={`${serviceRequest.request_id}/edit`}
                                        className="col-span-2 w-1/3 rounded-md bg-[#006600] px-3 py-2 text-center text-white hover:bg-[#005500]"
                                    >
                                        Edit Request
                                    </Link>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {serviceRequest.inspection_id !== 'N/A' && (
                    <Button variant="outline" onClick={() => router.get(route('request-inspections.show', serviceRequest.inspection_id))}>
                        <ArrowLeft /> View Inspection
                    </Button>
                )}
            </div>
        </AppLayout>
    );
}
