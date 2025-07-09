import { ColorfulRowActions } from '@/components/display/colorful-row-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';

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
    columnHelper.accessor('date_in', {
        header: () => <div className="text-left">Date In</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('date_completed', {
        header: () => <div className="text-left">Date Completed</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('performed_by', {
        header: () => <div className="text-left">Performed by</div>,
        cell: (info) => {
            return <div className="text-left">{info.getValue()}</div>;
        },
    }),
    columnHelper.accessor('odometer_reading', {
        header: () => <div className="text-left">Odometer Reading</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('confirmed_by', {
        header: () => <div className="text-left">Confirmation</div>,
        filterFn: (row, columnId, filterValue) => {
            const value = row.getValue(columnId);
            if (filterValue === 'confirmed') {
                return value !== '';
            }
            if (filterValue === 'unconfirmed') {
                return value === '';
            }
            return true; // default fallback
        },
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
            const repair = row.original;
            const handleConfirm = () => {
                // Merged maintenance and repairs into one table named maintenance(to be changed to service_logs)
                //TODO: Change the route to /service_logs/${repair.repair_id}/confirm
                router.patch(
                    `/repairs/${repair.repair_id}/confirm`,
                    {}, // empty data object since we're not sending any data
                    {
                        onSuccess: () => {
                            toast.success('Record confirmed', {
                                description: 'The repair record has been confirmed successfully',
                            });
                        },
                        onError: () => {
                            toast.error('Confirmation failed', {
                                description: 'The repair record was not confirmed',
                            });
                        },
                    },
                );
            };

            return (
                <ColorfulRowActions
                    row={repair}
                    rowKey="repair_id"
                    handleView={handleView}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleConfirm={handleConfirm}
                />
            );
        },
    },
];
