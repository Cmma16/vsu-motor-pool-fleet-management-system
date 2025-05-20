import { DisplayTable } from '@/components/display-table';
import { RepairPartModal } from '@/components/parts/repair-part-modal';
import { RepairPartsColumn } from '@/components/parts/repair-parts-column';
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

export default function details({ repair, parts, repairParts }) {
    const deleteRepairPart = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(route('repair-part.destroy', { id }));
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Repair Details" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Repair Information</CardTitle>
                        <CardDescription>General overview of the repair.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Vehicle Name */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="vehicle_name">Vehicle Name</Label>
                                    <span>{repair.vehicle_name ?? 'N/A'}</span>
                                </div>
                                {/* Request Descripiton */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="request_description">Request Description</Label>
                                    <span>{repair.request_description ?? 'N/A'}</span>
                                </div>

                                {/* Performed By */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="performed_by">Performed By</Label>
                                    <span>{repair.performed_by ?? 'N/A'}</span>
                                </div>

                                {/* Confirmed By */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="confirmed_by">Confirmed By</Label>
                                    <span>{repair.confirmed_by ?? 'N/A'}</span>
                                </div>

                                {/* Summary */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="description">Summary</Label>
                                    <span>{repair.repair_summary}</span>
                                </div>

                                {/* Odometer Reading */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="status">Odometer Reading</Label>
                                    <span>{repair.odometer_reading}</span>
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
                <Card>
                    <CardHeader>
                        <CardTitle>Parts Used</CardTitle>
                        <CardDescription className="flex justify-between">
                            Parts used during the repair.
                            {!repair.confirmed_by && <RepairPartModal repair_id={repair.repair_id} parts={parts} formType="create" />}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DisplayTable
                            columns={RepairPartsColumn}
                            data={repairParts}
                            parts={parts}
                            handleDelete={deleteRepairPart}
                            showActions={!repair.confirmed_by}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
