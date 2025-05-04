import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { DataTableRowActions } from '@/components/data-table-row-actions';

const columnHelper = createColumnHelper();

export const RequestsColumn = (handleView, handleEdit, handleDelete) => [
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
    columnHelper.accessor('date_received', {
        header: () => <div className="text-left">Date received</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('received_by', {
        header: () => <div className="text-left">Received by</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('status', {
        header: () => <div className="text-left">Status</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    {
        id: 'actions',
        cell: ({ row }) => {
            const request = row.original;
            return (
                <DataTableRowActions row={request} rowKey="request_id" handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
            );
        },
    },
];
