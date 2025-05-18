import { DataTable } from '@/components/data-table';
import { RepairsColumn } from '@/components/repairs/repairs-column';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import AppLayout from '@/layouts/app-layout';

import { Head, router } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Repairs',
        href: '/repairs',
    },
];

const pageDetails = {
    title: 'Repairs List',
    description: 'Manage your repairs efficiently here.',
};

export default function RepairsIndex({ repairs }) {
    const deleteRepair = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(route('repairs.destroy', { id }));
        }
    };

    const veiwRepairDetails = (id) => {
        router.get(route('repairs.show', { id }));
    };

    const editRepair = (id) => {
        router.get(route('repairs.edit', { id }));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Repairs" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={RepairsColumn}
                    data={repairs}
                    handleCreate={route('repairs.create')}
                    handleView={veiwRepairDetails}
                    handleEdit={editRepair}
                    handleDelete={deleteRepair}
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
