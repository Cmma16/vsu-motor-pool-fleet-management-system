import { DataTable } from '@/components/data-table';
import { MaintenanceColumn } from '@/components/maintenance/maintenance-column';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import AppLayout from '@/layouts/app-layout';

import { Head } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Maintenance',
        href: '/maintenance',
    },
];

const maintenance = [
    {
        maintenance_id: 1,
        vehicle_name: 'Toyota Hi-ace',
        next_due_date: '2025-05-15',
        next_due_km: 50000,
        assigned_personnel: 'Carlos Miguel',
        status: 'scheduled',
    },
    {
        maintenance_id: 2,
        vehicle_name: 'Toyota Hi-ace',
        next_due_date: '2025-06-10',
        next_due_km: 75000,
        assigned_personnel: 'Carlos Miguel',
        status: 'in-progress',
    },
    {
        maintenance_id: 3,
        vehicle_name: 'Toyota Hi-ace',
        next_due_date: '2025-04-20',
        next_due_km: 60000,
        assigned_personnel: 'Carlos Miguel',
        status: 'completed',
    },
    {
        maintenance_id: 4,
        vehicle_name: 'Toyota Hi-ace',
        next_due_date: '2025-07-01',
        next_due_km: 55000,
        assigned_personnel: 'Carlos Miguel',
        status: 'scheduled',
    },
    {
        maintenance_id: 5,
        vehicle_name: 'Toyota Hi-ace',
        next_due_date: '2025-08-12',
        next_due_km: 80000,
        assigned_personnel: 'Carlos Miguel',
        status: 'pending',
    },
];

export default function RepairsIndex() {
    const deleteVehicle = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(route('vehicles.destroy', { id }));
        }
    };

    const veiwVehicleDetails = (id) => {
        router.get(route('vehicles.show', { id }));
    };

    const editVehicle = (id) => {
        router.get(route('vehicles.edit', { id }));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Maintenance" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={MaintenanceColumn}
                    data={maintenance}
                    handleView={veiwVehicleDetails}
                    handleEdit={editVehicle}
                    handleDelete={deleteVehicle}
                />
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
