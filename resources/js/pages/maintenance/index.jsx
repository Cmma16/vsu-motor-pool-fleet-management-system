import { DataTable } from '@/components/data-table';
import { MaintenanceColumn } from '@/components/maintenance/maintenance-column';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import AppLayout from '@/layouts/app-layout';

import { Head, router } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Maintenance',
        href: '/maintenance',
    },
];

const pageDetails = {
    title: 'Maintenance List',
    description: 'View and manage maintenance records here.',
};

export default function MaintenanceIndex({ maintenanceRecords }) {
    const deleteMaintenance = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(route('maintenance.destroy', { id }));
        }
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
            {console.log(maintenanceRecords)}
            {/*delete this*/}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={MaintenanceColumn}
                    data={maintenanceRecords}
                    handleCreate={route('maintenance.create')}
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
