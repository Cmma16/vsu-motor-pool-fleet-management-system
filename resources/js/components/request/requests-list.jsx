import { DataCard } from '@/components/display/data-card';
import RequestActions from '@/components/request/request-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { useState } from 'react';

const ITEMS_PER_PAGE = 5;
function getStatusBadge(status) {
    switch (status) {
        case 'pending':
            return (
                <Badge variant="outline" className="bg-gray-100">
                    Pending
                </Badge>
            );
        case 'received':
            return (
                <Badge variant="default" className="bg-blue-500">
                    Received
                </Badge>
            );
        case 'inspected':
            return (
                <Badge variant="default" className="bg-yellow-500">
                    Inspected
                </Badge>
            );
        case 'approved':
            return (
                <Badge variant="default" className="bg-green-500">
                    Approved
                </Badge>
            );
        case 'cancelled':
            return (
                <Badge variant="default" className="bg-red-500">
                    Cancelled
                </Badge>
            );
        case 'conducted':
            return (
                <Badge variant="default" className="bg-purple-500">
                    Conducted
                </Badge>
            );
        case 'completed':
            return (
                <Badge variant="default" className="bg-green-600">
                    Completed
                </Badge>
            );
        default:
            return (
                <Badge variant="outline" className="bg-gray-200">
                    {status}
                </Badge>
            );
    }
}

export function RequestsList({ serviceRequests, onEdit, onDelete, onStatusUpdate }) {
    const user = usePage().props.auth.user;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(serviceRequests.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = serviceRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <>
            {currentItems.map((request) => (
                <DataCard
                    key={request.request_id}
                    title={request.vehicle_name}
                    subtitle={`Requested by ${request.requested_by}`}
                    data={[
                        { label: 'Date filed', value: format(request.date_filed, 'LLL dd, yyyy') },
                        { label: 'Service Type:', value: request.service_type },
                        { label: 'Description', value: request.work_description },
                        { label: 'Status', value: getStatusBadge(request.status) },
                    ]}
                    actions={<RequestActions request={request} handleEdit={onEdit} handleDelete={onDelete} handleStatusUpdate={onStatusUpdate} />}
                />
            ))}
            {/* Pagination controls */}
            <div className="mt-4 flex justify-center gap-2">
                <Button
                    className="rounded border px-3 py-1 disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                >
                    Prev
                </Button>

                <span className="px-2">
                    {currentPage} / {totalPages}
                </span>

                <Button
                    className="rounded border px-3 py-1 disabled:opacity-50"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    Next
                </Button>
            </div>
        </>
    );
}
