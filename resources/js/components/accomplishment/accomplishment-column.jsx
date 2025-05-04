import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { DataTableRowActions } from '@/components/data-table-row-actions';

const columnHelper = createColumnHelper();

export const AccomplishmentsColumn = (handleView, handleEdit, handleDelete) => [
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
    columnHelper.accessor('conducted_by', {
        header: () => <div className="text-left">Conducted by</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('verified_by', {
        header: () => <div className="text-left">Confirmed_by</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    {
        id: 'actions',
        cell: ({ row }) => {
            const accomplishment = row.original;
            return (
                <DataTableRowActions
                    row={accomplishment}
                    rowKey="accomplishment_id"
                    handleView={handleView}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            );
        },
    },
];
