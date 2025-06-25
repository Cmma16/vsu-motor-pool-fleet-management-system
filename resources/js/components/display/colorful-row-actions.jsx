import DestructiveDialog from '@/components/display/destructive-dialog';
import { Button } from '@/components/ui/button';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { usePage } from '@inertiajs/react';

import { Check, Eye, Pencil, Printer, TrashIcon } from 'lucide-react';

export function ColorfulRowActions({ row, rowKey = 'id', handleView, handleEdit, handleDelete, handleConfirm }) {
    const rowId = row[rowKey];
    const user = usePage().props.auth.user;

    return (
        <div className="flex flex-row justify-center gap-2">
            <Button className="bg-amber-400 hover:bg-amber-500" onClick={() => handleView(rowId)}>
                <Eye />
            </Button>
            {row.confirmed_by && (
                <Button
                    onClick={() => window.open(`/maintenance/${rowId}/pdf`, '_blank')}
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-800"
                >
                    <Printer />
                </Button>
            )}
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
            {(user.role.name === 'Manager' || user.role.name === 'Admin') && (
                <>
                    {!row.confirmed_by && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button onClick={() => handleConfirm(rowId)}>
                                        <Check />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Confirm record</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </>
            )}
        </div>
    );
}
