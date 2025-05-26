import DestructiveDialog from '@/components/display/destructive-dialog';
import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';

import { Check, Eye, Pencil, TrashIcon } from 'lucide-react';

export function ColorfulRowActions({ row, rowKey = 'id', handleView, handleEdit, handleDelete, handleConfirm }) {
    const rowId = row[rowKey];
    const user = usePage().props.auth.user;

    return (
        <div className="flex flex-row justify-center gap-2">
            <Button className="bg-amber-400 hover:bg-amber-500" onClick={() => handleView(rowId)}>
                <Eye />
            </Button>
            {user.role.name === 'Mechanic' && (
                <div className="gap-2">
                    {!row.confirmed_by && (
                        <div className="flex flex-row gap-2">
                            <Button variant="outline" onClick={() => handleEdit(rowId)}>
                                <Pencil />
                            </Button>
                            <DestructiveDialog
                                icon={TrashIcon}
                                iconOnly
                                description="This action cannot be undone. This will delete the record permanently."
                                action={() => handleDelete(rowId)}
                            />
                        </div>
                    )}
                </div>
            )}
            {user.role.name === 'Staff' && (
                <>
                    {!row.confirmed_by && (
                        <Button onClick={() => handleConfirm(rowId)}>
                            <Check />
                            Confirm
                        </Button>
                    )}
                </>
            )}
        </div>
    );
}
