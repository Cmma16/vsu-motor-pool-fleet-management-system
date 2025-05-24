import { PassengerModal } from '@/components/passenger/passenger-modal';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown, Crown, X } from 'lucide-react';

const columnHelper = createColumnHelper();

export const PassengerColumn = (showActions, handleEdit, handleDelete) => [
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
                    {info.getValue() ? (
                        <Crown fill="gold" size={16} className="text-amber-400" />
                    ) : (
                        info.row.original.trip_status === 'pending' && (
                            <Button variant="ghost" className="hover:bg-amber-400" onClick={() => handleEdit(info.row.original.id)}>
                                <Crown />
                            </Button>
                        )
                    )}
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
        header: (info) => {
            return <div className="text-center">Actions</div>;
        },
        cell: ({ row }) => {
            const passenger = row.original;
            const deletePassenger = (id, isPartyHead) => {
                if (isPartyHead) {
                    alert('This passenger is the party head. Please assign another passenger as party head before deleting.');
                    return;
                }
                if (confirm('Are you sure?')) {
                    router.delete(route('passengers.destroy', { id }));
                }
            };

            // Only show actions if trip status is pending
            if (passenger.trip_status !== 'pending') return null;

            return (
                <div className="flex flex-row justify-center gap-2">
                    <div className="gap-2">
                        <div className="flex flex-row gap-2">
                            <PassengerModal trip_id={passenger.trip_id} formType="edit" passenger={passenger} />
                            <Button size="sm" variant="destructive" onClick={() => deletePassenger(passenger.id, passenger.is_party_head)}>
                                <X />
                            </Button>
                        </div>
                    </div>
                </div>
            );
        },
    },
];
