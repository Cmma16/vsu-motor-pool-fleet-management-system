import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { DataTableRowActions } from '@/components/data-table-row-actions';

const columnHelper = createColumnHelper();

export const MaintenanceColumn = (handleView, handleEdit, handleDelete) => [
    {
        id: 'select',
        enableSorting: false,
        enableHiding: false,
    },
    columnHelper.accessor('plan_id', {
        header: () => <div className="text-left">Maintenance Plan</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('request_description', {
        header: () => <div className="text-left">Request Description</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('vehicle_name', {
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Vehicle
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('date_completed', {
        header: () => <div className="text-left">Date Completed</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('odometer_reading', {
        header: () => <div className="text-left">Odometer Reading</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('performed_by', {
        header: () => <div className="text-left">Performed By</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    {
        id: 'actions',
        cell: ({ row }) => {
            const maintenance = row.original;
            return (
                <DataTableRowActions
                    row={maintenance}
                    rowKey={'maintenance_id'}
                    handleView={handleView}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            );
        },
    },
];
