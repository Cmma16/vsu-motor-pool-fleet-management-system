import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { DataTableRowActions } from '@/components/data-table-row-actions';

const columnHelper = createColumnHelper();

export const columns = (handleView, handleEdit, handleDelete) => [
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
    columnHelper.accessor('location', {
        header: () => <div className="text-left">Location</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('category', {
        header: () => <div className="text-left">Category</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('capacity', {
        header: () => <div className="text-left">Capacity</div>,
        cell: (info) => <div className="text-left">{info.getValue()} person(s)</div>,
    }),
    columnHelper.accessor('odometer_reading', {
        header: () => <div className="text-left">Odometer</div>,
        cell: (info) => {
            const meterReading = parseFloat(info.getValue());
            const formatted = new Intl.NumberFormat('en-US').format(meterReading);

            return <div className="text-left">{formatted} km</div>;
        },
    }),
    columnHelper.accessor('status', {
        header: () => <div className="text-left">Status</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    {
        id: 'actions',
        cell: ({ row }) => {
            const vehicle = row.original;
            return (
                <DataTableRowActions row={vehicle} rowKey="vehicle_id" handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
            );
        },
    },
];
