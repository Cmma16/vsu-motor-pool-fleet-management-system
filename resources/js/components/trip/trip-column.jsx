import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, NotepadText, Pencil, TrashIcon } from 'lucide-react';

const columnHelper = createColumnHelper();

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
            header: () => <div className="text-left">Trip Dates</div>,
            cell: (info) => <div className="text-left">{info.getValue()}</div>,
        },
    ),
    columnHelper.accessor('date_filed', {
        header: () => <div className="text-left">Date filed</div>,
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
        header: () => <div className="text-left">Driver name</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('status', {
        header: () => <div className="text-left">Status</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
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
