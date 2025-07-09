import { DataTable } from '@/components/data-table';
import { MaintenanceColumn } from '@/components/maintenance/maintenance-column';

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

const categoryFilters = {
    categoryTitle: 'confirmation status',
    filteredColumn: 'confirmed_by',
    filterOptions: [
        { key: 0, value: 'confirmed', label: 'Confirmed' },
        { key: 1, value: 'unconfirmed', label: 'Unconfirmed' },
    ],
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
            <div className="flex h-auto flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={MaintenanceColumn}
                    data={maintenanceRecords}
                    handleView={veiwMaintenanceDetails}
                    handleEdit={editMaintenance}
                    handleDelete={deleteMaintenance}
                    filterColumn={'vehicle_name'}
                    placeholder={'Search vehicle name'}
                    categoryFilters={categoryFilters}
                />
            </div>
        </AppLayout>
    );
}
