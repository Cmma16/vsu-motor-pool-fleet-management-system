import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { DataTableRowActions } from '@/components/data-table-row-actions';

const columnHelper = createColumnHelper();

export const PartsColumn = (handleView, handleEdit, handleDelete) => [
    {
        id: 'select',
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
    columnHelper.accessor(
        (row) => {
            return `${row.stock_quantity} ${row.unit}`;
        },
        {
            id: 'trip_dates',
            header: () => <div className="text-left">Current Stock</div>,
            cell: (info) => <div className="text-left">{info.getValue()}</div>,
        },
    ),
    columnHelper.accessor('unit_price', {
        header: () => <div className="text-left">Unit price</div>,
        cell: (info) => <div className="text-left">₱{info.getValue()}</div>,
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
