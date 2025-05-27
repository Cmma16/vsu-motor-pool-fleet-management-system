import { DataTable } from '@/components/data-table';
import { MaintenanceColumn } from '@/components/maintenance/maintenance-column';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import AppLayout from '@/layouts/app-layout';

import { Head, router } from '@inertiajs/react';
import { InfoIcon, Wrench } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs = [
    {
        title: 'Maintenance',
        href: '/maintenance',
    },
];

const pageDetails = {
    title: 'Maintenance Records',
    description: 'View and manage maintenance records here.',
};

export default function MaintenanceIndex({ maintenanceRecords }) {
    const deleteMaintenance = (id) => {
        router.delete(route('maintenance.destroy', { id }), {
            onSuccess: () => {
                toast.success('Maintenance record deleted successfully');
            },
            onError: () => {
                toast.error('Failed to delete maintenance record');
            },
        });
    };

    const veiwMaintenanceDetails = (id) => {
        router.get(route('maintenance.show', { id }));
    };

    const editMaintenance = (id) => {
        router.get(route('maintenance.edit', { id }));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Maintenance" />
            <div className="mx-4">
                <h2 className="mb-2 text-lg font-semibold">Important Information</h2>
                <div className="mb-2 flex items-start gap-2 rounded-md bg-blue-50 p-4 text-blue-800">
                    <Wrench className="mt-0.5 h-5 w-5 text-blue-400" />
                    <span>
                        Mechanics can only edit maintenance records they created themselves. Confirmed maintenance records can no longer be edited or
                        deleted.
                    </span>
                </div>
                <div className="flex items-start gap-2 rounded-md bg-green-50 p-4 text-green-800">
                    <InfoIcon className="mt-0.5 h-5 w-5 text-green-400" />
                    <span>Only the Managers and Admin can confirm/verify maintenance records.</span>
                </div>
            </div>
            {/*delete this*/}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={MaintenanceColumn}
                    data={maintenanceRecords}
                    handleView={veiwMaintenanceDetails}
                    handleEdit={editMaintenance}
                    handleDelete={deleteMaintenance}
                    filterColumn={'vehicle_name'}
                    placeholder={'Search vehicle name'}
                />
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
