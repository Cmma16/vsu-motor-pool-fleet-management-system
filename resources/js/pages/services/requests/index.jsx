import { DataTable } from '@/components/data-table';
import { RequestsColumn } from '@/components/request/request-column';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';

import AppLayout from '@/layouts/app-layout';

import { Head, router } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Service Requests',
        href: '/services/requests',
    },
];

const pageDetails = {
    title: 'Service Requests',
    description: 'Manage your service requests',
};

export default function RequestsIndex({ serviceRequests }) {
    const user = usePage().props.auth.user;

    const deleteRequest = (id) => {
        router.delete(route('requests.destroy', { id }), {
            onSuccess: () => {
                toast.success('Service request deleted');
            },
            onError: () => {
                toast.error('Service request deletion failed');
            },
        });
    };

    const veiwRequestDetails = (id) => {
        router.get(route('requests.show', { id }));
    };

    const editRequest = (id) => {
        router.get(route('requests.edit', { id }));
    };

    const handleStatusUpdate = (id, status) => {
        router.patch(
            route('requests.updateStatus', id),
            {
                status: status,
            },
            {
                onSuccess: () => {
                    toast.success(`Service request ${status}`, {
                        description: 'Service request status updated successfully',
                    });
                },
                onError: () => {
                    toast.error('Service request status update failed', {
                        description: 'Please try again',
                    });
                },
                onFinish: () => {
                    router.reload();
                },
            },
        );
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Repairs" />
            {console.log(serviceRequests)}
            {/*delete this*/}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={RequestsColumn}
                    data={serviceRequests}
                    handleCreate={user.role.name === 'Driver' ? route('requests.create') : null}
                    handleView={veiwRequestDetails}
                    handleEdit={editRequest}
                    handleDelete={deleteRequest}
                    handleStatusUpdate={handleStatusUpdate}
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
