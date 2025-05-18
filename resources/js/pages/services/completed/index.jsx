import { AccomplishmentsColumn } from '@/components/accomplishment/accomplishment-column';
import { DataTable } from '@/components/data-table';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import AppLayout from '@/layouts/app-layout';

import { Head, router } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Service Request Accomplishments',
        href: '/services/completed',
    },
];

const pageDetails = {
    title: 'Service Request Accomplishments',
    description: 'The final results of the service request process.',
};

export default function AccomplishmentsIndex({ serviceAccomplishments }) {
    const deleteAccomplishment = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(route('completed.destroy', { id }));
        }
    };

    const veiwAccomplishment = (id) => {
        router.get(route('completed.show', { id }));
    };

    const editAccomplishment = (id) => {
        router.get(route('completed.edit', { id }));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Service Accomplishments" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={AccomplishmentsColumn}
                    data={serviceAccomplishments}
                    handleCreate={route('completed.create')}
                    handleView={veiwAccomplishment}
                    handleEdit={editAccomplishment}
                    handleDelete={deleteAccomplishment}
                    filterColumn={'request_description'}
                    placeholder={'Search service request description'}
                />
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
