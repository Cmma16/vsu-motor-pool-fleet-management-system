import { DataTable } from '@/components/data-table';
import { InspectionsColumn } from '@/components/inspection/inspection-column';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import AppLayout from '@/layouts/app-layout';

import { Head, router } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Service Request Inspections',
        href: '/services/request-inspections',
    },
];

const pageDetails = {
    title: 'Service Request Inspections',
    description: 'Inspections done to confirm issue validity and determine the service requirements.',
};

export default function InspectionsIndex({ serviceInspections }) {
    const deleteInspection = (id) => {
        if (confirm('Are you sure?')) {
            router.delete(route('request-inspections.destroy', { id }));
        }
    };

    const veiwInspectionDetails = (id) => {
        router.get(route('request-inspections.show', { id }));
    };

    const editInspection = (id) => {
        router.get(route('request-inspections.edit', { id }));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            {console.log(serviceInspections)}
            <Head title="Service Request Inspections" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={InspectionsColumn}
                    data={serviceInspections}
                    handleCreate={route('request-inspections.create')}
                    handleView={veiwInspectionDetails}
                    handleEdit={editInspection}
                    handleDelete={deleteInspection}
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
