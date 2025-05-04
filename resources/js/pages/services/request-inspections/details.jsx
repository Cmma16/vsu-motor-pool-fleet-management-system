import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Head, Link } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
// import { Button } from 'react-day-picker';

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
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            {console.log(serviceInspection)}
            <Head title="Inspection Details" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Service Request Inspection Information</CardTitle>
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
                                    <span>{serviceInspection.started_at}</span>
                                </div>

                                {/* Completed at */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="completed_at">Completed at</Label>
                                    <span>{serviceInspection.completed_at}</span>
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

                                <Link
                                    href={`${serviceInspection.inspection_id}/edit`}
                                    className="col-span-2 w-1/3 rounded-md bg-[#006600] px-3 py-2 text-center text-white hover:bg-[#005500]"
                                >
                                    Edit Request
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
