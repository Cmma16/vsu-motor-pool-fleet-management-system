import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { toast } from 'sonner';

import AppLayout from '@/layouts/app-layout';
// import { Button } from 'react-day-picker';

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
    const breadcrumbs = [
        {
            title: 'Service Requests',
            href: user.role.name === 'Driver' ? '/services/requests?status=my-requests' : '/services/requests',
        },
        {
            title: 'Details',
            href: 'services/requests/details',
        },
    ];

    const handleConfirmInspection = () => {
        router.patch(
            `/services/request-inspections/${serviceInspection.inspection_id}/confirm`,
            {},
            {
                onSuccess: () => {
                    // ✅ Do something on success here
                    toast.success('Inspection confirmed successfully!');
                    // or redirect, reload, etc.
                },
                onError: (errors) => {
                    // Optional: handle validation or server errors
                    toast.error('Failed to confirm inspection.');
                },
            },
        );
    };
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

                                {/* Remarks */}
                                {serviceRequest.remarks && (
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="status">Remarks</Label>
                                        <span>{serviceRequest.remarks}</span>
                                    </div>
                                )}

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

                {serviceRequest.serviceInspection && (
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Request Inspection Information</CardTitle>
                            <CardDescription>General overview of the inspection.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Request Description */}
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="request_id">Service Request</Label>
                                        <span>{serviceRequest.serviceInspection.request_description}</span>
                                    </div>

                                    {/* Started at */}
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="started_at">Started at</Label>
                                        <span>{format(serviceRequest.serviceInspection.started_at, 'LLL dd, y hh:mm a')}</span>
                                    </div>

                                    {/* Completed at */}
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="completed_at">Completed at</Label>
                                        <span>{format(serviceRequest.serviceInspection.completed_at, 'LLL dd, y hh:mm a')}</span>
                                    </div>

                                    {/* Parts Available */}
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="parts_available">Parts Available</Label>
                                        {serviceRequest.serviceInspection.parts_available ? <span>Yes</span> : <span>No</span>}
                                    </div>

                                    {/* Personnel Available */}
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="personnel_available">Personnel Available</Label>
                                        {serviceRequest.serviceInspection.personnel_available ? <span>Yes</span> : <span>No</span>}
                                    </div>

                                    {/* Estimated Duration */}
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="estimated_duration">Estimated Duration</Label>
                                        <span>{serviceRequest.serviceInspection.estimated_duration}</span>
                                    </div>

                                    {/* Conducted By */}
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="conducted_by">Conducted By</Label>
                                        <span>{serviceRequest.serviceInspection.conducted_by}</span>
                                    </div>

                                    {/* Confirmed By */}
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="confirmed_by">Confirmed By</Label>
                                        <span>{serviceRequest.serviceInspection.confirmed_by}</span>
                                    </div>

                                    {user.role.name == 'Mechanic' && !serviceRequest.serviceInspection.confirmed_by && (
                                        <Link
                                            href={`${serviceRequest.serviceInspection.inspection_id}/edit`}
                                            className="col-span-2 w-1/3 rounded-md bg-[#006600] px-3 py-2 text-center text-white hover:bg-[#005500]"
                                        >
                                            Edit Inspection
                                        </Link>
                                    )}
                                    {(user.role.name === 'Manager' || user.role.name === 'Admin') &&
                                        !serviceRequest.serviceInspection.confirmed_by && (
                                            <Button
                                                className="col-span-2 w-1/3 rounded-md bg-[#006600] px-3 py-2 text-center text-white hover:bg-[#005500]"
                                                onClick={handleConfirmInspection}
                                            >
                                                Confirm Inspection
                                            </Button>
                                        )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
                {/* {serviceRequest.inspection_id !== 'N/A' && (
                    <Button variant="outline" onClick={() => router.get(route('request-inspections.show', serviceRequest.inspection_id))}>
                        <ArrowLeft /> View Inspection
                    </Button>
                )} */}
            </div>
        </AppLayout>
    );
}
