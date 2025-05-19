import { router, usePage } from '@inertiajs/react';
import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Printer, ScanSearch, Trash, Wrench } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const columnHelper = createColumnHelper();

export const RequestsColumn = (handleView, handleEdit, handleDelete, handleStatusUpdate) => [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                className="border border-black"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
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
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('service_type', {
        header: () => <div className="text-left">Service type</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
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
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    {
        id: 'actions',
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            const request = row.original;
            const { auth } = usePage().props;
            return (
                <>
                    {auth.user.role.name === 'Driver' && (
                        <>
                            {request.status === 'pending' && (
                                <div className="flex justify-center gap-2">
                                    <Button className="bg-yellow-300 text-black hover:bg-yellow-400" onClick={() => handleEdit(request.request_id)}>
                                        <Pencil />
                                    </Button>
                                    <Button className="bg-red-700 hover:bg-red-600" onClick={() => handleDelete(request.request_id)}>
                                        <Trash />
                                    </Button>
                                </div>
                            )}
                            {request.status === 'received' && (
                                <div className="flex justify-center gap-2">
                                    <Button className="bg-green-300 text-black hover:bg-green-400" onClick={() => handleEdit(request.request_id)}>
                                        <Printer />
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                    {auth.user.role.name === 'Mechanic' && (
                        <>
                            {request.status === 'received' && (
                                <div className="flex justify-center gap-2">
                                    {/* Inspect button */}
                                    <Button
                                        className="bg-yellow-300 text-black hover:bg-yellow-400"
                                        onClick={() => router.get(route('request-inspections.create', { data: { requestId: request.request_id } }))}
                                    >
                                        <ScanSearch />
                                    </Button>
                                </div>
                            )}
                            {request.status === 'approved' && (
                                <div className="flex justify-center gap-2">
                                    {/* Repair/Maintenance button */}
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
                                                        data: { requestId: request.request_id, vehicleId: request.vehicle_id },
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
                    {auth.user.role.name === 'Staff' && (
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
                                </div>
                            )}
                        </>
                    )}
                </>
            );
        },
    },
];
