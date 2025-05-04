import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { DataTableRowActions } from '@/components/data-table-row-actions';

const columnHelper = createColumnHelper();

export const RepairsColumn = (handleView, handleEdit, handleDelete) => [
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
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('request_id', {
        header: () => <div className="text-left">Request</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('performed_by', {
        header: () => <div className="text-left">Performed by</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('confirmed_by', {
        header: () => <div className="text-left">Confirmed by</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('description', {
        header: () => <div className="text-left">Description</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('status', {
        header: () => <div className="text-left">Status</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    {
        id: 'actions',
        cell: ({ row }) => {
            const repair = row.original;
            return (
                <DataTableRowActions row={repair} rowKey="repair_id" handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
            );
        },
    },
];
