import { DataTable } from '@/components/data-table';
import { InspectionsColumn } from '@/components/inspection/inspection-column';

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
            <Head title="Service Request Inspections" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={InspectionsColumn}
                    data={serviceInspections}
                    // handleCreate={}
                    handleView={veiwInspectionDetails}
                    handleEdit={editInspection}
                    handleDelete={deleteInspection}
                    filterColumn={'request_description'}
                    placeholder={'Search service request description'}
                />
            </div>
        </AppLayout>
    );
}
