import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { DataTableRowActions } from '@/components/data-table-row-actions';

const columnHelper = createColumnHelper();

export const InspectionsColumn = (handleView, handleEdit, handleDelete) => [
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
    columnHelper.accessor('request_description', {
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Request description
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
    columnHelper.accessor('started_at', {
        header: () => <div className="text-left">Started at</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('completed_at', {
        header: () => <div className="text-left">Completed at</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('parts_available', {
        header: () => <div className="text-left">Parts available</div>,
        cell: (info) => {
            const isAvailable = info.getValue();
            const value = isAvailable ? 'Yes' : 'No';
            return <div className="text-left">{value}</div>;
        },
    }),
    columnHelper.accessor('personnel_available', {
        header: () => <div className="text-left">Personnel available</div>,
        cell: (info) => {
            const personnelAvailable = info.getValue();
            const value = personnelAvailable ? 'Yes' : 'No';
            return <div className="text-left">{value}</div>;
        },
    }),
    columnHelper.accessor('estimated_duration', {
        header: () => <div className="text-left">Estimated duration</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('conducted_by', {
        header: () => <div className="text-left">Conducted by</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('confirmed_by', {
        header: () => <div className="text-left">Confirmed_by</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    {
        id: 'actions',
        cell: ({ row }) => {
            const inspection = row.original;
            return (
                <DataTableRowActions
                    row={inspection}
                    rowKey="inspection_id"
                    handleView={handleView}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            );
        },
    },
];
