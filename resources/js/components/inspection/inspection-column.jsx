import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

import { InspectionRowActions } from '@/components/inspection/inspection-row-actions';

const columnHelper = createColumnHelper();

export const InspectionsColumn = (handleView, handleEdit, handleDelete) => [
    {
        id: 'select',
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
        cell: (info) => {
            const dateObj = new Date(info.getValue());

            const formattedDateTime = dateObj.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });

            return <div className="text-left">{formattedDateTime}</div>;
        },
    }),
    columnHelper.accessor('completed_at', {
        header: () => <div className="text-left">Completed at</div>,
        cell: (info) => {
            const dateObj = new Date(info.getValue());

            const formattedDateTime = dateObj.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });

            return <div className="text-left">{formattedDateTime}</div>;
        },
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

    columnHelper.accessor('confirmed_by', {
        header: () => <div className="text-left">Confirmed by</div>,
        cell: (info) => <div className="text-left">{info.getValue() || 'Unconfirmed'}</div>,
    }),
    {
        id: 'actions',
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            const inspection = row.original;
            const confirmInspection = (id) => {
                router.patch(`/services/request-inspections/${id}/confirm`);
            };
            return (
                <InspectionRowActions
                    row={inspection}
                    rowKey="inspection_id"
                    handleView={handleView}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleConfirm={confirmInspection}
                />
            );
        },
    },
];
