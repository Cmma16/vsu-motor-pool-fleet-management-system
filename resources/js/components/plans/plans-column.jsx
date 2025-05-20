import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { DataTableRowActions } from '@/components/data-table-row-actions';
import { usePage } from '@inertiajs/react';

const columnHelper = createColumnHelper();

export const PlansColumn = (handleView, handleEdit, handleDelete) => [
    {
        id: 'select',
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
    columnHelper.accessor('scheduled_date', {
        header: () => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Scheduled date
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('next_service_km', {
        header: () => <div className="text-left">Next service (km)</div>,
        cell: (info) => <div className="text-left">{info.getValue()} km</div>,
    }),
    columnHelper.accessor('created_by', {
        header: () => <div className="text-left">Created by</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('status', {
        header: () => <div className="text-left">Status</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    {
        id: 'actions',
        cell: ({ row }) => {
            const plan = row.original;
            const { auth } = usePage().props;
            if (auth.user.role === 'Admin' || auth.user.role === 'Staff') {
                return (
                    <DataTableRowActions row={plan} rowKey="plan_id" handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
                );
            }
            return null;
        },
    },
];
