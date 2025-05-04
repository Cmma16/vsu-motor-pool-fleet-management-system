import { DataTable } from '@/components/data-table';
import { PartsColumn } from '@/components/parts/parts-column';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import AppLayout from '@/layouts/app-layout';

import { Head, router } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Parts',
        href: '/parts',
    },
];

const pageDetails = {
    title: 'Parts List',
    description: 'View and manage parts here.',
};

export default function PartsIndex({ parts }) {
    const deletePart = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(route('parts.destroy', { id }));
        }
    };

    const veiwPartDetails = (id) => {
        router.get(route('parts.show', { id }));
    };

    const editPart = (id) => {
        router.get(route('parts.edit', { id }));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Parts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={PartsColumn}
                    data={parts}
                    handleCreate={route('parts.create')}
                    handleView={veiwPartDetails}
                    handleEdit={editPart}
                    handleDelete={deletePart}
                />
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
