import { DataTable } from '@/components/data-table';
import { RequestsColumn } from '@/components/request/request-column';
import { ServiceCard } from '@/components/request/service-card';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';

import AppLayout from '@/layouts/app-layout';

import { Head, router } from '@inertiajs/react';
import { InfoIcon, Wrench } from 'lucide-react';
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
    const isMobile = useIsMobile();

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
            {/* Important Information Section */}
            <div className="mx-4">
                <h2 className="mb-2 text-lg font-semibold">Important Information</h2>
                <div className="mb-2 flex items-start gap-2 rounded-md bg-blue-50 p-4 text-blue-800">
                    <Wrench className="mt-0.5 h-5 w-5 text-blue-400" />
                    <span>
                        Repair/maintenance process: A request must be received by the Manager before it can be inspected by the Mechanic. Once
                        approved, the Mechanic can start conducting the repair/maintenance.
                    </span>
                </div>
                <div className="flex items-start gap-2 rounded-md bg-green-50 p-4 text-green-800">
                    <InfoIcon className="mt-0.5 h-5 w-5 text-green-400" />
                    <span>Requestors can only edit their own pending requests. Only the Managers and Admin can approve requests.</span>
                </div>
            </div>
            <div className="flex h-full w-full max-w-full flex-1 flex-col gap-2 rounded-xl p-2 sm:gap-4 sm:p-4">
                <div className="w-full max-w-full overflow-x-auto rounded-lg">
                    {isMobile ? (
                        <div className="flex flex-col gap-2">
                            {serviceRequests.map((request) => (
                                <ServiceCard request={request} onEdit={editRequest} onDelete={deleteRequest} onStatusUpdate={handleStatusUpdate} />
                            ))}
                        </div>
                    ) : (
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
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
