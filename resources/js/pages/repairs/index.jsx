import { DataTable } from '@/components/data-table';
import { RepairsColumn } from '@/components/repairs/repairs-column';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { InfoIcon, Wrench } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs = [
    {
        title: 'Repairs',
        href: '/repairs',
    },
];

const pageDetails = {
    title: 'Repairs Records',
    description: 'Manage your repairs efficiently here.',
};

const categoryFilters = {
    categoryTitle: 'confirmation status',
    filteredColumn: 'confirmed_by',
    filterOptions: [
        { key: 0, value: 'confirmed', label: 'Confirmed' },
        { key: 1, value: 'unconfirmed', label: 'Unconfirmed' },
    ],
};

export default function RepairsIndex({ repairs }) {
    const deleteRepair = (id) => {
        router.delete(route('repairs.destroy', { id }), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Repair deleted successfully');
            },
            onError: () => {
                toast.error('Failed to delete repair');
            },
        });
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
            <div className="mx-4">
                <h2 className="mb-2 text-lg font-semibold">Important Information</h2>
                <div className="mb-2 flex items-start gap-2 rounded-md bg-blue-50 p-4 text-blue-800">
                    <Wrench className="mt-0.5 h-5 w-5 text-blue-400" />
                    <span>
                        Mechanics can only edit repair records they created themselves. Confirmed repair records can no longer be edited or deleted.
                    </span>
                </div>
                <div className="flex items-start gap-2 rounded-md bg-green-50 p-4 text-green-800">
                    <InfoIcon className="mt-0.5 h-5 w-5 text-green-400" />
                    <span>Only the Managers and Admin can confirm/verify repair records.</span>
                </div>
            </div>
            <div className="flex h-auto flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={RepairsColumn}
                    data={repairs}
                    handleView={veiwRepairDetails}
                    handleEdit={editRepair}
                    handleDelete={deleteRepair}
                    filterColumn={'vehicle_name'}
                    placeholder={'Search vehicle name'}
                    categoryFilters={categoryFilters}
                />
            </div>
        </AppLayout>
    );
}
