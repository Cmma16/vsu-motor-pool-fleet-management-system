import { ColorfulRowActions } from '@/components/display/colorful-row-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';

const columnHelper = createColumnHelper();

export const MaintenanceColumn = (handleView, handleEdit, handleDelete) => [
    {
        id: 'select',
        enableSorting: false,
        enableHiding: false,
    },
    columnHelper.accessor('maintenance_plan', {
        header: () => <div className="text-left">Maintenance Plan</div>,
        cell: (info) => {
            const value = info.getValue() || '';
            const maxLength = 30;
            const isTrimmed = value.length > maxLength;
            const displayValue = isTrimmed ? value.slice(0, maxLength) + '...' : value;
            return <div className="text-left">{displayValue}</div>;
        },
    }),
    columnHelper.accessor('vehicle_name', {
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Vehicle
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => {
            const value = info.getValue() || '';
            const maxLength = 20;
            const isTrimmed = value.length > maxLength;
            const displayValue = isTrimmed ? value.slice(0, maxLength) + '...' : value;
            return <div className="text-left">{displayValue}</div>;
        },
    }),
    columnHelper.accessor('date_in', {
        header: () => <div className="text-left">Date In</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('date_completed', {
        header: () => <div className="text-left">Date Completed</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('odometer_reading', {
        header: () => <div className="text-left">Odometer Reading</div>,
        cell: (info) => <div className="text-left">{info.getValue()} km</div>,
    }),
    columnHelper.accessor('performed_by', {
        header: () => <div className="text-left">Performed By</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('confirmed_by', {
        header: () => <div className="text-left">Confirmation</div>,
        cell: (info) => (
            <div className="text-left">
                {info.getValue() ? <Badge variant="primary">Confirmed</Badge> : <Badge variant="secondary">Unconfirmed</Badge>}
            </div>
        ),
    }),
    {
        id: 'actions',
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            const maintenance = row.original;
            const handleConfirm = () => {
                router.patch(`/maintenance/${maintenance.maintenance_id}/confirm`, {
                    onSuccess: () => {
                        toast.success('Record confirmed', {
                            description: 'The maintenance record has been confirmed successfully',
                        });
                    },
                    onError: () => {
                        toast.error('Confirmation failed', {
                            description: 'The maintenance record was not confirmed',
                        });
                    },
                });
            };

            return (
                <ColorfulRowActions
                    row={maintenance}
                    rowKey={'maintenance_id'}
                    handleView={handleView}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleConfirm={handleConfirm}
                />
            );
        },
    },
];
