import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { DataTableRowActions } from '@/components/data-table-row-actions';

const columnHelper = createColumnHelper();

export const PartsColumn = (handleView, handleEdit, handleDelete) => [
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
    columnHelper.accessor('part_name', {
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Part Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('stock_quantity', {
        header: () => <div className="text-left">Stock</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('unit', {
        header: () => <div className="text-left">Unit</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('unit_price', {
        header: () => <div className="text-left">Unit price</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('restock_threshold', {
        header: () => <div className="text-left">Restock threshold</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    {
        id: 'actions',
        cell: ({ row }) => {
            const part = row.original;
            return <DataTableRowActions row={part} rowKey="part_id" handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />;
        },
    },
];
