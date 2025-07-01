import { DataTable } from '@/components/data-table';
import { PreventiveColumn } from '@/components/preventive/preventive-column';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { InfoIcon, Wrench } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs = [
    {
        title: 'Preventive Maintenance',
        href: '/preventive',
    },
];

const pageDetails = {
    title: 'Preventive Maintenance Records',
    description: 'Manage your records efficiently here.',
};

export default function PreventiveIndex({ preventive }) {
    const deletePreventive = (id) => {
        router.delete(route('preventive.destroy', { id }), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Record deleted successfully');
            },
            onError: () => {
                toast.error('Failed to delete record');
            },
        });
    };

    const veiwPreventiveDetails = (id) => {
        router.get(route('preventive.show', { id }));
    };

    const editPreventive = (id) => {
        router.get(route('preventive.edit', { id }));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Prevenitive Maintenance" />
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
                    columns={PreventiveColumn}
                    data={preventive}
                    handleView={veiwPreventiveDetails}
                    handleEdit={editPreventive}
                    handleDelete={deletePreventive}
                    filterColumn={'vehicle_name'}
                    placeholder={'Search vehicle name'}
                />
            </div>
        </AppLayout>
    );
}
