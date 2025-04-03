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

export function DataTableRowActions({ row, handleView, handleEdit, handleDelete }) {
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
                <DropdownMenuItem onClick={() => handleView(row.vehicle_id)}>
                    <NotepadText />
                    View details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEdit(row.vehicle_id)}>
                    <Pencil /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(row.vehicle_id)}>
                    <TrashIcon />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
