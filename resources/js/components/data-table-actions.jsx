import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@inertiajs/react';
import { Plus, X } from 'lucide-react';

//add more props for the filter feature, for reusability purposes
export function DataTableActions({ table }) {
    const isFiltered = table.getState().columnFilters.length > 0;
    return (
        <>
            <Link
                href={route('vehicles.create')}
                as="button"
                className="m-0 flex rounded-md border bg-[#006600] px-3 py-1 text-sm text-white hover:bg-[#00964F] hover:text-white"
                variant="outline"
            >
                <Plus className="h-5" /> New
            </Link>
            <Input
                placeholder="Filter vehicles..."
                value={table.getColumn('vehicle_name')?.getFilterValue() ?? ''}
                onChange={(event) => table.getColumn('vehicle_name')?.setFilterValue(event.target.value)}
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
