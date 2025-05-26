import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { usePage } from '@inertiajs/react';

import { Check, Eye, Pencil, TrashIcon } from 'lucide-react';

export function InspectionRowActions({ row, rowKey = 'id', handleView, handleEdit, handleDelete, handleConfirm }) {
    const rowId = row[rowKey];
    const user = usePage().props.auth.user;

    return (
        <div className="flex flex-row justify-center gap-2">
            <Button variant="outline" onClick={() => handleView(rowId)}>
                <Eye />
            </Button>
            {user.role.name === 'Mechanic' && (
                <div className="gap-2">
                    {!row.confirmed_by && (
                        <div className="flex flex-row gap-2">
                            <Button variant="outline" onClick={() => handleEdit(rowId)}>
                                <Pencil />
                            </Button>
                            <Button variant="destructive" onClick={() => handleDelete(rowId)}>
                                <TrashIcon />
                            </Button>
                        </div>
                    )}
                </div>
            )}
            {user.role.name === 'Staff' && (
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
                                    <p>Confirm inpection</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </>
            )}
        </div>
    );
}
