import { DataTable } from '@/components/data-table';
import { PartsColumn } from '@/components/parts/parts-column';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import AppLayout from '@/layouts/app-layout';

import { Head } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Parts',
        href: '/parts',
    },
];

const parts = [];

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
            <Head title="Parts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable columns={PartsColumn} data={parts} handleView={veiwVehicleDetails} handleEdit={editVehicle} handleDelete={deleteVehicle} />
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
