import { DataTable } from '@/components/data-table';
import { PartsColumn } from '@/components/parts/parts-column';

import AppLayout from '@/layouts/app-layout';

import { Head, router, usePage } from '@inertiajs/react';

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
    const user = usePage().props.auth.user;
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
                    handleCreate={user.role.name === 'Manager' ? null : route('parts.create')}
                    handleView={veiwPartDetails}
                    handleEdit={editPart}
                    handleDelete={user.role.name === 'Manager' ? null : deletePart}
                    filterColumn={'part_name'}
                    placeholder={'Search part name'}
                />
            </div>
        </AppLayout>
    );
}
