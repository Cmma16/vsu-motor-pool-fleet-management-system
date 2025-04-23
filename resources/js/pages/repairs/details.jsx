import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Head, Link } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
// import { Button } from 'react-day-picker';

const breadcrumbs = [
    {
        title: 'Repairs',
        href: '/repairs',
    },
    {
        title: 'Details',
        href: 'repairs/details',
    },
];

const pageDetails = {
    title: 'Repair Details',
    description: 'Comprehensive information about the scheduled repair, including specifications and status.',
};

export default function details({ repair }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Repair Details" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Repair Details</CardTitle>
                        <CardDescription>Comprehensive information about the repair, including specifications and status.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Vehicle Name */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="vehicle_name">Vehicle Name</Label>
                                    <span>{repair.vehicle_name ?? 'N/A'}</span>
                                </div>

                                {/* Description */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <span>{repair.description}</span>
                                </div>

                                {/* Scheduled Date */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="scheduled_date">Scheduled Date</Label>
                                    <span>{repair.scheduled_date}</span>
                                </div>

                                {/* Required By */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="required_by">Required By</Label>
                                    <span>{repair.required_by}</span>
                                </div>

                                {/* Urgency Level */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="urgency_level">Urgency Level</Label>
                                    <span>{repair.urgency_level}</span>
                                </div>

                                {/* Assigned Personnel */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="assigned_personnel">Assigned Personnel</Label>
                                    <span>{repair.assigned_personnel_name ?? 'N/A'}</span>
                                </div>

                                {/* Status */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <span>{repair.status}</span>
                                </div>

                                {/* Requested By */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="requested_by">Requested By</Label>
                                    <span>{repair.requested_by_name ?? 'N/A'}</span>
                                </div>
                                <Link
                                    href={`${repair.repair_id}/edit`}
                                    className="col-span-2 w-1/3 rounded-md bg-[#006600] px-3 py-2 text-center text-white hover:bg-[#005500]"
                                >
                                    Edit
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
