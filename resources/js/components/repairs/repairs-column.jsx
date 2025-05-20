import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { ColorfulRowActions } from '@/components/display/colorful-row-actions';

const columnHelper = createColumnHelper();

export const RepairsColumn = (handleView, handleEdit, handleDelete) => [
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
    columnHelper.accessor('request_description', {
        header: () => <div className="text-left">Request description</div>,
        cell: (info) => {
            const value = info.getValue() || '';
            const maxLength = 20;
            const isTrimmed = value.length > maxLength;
            const displayValue = isTrimmed ? value.slice(0, maxLength) + '...' : value;
            return <div className="text-left">{displayValue}</div>;
        },
    }),
    columnHelper.accessor('performed_by', {
        header: () => <div className="text-left">Performed by</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('confirmed_by', {
        header: () => <div className="text-left">Confirmed by</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('repair_summary', {
        header: () => <div className="text-left">Summary</div>,
        cell: (info) => {
            const value = info.getValue() || '';
            const maxLength = 30;
            const isTrimmed = value.length > maxLength;
            const displayValue = isTrimmed ? value.slice(0, maxLength) + '...' : value;
            return <div className="text-left">{displayValue}</div>;
        },
    }),
    columnHelper.accessor('odometer_reading', {
        header: () => <div className="text-left">Odometer Reading</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    {
        id: 'actions',
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            const repair = row.original;
            return <ColorfulRowActions row={repair} rowKey="repair_id" handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />;
        },
    },
];
