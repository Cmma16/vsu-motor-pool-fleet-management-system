import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

import { DataTableRowActions } from '@/components/data-table-row-actions';
import { usePage } from '@inertiajs/react';

const columnHelper = createColumnHelper();

function getStatusBadge(status) {
    switch (status) {
        case 'scheduled':
            return (
                <Badge variant="outline" className="bg-gray-100 text-indigo-500">
                    Scheduled
                </Badge>
            );
        case 'pending':
            return (
                <Badge variant="default" className="bg-yellow-500">
                    Pending
                </Badge>
            );
        case 'completed':
            return (
                <Badge variant="default" className="bg-green-500">
                    Completed
                </Badge>
            );
        case 'cancelled':
            return (
                <Badge variant="default" className="bg-red-500">
                    Cancelled
                </Badge>
            );
    }
}

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
        cell: (info) => <div className="text-left">{format(info.getValue(), 'LLL dd, yyyy')}</div>,
    }),
    columnHelper.accessor('created_by', {
        header: () => <div className="text-left">Created by</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('status', {
        header: () => <div className="text-left">Status</div>,
        cell: (info) => <div className="text-left">{getStatusBadge(info.getValue())}</div>,
    }),
    {
        id: 'actions',
        cell: ({ row }) => {
            const plan = row.original;
            const { auth } = usePage().props;
            if (!handleView && !handleEdit && !handleDelete) {
                return null;
            }
            return <DataTableRowActions row={plan} rowKey="plan_id" handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />;
        },
    },
];
