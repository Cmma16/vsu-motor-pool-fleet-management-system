import DestructiveDialog from '@/components/display/destructive-dialog';
import { MaintenancePartModal } from '@/components/parts/maintenance-part-modal';
import { Button } from '@/components/ui/button';
import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown, TrashIcon } from 'lucide-react';

const columnHelper = createColumnHelper();

export const MaintenancePartColumn = (handleEdit, handleView, handleDelete) => [
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
            const maintenancePart = row.original;
            if (maintenancePart.confirmed_by) return null;

            return (
                <div className="flex justify-center gap-2">
                    <MaintenancePartModal maintenance_id={maintenancePart.maintenance_id} maintenancePart={maintenancePart} formType="edit" />
                    <DestructiveDialog
                        icon={TrashIcon}
                        iconOnly
                        description="This action cannot be undone. This will delete the record permanently."
                        action={() => handleDelete(maintenancePart.id)}
                    />
                </div>
            );
        },
    },
];
