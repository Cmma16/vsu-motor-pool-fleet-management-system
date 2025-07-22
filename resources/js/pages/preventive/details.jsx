import { DisplayTable } from '@/components/display-table';
import { MaintenancePartColumn } from '@/components/parts/maintenance-part-column';
import { MaintenancePartModal } from '@/components/parts/maintenance-part-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { toast } from 'sonner';

import AppLayout from '@/layouts/app-layout';
// import { Button } from 'react-day-picker';

const breadcrumbs = [
    {
        title: 'Preventive Maintenance',
        href: '/preventive',
    },
    {
        title: 'Details',
        href: 'preventive/details',
    },
];

const pageDetails = {
    title: 'Preventive Maintenance Details',
    description: 'Comprehensive information about the conducted preventive maintenance including the parts used.',
};

export default function details({ preventive, parts, preventiveParts }) {
    const user = usePage().props.auth.user;

    const confirmPreventive = () => {
        router.patch(
            route(
                'preventive.confirm',
                { maintenance_id: preventive.preventive_id },
                {
                    onSuccess: () => {
                        toast.success('Preventive maintenance confirmed successfully', {
                            description: 'The preventive maintenance has been confirmed successfully',
                        });
                    },
                    onError: () => {
                        toast.error('Preventive maintenance confirmation failed', {
                            description: 'The preventive was not confirmed',
                        });
                    },
                    onFinish: () => {
                        router.reload();
                    },
                },
            ),
        );
    };

    const deletePreventivePart = (id) => {
        router.delete(route('maintenance-parts.destroy', { id }), {
            onSuccess: () => {
                toast.success('Deleted successfully', {
                    description: 'The part usage record has been deleted successfully',
                });
            },
            onError: () => {
                toast.error('Delete failed', {
                    description: 'The part usage record was not deleted',
                });
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Preventive Maintenance Details" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Preventive Maintenance Information</CardTitle>
                        <CardDescription className="flex justify-between">
                            General overview of the preventive maintenance.
                            {(user.role.name === 'Manager' || user.role.name === 'Admin') && !preventive.confirmed_by && (
                                <Button onClick={confirmPreventive}>Confirm Record</Button>
                            )}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Vehicle Name */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="vehicle_name">Vehicle Name</Label>
                                    <span>{preventive.vehicle_name ?? 'N/A'}</span>
                                </div>
                                {/* Request Descripiton */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="request_description">Request Description</Label>
                                    <span>{preventive.request_description ?? 'N/A'}</span>
                                </div>

                                {/* Performed By */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="performed_by">Performed By</Label>
                                    <span>{preventive.performed_by ?? 'N/A'}</span>
                                </div>

                                {/* Confirmed By */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="confirmed_by">Confirmed By</Label>
                                    <span>{preventive.confirmed_by ?? 'N/A'}</span>
                                </div>

                                {/* Summary */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="description">Summary</Label>
                                    <span>{preventive.preventive_summary}</span>
                                </div>

                                {/* Odometer Reading */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="status">Odometer Reading</Label>
                                    <span>{preventive.odometer_reading}</span>
                                </div>

                                {user.role.name === 'Mechanic' && !preventive.confirmed_by && (
                                    <Link
                                        href={`${preventive.preventive_id}/edit`}
                                        className="col-span-2 w-1/3 rounded-md bg-[#006600] px-3 py-2 text-center text-white hover:bg-[#005500]"
                                    >
                                        Edit
                                    </Link>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Parts Used</CardTitle>
                        <CardDescription className="flex justify-between">
                            Parts used during the preventive maintenance.
                            {user.role.name === 'Mechanic' && !preventive.confirmed_by && (
                                <MaintenancePartModal maintenance_id={preventive.preventive_id} parts={parts} formType="create" />
                            )}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DisplayTable
                            columns={MaintenancePartColumn}
                            data={preventiveParts}
                            parts={parts}
                            handleDelete={deletePreventivePart}
                            showActions={!preventive.confirmed_by}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
