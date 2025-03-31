import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';

//add more props for the filter feature, for reusability purposes
export function DataTableActions({ table }) {
    const isFiltered = table.getState().columnFilters.length > 0;
    return (
        <>
            <Button className="m-0 rounded-md border bg-[#006600] text-white hover:bg-[#00964F] hover:text-white" variant="outline">
                <Plus /> New
            </Button>
            <Input
                placeholder="Filter vehicles..."
                value={table.getColumn('vehicleName')?.getFilterValue() ?? ''}
                onChange={(event) => table.getColumn('vehicleName')?.setFilterValue(event.target.value)}
                className="max-w-xs bg-white"
            />
            {isFiltered && (
                <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
                    Reset
                    <X />
                </Button>
            )}
        </>
    );
}
