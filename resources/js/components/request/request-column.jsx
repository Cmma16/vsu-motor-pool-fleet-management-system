import { router, usePage } from '@inertiajs/react';
import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown, CircleArrowOutUpRight, FileWarning, Pencil, Printer, ScanSearch, Trash, Wrench } from 'lucide-react';

import DestructiveDialog from '@/components/display/destructive-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { format } from 'date-fns';

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

function serviceTypeBadge(serviceType) {
    switch (serviceType) {
        case 'repair':
            return (
                <Badge variant="outline" className="bg-green-500">
                    Repair
                </Badge>
            );
        case 'maintenance':
            return (
                <Badge variant="outline" className="bg-yellow-500">
                    Maintenance
                </Badge>
            );
        case 'preventive':
            return (
                <Badge variant="outline" className="bg-blue-400">
                    Preventive
                </Badge>
            );
    }
}
const columnHelper = createColumnHelper();

export const RequestsColumn = (handleView, handleEdit, handleDelete, handleStatusUpdate) => [
    {
        id: 'select',
        enableSorting: false,
        enableHiding: false,
    },
    columnHelper.accessor('vehicle_name', {
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Vehicle
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => {
            const value = info.getValue() || '';
            const maxLength = 15;
            const isTrimmed = value.length > maxLength;
            const displayValue = isTrimmed ? value.slice(0, maxLength) + '...' : value;

            return <div className="text-left">{displayValue}</div>;
        },
    }),
    columnHelper.accessor('requested_by', {
        header: () => <div className="text-left">Requested by</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('date_filed', {
        header: () => <div className="text-left">Date filed</div>,
        cell: (info) => <div className="text-left">{format(info.getValue(), 'yyyy-MM-dd')}</div>,
    }),
    columnHelper.accessor('service_type', {
        header: () => <div className="text-left">Service type</div>,
        cell: (info) => <div className="text-left">{serviceTypeBadge(info.getValue())}</div>,
    }),
    columnHelper.accessor('work_description', {
        header: () => <div className="text-left">Requested work description</div>,
        cell: (info) => {
            const value = info.getValue() || '';
            const maxLength = 20;
            const isTrimmed = value.length > maxLength;
            const displayValue = isTrimmed ? value.slice(0, maxLength) + '...' : value;

            return <div className="text-left">{displayValue}</div>;
        },
    }),
    columnHelper.accessor('status', {
        header: () => <div className="text-left">Status</div>,
        cell: (info) => <div className="text-left">{getStatusBadge(info.getValue())}</div>,
    }),
    {
        id: 'actions',
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            const request = row.original;
            const goToMaintenanceRepair = () => {
                if (request.service_type === 'maintenance') {
                    router.get(route('maintenance.show', { maintenance_id: request.maintenance_id }));
                } else if (request.service_type === 'repair') {
                    router.get(route('repairs.show', { maintenance_id: request.maintenance_id }));
                } else {
                    router.get(route('preventive.show', { maintenance_id: request.maintenance_id }));
                }
            };
            const { auth } = usePage().props;
            return (
                <div className="flex justify-center">
                    {request.status === 'completed' && (
                        <Button
                            onClick={() => window.open(`/services/requests/${request.request_id}/pdf`, '_blank')}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-800"
                        >
                            <Printer />
                        </Button>
                    )}
                    {auth.user.role.name === 'Driver' && (
                        <>
                            {request.status === 'pending' && (
                                <div className="flex justify-center gap-2">
                                    <Button className="bg-yellow-300 text-black hover:bg-yellow-400" onClick={() => handleEdit(request.request_id)}>
                                        <Pencil />
                                    </Button>
                                    <DestructiveDialog
                                        icon={Trash}
                                        iconOnly
                                        description="This action cannot be undone. This will permanently delete your request."
                                        action={() => handleDelete(request.request_id)}
                                    />
                                </div>
                            )}
                            {request.status === 'received' && <div className="flex justify-center gap-2"></div>}
                        </>
                    )}
                    {auth.user.role.name === 'Mechanic' && (
                        <>
                            {request.status === 'received' && (
                                <div className="flex justify-center gap-2">
                                    {/* Inspect button */}

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    className="bg-yellow-300 text-black hover:bg-yellow-400"
                                                    onClick={() =>
                                                        router.get(route('request-inspections.create', { data: { requestId: request.request_id } }))
                                                    }
                                                >
                                                    <ScanSearch />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Inspect request</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            )}
                            {request.status === 'approved' && (
                                <div className="flex justify-center gap-2">
                                    {/* Repair/Maintenance/Preventive button */}
                                    {request.service_type === 'repair' && (
                                        <Button
                                            className="bg-green-300 text-black hover:bg-green-400"
                                            onClick={() =>
                                                router.get(
                                                    route('repairs.create', {
                                                        data: { requestId: request.request_id, vehicleId: request.vehicle_id },
                                                    }),
                                                )
                                            }
                                        >
                                            <Wrench />
                                        </Button>
                                    )}
                                    {request.service_type === 'maintenance' && (
                                        <Button
                                            className="bg-green-300 text-black hover:bg-green-400"
                                            onClick={() =>
                                                router.get(
                                                    route('maintenance.create', {
                                                        data: {
                                                            requestId: request.request_id,
                                                            vehicleId: request.vehicle_id,
                                                            planId: request.plan_id,
                                                        },
                                                    }),
                                                )
                                            }
                                        >
                                            <Wrench />
                                        </Button>
                                    )}
                                    {request.service_type === 'preventive' && (
                                        <Button
                                            className="bg-green-300 text-black hover:bg-green-400"
                                            onClick={() =>
                                                router.get(
                                                    route('preventive.create', {
                                                        data: {
                                                            requestId: request.request_id,
                                                            vehicleId: request.vehicle_id,
                                                        },
                                                    }),
                                                )
                                            }
                                        >
                                            <Wrench />
                                        </Button>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                    {(auth.user.role.name === 'Manager' || auth.user.role.name === 'Admin') && (
                        <>
                            {request.status === 'pending' && (
                                <div className="flex justify-center gap-2">
                                    {/* Receive button */}
                                    <Button
                                        className="bg-yellow-300 text-black hover:bg-yellow-400"
                                        onClick={() => handleStatusUpdate(request.request_id, 'received')}
                                    >
                                        Receive
                                    </Button>
                                </div>
                            )}
                            {request.status === 'inspected' && (
                                <div className="flex justify-center gap-2">
                                    {/* Approve button */}
                                    {request.inspection_confirmed ? (
                                        <>
                                            <Button
                                                className="bg-green-300 text-black hover:bg-green-400"
                                                onClick={() => handleStatusUpdate(request.request_id, 'approved')}
                                            >
                                                Approve
                                            </Button>
                                            {/* Reject button */}
                                            <Button
                                                className="bg-red-300 text-black hover:bg-red-400"
                                                onClick={() => handleStatusUpdate(request.request_id, 'rejected')}
                                            >
                                                Reject
                                            </Button>
                                        </>
                                    ) : (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        onClick={() =>
                                                            router.get(route('request-inspections.show', { inspection_id: request.inspection_id }))
                                                        }
                                                        className="bg-amber-300"
                                                        variant="outline"
                                                    >
                                                        <FileWarning />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Inspection is not confirmed, click here to confirm</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                </div>
                            )}
                            {request.status === 'conducted' && (
                                <div className="flex justify-center gap-2">
                                    {/* Confirm maintenance/repair button */}
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button onClick={goToMaintenanceRepair} className="bg-amber-300" variant="outline">
                                                    <CircleArrowOutUpRight />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Maintenance/repair record unconfirmed, click here to view</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            )}
                        </>
                    )}
                </div>
            );
        },
    },
];
