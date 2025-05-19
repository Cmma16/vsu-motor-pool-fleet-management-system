import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Head, Link } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
// import { Button } from 'react-day-picker';

const breadcrumbs = [
    {
        title: 'Maintenance',
        href: '/maintenance',
    },
    {
        title: 'Details',
        href: 'maintenance/details',
    },
];

const pageDetails = {
    title: 'Maintenance Details',
    description: 'Comprehensive information about the conducted maintenance.',
};

export default function details({ maintenance }) {
    const { user } = usePage().props.auth.user;
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Maintenance Details" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Maintenance Information</CardTitle>
                        <CardDescription>General overview of the maintenance.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Vehicle Name */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="vehicle_name">Vehicle Name</Label>
                                    <span>{maintenance.vehicle_name ?? 'N/A'}</span>
                                </div>
                                {/* Request Descripiton */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="request_description">Request Description</Label>
                                    <span>{maintenance.request_description ?? 'N/A'}</span>
                                </div>

                                {/* Maintenance Plan */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="maintenance_plan">Maintenance Plan</Label>
                                    <span>{maintenance.maintenance_plan ?? 'N/A'}</span>
                                </div>

                                {/* Date Completed */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="date_completed">Date Completed</Label>
                                    <span>{maintenance.date_completed ?? 'N/A'}</span>
                                </div>

                                {/* Performed By */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="performed_by">Performed By</Label>
                                    <span>{maintenance.performed_by ?? 'N/A'}</span>
                                </div>

                                {/* Confirmed By */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="confirmed_by">Confirmed By</Label>
                                    <span>{maintenance.confirmed_by ?? 'N/A'}</span>
                                </div>

                                {/* Summary */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="description">Summary</Label>
                                    <span>{maintenance.maintenance_summary}</span>
                                </div>

                                {/* Odometer Reading */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="status">Odometer Reading</Label>
                                    <span>{maintenance.odometer_reading}</span>
                                </div>

                                {maintenance.date_confirmed && user.role === 'Mechanic' && (
                                    <Link
                                        href={`${maintenance.maintenance_id}/edit`}
                                        className="col-span-2 w-1/3 rounded-md bg-[#006600] px-3 py-2 text-center text-white hover:bg-[#005500]"
                                    >
                                        Edit
                                    </Link>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
