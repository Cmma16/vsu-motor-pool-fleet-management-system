import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.id)}>Copy payment ID</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleView(rowId)}>
                    <NotepadText />
                    View details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEdit(rowId)}>
                    <Pencil /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(rowId)}>
                    <TrashIcon />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
