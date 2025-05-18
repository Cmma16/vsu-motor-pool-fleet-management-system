import { columns } from '@/components/columns';
import { DataTable } from '@/components/data-table';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import AppLayout from '@/layouts/app-layout';

import { Head, router } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Vehicles',
        href: '/vehicles',
    },
];

const pageDetails = {
    title: 'Vehicles List',
    description: 'Manage your vehicles efficiently here.',
};

export default function List({ vehicles }) {
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
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Vehicles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={columns}
                    data={vehicles}
                    handleCreate={route('vehicles.create')}
                    handleView={veiwVehicleDetails}
                    handleEdit={editVehicle}
                    handleDelete={deleteVehicle}
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
