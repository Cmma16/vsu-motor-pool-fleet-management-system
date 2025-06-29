import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { MoreHorizontal, NotepadText, Pencil, TrashIcon } from 'lucide-react';

export function DataTableRowActions({ row, rowKey = 'id', handleView, handleEdit, handleDelete }) {
    const rowId = row[rowKey];

    // console.log('Row actions:', rowId, rowKey);

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
                {handleView && (
                    <DropdownMenuItem onClick={() => handleView(rowId)}>
                        <NotepadText />
                        View details
                    </DropdownMenuItem>
                )}
                {handleEdit && (
                    <DropdownMenuItem onClick={() => handleEdit(rowId)}>
                        <Pencil /> Edit
                    </DropdownMenuItem>
                )}
                {handleDelete && (
                    <DropdownMenuItem onClick={() => handleDelete(rowId)}>
                        <TrashIcon />
                        Delete
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
