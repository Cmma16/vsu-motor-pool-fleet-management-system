import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown, NotepadText } from 'lucide-react';

const columnHelper = createColumnHelper();

function serviceTypeBadge(serviceType) {
    switch (serviceType) {
        case 'repair':
            return (
                <Badge variant="outline" className="bg-green-500">
                    Repair
                </Badge>
            );
        case 'maintenance':
            return (
                <Badge variant="outline" className="bg-yellow-500">
                    Maintenance
                </Badge>
            );
        case 'preventive':
            return (
                <Badge variant="outline" className="bg-blue-400">
                    Preventive
                </Badge>
            );
    }
}

export const MaintenanceReportsColumn = (handleView, handleEdit, handleDelete) => [
    {
        id: 'select',
        enableSorting: false,
        enableHiding: false,
    },
    columnHelper.accessor('date_in', {
        header: () => <div className="text-left">Date In</div>,
        cell: (info) => {
            const date = new Date(info.getValue());
            const formattedDate = format(date, 'MMM d, yyyy');
            return <div className="text-left">{formattedDate}</div>;
        },
    }),
    columnHelper.accessor('date_completed', {
        header: () => <div className="text-left">Date Completed</div>,
        cell: (info) => {
            const date = new Date(info.getValue());
            const formattedDate = format(date, 'MMM d, yyyy');
            return <div className="text-left">{formattedDate}</div>;
        },
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
    columnHelper.accessor('service_type', {
        header: () => <div className="text-left">Type</div>,
        cell: (info) => <div className="text-left">{serviceTypeBadge(info.getValue())}</div>,
    }),
    columnHelper.accessor('maintenance_summary', {
        header: ({ column }) => <div className="text-left">Description</div>,
        cell: (info) => {
            const value = info.getValue() || '';
            const maxLength = 30;
            const isTrimmed = value.length > maxLength;
            const displayValue = isTrimmed ? value.slice(0, maxLength) + '...' : value;

            return <div className="text-left">{displayValue}</div>;
        },
    }),
    {
        id: 'actions',
        cell: ({ row }) => {
            const record = row.original;
            const handleView = (id) => {
                switch (record.service_type) {
                    case 'repair':
                        router.get(route('repairs.show', { id }));
                        break;
                    case 'maintenance':
                        router.get(route('maintenance.show', { id }));
                        break;
                    case 'preventive':
                        router.get(route('preventive.show', { id }));
                        break;
                }
            };

            return (
                <Button onClick={() => handleView(record.maintenance_id)}>
                    <NotepadText />
                </Button>
            );
        },
    },
];
