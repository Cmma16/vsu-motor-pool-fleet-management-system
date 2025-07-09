import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, NotepadText, Pencil, TrashIcon } from 'lucide-react';

const columnHelper = createColumnHelper();
function getStatusBadge(status) {
    switch (status) {
        case 'pending':
            return (
                <Badge variant="outline" className="bg-gray-100">
                    Pending
                </Badge>
            );
        case 'assigned':
            return (
                <Badge variant="default" className="bg-green-500">
                    Assigned
                </Badge>
            );
        case 'rejected':
            return (
                <Badge variant="default" className="bg-red-500">
                    Rejected
                </Badge>
            );
        case 'ongoing':
            return (
                <Badge variant="default" className="bg-yellow-500">
                    Ongoing
                </Badge>
            );
        case 'completed':
            return (
                <Badge variant="secondary" className="bg-gray-500">
                    Completed
                </Badge>
            );
        case 'cancelled':
            return (
                <Badge variant="destructive" className="bg-rose-800">
                    Cancelled
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

export const TripColumn = (handleView, handleEdit, handleDelete) => [
    {
        id: 'select',
        enableSorting: false,
        enableHiding: false,
    },
    columnHelper.accessor('trip_number', {
        header: () => <div className="text-left">Trip number</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('destination', {
        header: () => <div className="text-left">Destination</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor(
        (row) => {
            if (row.start_date === row.end_date) {
                return row.start_date;
            } else {
                return `${row.start_date} - ${row.end_date}`;
            }
        },
        {
            id: 'trip_dates',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Trip dates
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: (info) => <div className="text-left">{info.getValue()}</div>,
        },
    ),
    columnHelper.accessor('date_filed', {
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Trip filed
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('vehicle.vehicle_name', {
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
    columnHelper.accessor('driver_name', {
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Driver
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('status', {
        header: () => <div className="text-left">Status</div>,
        cell: (info) => <div className="text-left">{getStatusBadge(info.getValue())}</div>,
    }),
    {
        id: 'actions',
        cell: ({ row }) => {
            const trip = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleView(trip.trip_id)}>
                            <NotepadText />
                            View details
                        </DropdownMenuItem>
                        {trip.status === 'pending' ||
                            (trip.status === 'rejected' && (
                                <DropdownMenuItem onClick={() => handleEdit(trip.trip_id)}>
                                    <Pencil /> Edit
                                </DropdownMenuItem>
                            ))}
                        {trip.status === 'pending' ||
                            trip.status === 'rejected' ||
                            (trip.status === 'cancelled' && (
                                <DropdownMenuItem onClick={() => handleDelete(trip.trip_id)}>
                                    <TrashIcon />
                                    Delete
                                </DropdownMenuItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
