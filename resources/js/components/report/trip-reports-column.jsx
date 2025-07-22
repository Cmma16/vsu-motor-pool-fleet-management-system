import { Button } from '@/components/ui/button';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown, NotepadText } from 'lucide-react';

const columnHelper = createColumnHelper();

function formatDate(date) {
    const newDate = new Date(date);
    const formattedDate = format(newDate, 'MMM d, yyyy');
    return formattedDate;
}

export const TripReportsColumn = (handleView, handleEdit, handleDelete) => [
    {
        id: 'select',
        enableSorting: false,
        enableHiding: false,
    },
    columnHelper.accessor('trip_number', {
        header: () => <div className="text-left">Trip number</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor(
        (row) => {
            if (row.start_date === row.end_date) {
                return formatDate(row.start_date);
            } else {
                return `${formatDate(row.start_date)} - ${formatDate(row.end_date)}`;
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
    columnHelper.accessor('vehicle_name', {
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Vehicle
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('destination', {
        header: () => <div className="text-left">Destination</div>,
        cell: (info) => {
            const value = info.getValue() || '';
            const maxLength = 30;
            const isTrimmed = value.length > maxLength;
            const displayValue = isTrimmed ? value.slice(0, maxLength) + '...' : value;

            return <div className="text-left">{displayValue}</div>;
        },
    }),
    {
        id: 'actions',
        cell: ({ row }) => {
            const trip = row.original;

            return (
                <Button onClick={() => handleView(trip.trip_id)}>
                    <NotepadText />
                </Button>
            );
        },
    },
];
