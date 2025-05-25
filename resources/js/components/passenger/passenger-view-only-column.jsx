import { Button } from '@/components/ui/button';
import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown, Crown } from 'lucide-react';

const columnHelper = createColumnHelper();

export const PassengerViewOnlyColumn = (showActions, handleEdit, handleDelete) => [
    {
        id: 'select',
        enableSorting: false,
        enableHiding: false,
    },
    columnHelper.accessor('is_party_head', {
        header: () => <div className="text-left"></div>,
        cell: (info) => {
            return (
                <div className="flex items-center justify-center text-center">
                    {info.getValue() ? <Crown fill="gold" size={16} className="text-amber-400" /> : ''}
                </div>
            );
        },
    }),
    columnHelper.accessor('name', {
        header: () => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => {
            const value = info.getValue() || '';
            const maxLength = 30;
            const isTrimmed = value.length > maxLength;
            const displayValue = isTrimmed ? value.slice(0, maxLength) + '...' : value;
            return <div className="text-left">{displayValue}</div>;
        },
    }),
    columnHelper.accessor('affiliation', {
        header: () => <div className="text-left">Department/Office/Center/Project</div>,
        cell: (info) => {
            return <div className="text-left">{info.getValue()}</div>;
        },
    }),
    columnHelper.accessor('contact_number', {
        header: () => <div className="text-left">Contact Number</div>,
        cell: (info) => {
            return <div className="text-left">{info.getValue()}</div>;
        },
    }),
    {
        id: 'actions',
    },
];
