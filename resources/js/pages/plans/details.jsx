import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Head, Link } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
// import { Button } from 'react-day-picker';

const breadcrumbs = [
    {
        title: 'Maintenance Plans',
        href: '/plans',
    },
    {
        title: 'Details',
        href: 'plans/details',
    },
];

const pageDetails = {
    title: 'Maintenance Plan Details',
    description: 'View the details of a maintenance plan.',
};

export default function details({ maintenancePlan }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Maintenace Plan Details" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Plan Information</CardTitle>
                        <CardDescription>General overview of the plan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Vehicle Name */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="vehicle_name">Vehicle Name</Label>
                                    <span>{maintenancePlan.vehicle_name ?? 'N/A'}</span>
                                </div>

                                {/* Scheduled date */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="scheduled_date">Scheduled Date</Label>
                                    <span>{maintenancePlan.scheduled_date ?? 'N/A'}</span>
                                </div>

                                {/* Next Service KM */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="next_service_km">Next Service (km)</Label>
                                    <span>{maintenancePlan?.next_service_km ? `${maintenancePlan.next_service_km} km` : 'N/A'}</span>
                                </div>

                                {/* Description */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <span>{maintenancePlan.description}</span>
                                </div>

                                {/* Created By */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="created_by">Created By</Label>
                                    <span>{maintenancePlan.created_by ?? 'N/A'}</span>
                                </div>

                                {/* Status */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <span>{maintenancePlan.status}</span>
                                </div>

                                <Link
                                    href={`${maintenancePlan.plan_id}/edit`}
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
