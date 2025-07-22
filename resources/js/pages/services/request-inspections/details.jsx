import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Head, Link, router, useForm } from '@inertiajs/react';

import RequestRemarksModal from '@/components/request/request-remarks-modal';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { toast } from 'sonner';

const breadcrumbs = [
    {
        title: 'Service Request Inspections',
        href: '/services/request-inspections',
    },
    {
        title: 'Details',
        href: 'services/request-inspections/details',
    },
];

const pageDetails = {
    title: 'Inspection Details',
    description: 'Comprehensive information about the conducted inspection.',
};

export default function InspectionDetails({ serviceInspection }) {
    const user = usePage().props.auth.user;

    const { data, setData, put, processing, errors, reset } = useForm({
        remarks: '',
    });

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

    const handleStatusUpdate = (id, status) => {
        router.patch(
            route('requests.updateStatus', id),
            {
                status: status,
                remarks: data.remarks,
            },
            {
                onSuccess: () => {
                    if (status === 'rejected') {
                        toast.info(`Service request ${status}`, {
                            description: 'Service request status updated successfully',
                        });
                    } else {
                        toast.success(`Service request ${status}`, {
                            description: 'Service request status updated successfully',
                        });
                    }
                },
                onError: (error) => {
                    toast.error('Service request status update failed', {
                        description: 'Please try again',
                    });
                    console.log(error);
                },
                onFinish: () => {
                    router.reload();
                },
            },
        );
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Inspection Details" />
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
                                    <span>{serviceInspection.serviceRequest.vehicle_name}</span>
                                </div>
                                {/* Request By */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="requested_by">Requested by</Label>
                                    <span>{serviceInspection.serviceRequest.requested_by}</span>
                                </div>
                                {/* Date Filed */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="date_filed">Date Filed</Label>
                                    <span>{format(serviceInspection.serviceRequest.date_filed, 'LLL dd, y HH:mm')}</span>
                                </div>
                                {/* Service Type */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="service_type">Service Type</Label>
                                    <span>{serviceInspection.serviceRequest.service_type}</span>
                                </div>
                                {/* Work Description */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="work_description">Work Description</Label>
                                    <span>{serviceInspection.serviceRequest.work_description}</span>
                                </div>
                                {/* Received By */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="received_by">Received By</Label>
                                    <span>{serviceInspection.serviceRequest.received_by}</span>
                                </div>
                                {/* Date Received */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="date_received">Date Received</Label>
                                    <span>
                                        {serviceInspection.serviceRequest.date_received
                                            ? format(serviceInspection.serviceRequest.date_received, 'LLL dd, y HH:mm')
                                            : 'N/A'}
                                    </span>
                                </div>
                                {/* Status */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <span>{serviceInspection.serviceRequest.status}</span>
                                </div>

                                {serviceInspection.serviceRequest.status === 'inspected' &&
                                    serviceInspection.confirmed_by &&
                                    (user.role.name === 'Manager' || user.role.name === 'Admin') && (
                                        <div className="col-span-2 flex gap-2">
                                            <Button onClick={() => handleStatusUpdate(serviceInspection.serviceRequest.request_id, 'approved')}>
                                                Approve Request
                                            </Button>

                                            <RequestRemarksModal
                                                title={'Service Request'}
                                                buttonLabel={'Reject Request'}
                                                action={() => handleStatusUpdate(serviceInspection.serviceRequest.request_id, 'rejected')}
                                                data={data}
                                                setData={setData}
                                                actionType={'rejected'}
                                            />
                                        </div>
                                    )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
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
                                    <span>{serviceInspection.request_description}</span>
                                </div>

                                {/* Started at */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="started_at">Started at</Label>
                                    <span>{format(serviceInspection.started_at, 'LLL dd, y hh:mm a')}</span>
                                </div>

                                {/* Completed at */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="completed_at">Completed at</Label>
                                    <span>{format(serviceInspection.completed_at, 'LLL dd, y hh:mm a')}</span>
                                </div>

                                {/* Parts Available */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="parts_available">Parts Available</Label>
                                    {serviceInspection.parts_available ? <span>Yes</span> : <span>No</span>}
                                </div>

                                {/* Personnel Available */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="personnel_available">Personnel Available</Label>
                                    {serviceInspection.personnel_available ? <span>Yes</span> : <span>No</span>}
                                </div>

                                {/* Estimated Duration */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="estimated_duration">Estimated Duration</Label>
                                    <span>{serviceInspection.estimated_duration}</span>
                                </div>

                                {/* Conducted By */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="conducted_by">Conducted By</Label>
                                    <span>{serviceInspection.conducted_by}</span>
                                </div>

                                {/* Confirmed By */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="confirmed_by">Confirmed By</Label>
                                    <span>{serviceInspection.confirmed_by}</span>
                                </div>

                                {user.role.name == 'Mechanic' && !serviceInspection.confirmed_by && (
                                    <Link
                                        href={`${serviceInspection.inspection_id}/edit`}
                                        className="col-span-2 w-1/3 rounded-md bg-[#006600] px-3 py-2 text-center text-white hover:bg-[#005500]"
                                    >
                                        Edit Inspection
                                    </Link>
                                )}
                                {(user.role.name === 'Manager' || user.role.name === 'Admin') && !serviceInspection.confirmed_by && (
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
            </div>
        </AppLayout>
    );
}
