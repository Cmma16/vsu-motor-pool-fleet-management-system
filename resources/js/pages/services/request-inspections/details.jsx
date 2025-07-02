import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Head, Link, router } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';

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
    const handleConfirmInspection = () => {
        router.patch(`/services/request-inspections/${serviceInspection.inspection_id}/confirm`);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Inspection Details" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg">
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
                                {user.role.name == 'Manager' && !serviceInspection.confirmed_by && (
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
                <Button
                    variant="outline"
                    className="self-end bg-white"
                    onClick={() => router.get(route('requests.show', serviceInspection.request_id))}
                >
                    <ArrowRight /> Go to Service Request
                </Button>
            </div>
        </AppLayout>
    );
}
