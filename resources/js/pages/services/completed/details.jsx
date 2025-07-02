import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Head, Link } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
// import { Button } from 'react-day-picker';

const breadcrumbs = [
    {
        title: 'Service Request Accomplishments',
        href: '/services/completed',
    },
    {
        title: 'Details',
        href: 'services/completed/details',
    },
];

const pageDetails = {
    title: 'Accomplishment Details',
    description: 'Comprehensive information about the accomplished service.',
};

export default function InspectionDetails({ serviceAccomplishment }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Inspection Details" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Service Request Accomplishment Information</CardTitle>
                        <CardDescription>General overview of the accomplishment.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Request Description */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="request_id">Service Request</Label>
                                    <span>{serviceAccomplishment.request_description}</span>
                                </div>

                                {/* Started at */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="started_at">Started at</Label>
                                    <span>{serviceAccomplishment.started_at}</span>
                                </div>

                                {/* Completed at */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="completed_at">Completed at</Label>
                                    <span>{serviceAccomplishment.completed_at}</span>
                                </div>

                                {/* Conducted By */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="conducted_by">Conducted By</Label>
                                    <span>{serviceAccomplishment.conducted_by}</span>
                                </div>

                                {/* Confirmed By */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="verified_by">Verified By</Label>
                                    <span>{serviceAccomplishment.verified_by}</span>
                                </div>

                                <Link
                                    href={`${serviceAccomplishment.accomplishment_id}/edit`}
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
