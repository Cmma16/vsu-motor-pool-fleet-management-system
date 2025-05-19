import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePage } from '@inertiajs/react';

import { MoreHorizontal, NotepadText, Pencil, Printer, TrashIcon } from 'lucide-react';

export function InspectionRowActions({ row, rowKey = 'id', handleView, handleEdit, handleDelete }) {
    const rowId = row[rowKey];
    const user = usePage().props.auth.user;

    // console.log(row);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleView(rowId)}>
                    <NotepadText />
                    View details
                </DropdownMenuItem>
                {user.role.name === 'Mechanic' && (
                    <>
                        <DropdownMenuItem onClick={() => handleEdit(rowId)}>
                            <Pencil /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(rowId)}>
                            <TrashIcon />
                            Delete
                        </DropdownMenuItem>
                        {row.confirmed_by && (
                            <DropdownMenuItem onClick={() => handlePrint(rowId)}>
                                <Printer />
                                Print
                            </DropdownMenuItem>
                        )}
                    </>
                )}
                {user.role.name === 'Staff' && (
                    <>
                        <DropdownMenuItem onClick={() => confirmInspection(rowId)}>
                            <Check />
                            Confirm
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
