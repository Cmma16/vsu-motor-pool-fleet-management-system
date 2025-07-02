import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { RepairPartModal } from '@/components/parts/repair-part-modal';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

import { TrashIcon } from 'lucide-react';
const columnHelper = createColumnHelper();

export const RepairPartsColumn = (showActions, handleEdit, handleDelete) => [
    {
        id: 'select',
        enableSorting: false,
        enableHiding: false,
    },
    columnHelper.accessor('part_name', {
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Part Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('quantity_used', {
        header: () => <div className="text-left">Quantity Used</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    {
        id: 'actions',
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            const repairPart = row.original;
            if (!showActions) return null;
            const deleteRepairPart = (id) => {
                if (confirm('Are you sure?')) {
                    router.delete(route('repair-parts.destroy', { id }));
                }
            };

            return (
                <div className="flex justify-center gap-2">
                    <RepairPartModal repair_id={repairPart.repair_id} repairPart={repairPart} formType="edit" />
                    <Button variant="destructive" size="sm" onClick={() => deleteRepairPart(repairPart.part_id)}>
                        <TrashIcon />
                        Delete
                    </Button>
                </div>
            );
        },
    },
];
