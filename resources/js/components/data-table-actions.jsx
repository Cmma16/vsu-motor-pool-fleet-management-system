import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from '@inertiajs/react';
import { Plus, X } from 'lucide-react';

//add more props for the filter feature, for reusability purposes
export function DataTableActions({
    table,
    handleCreate = null,
    filterColumn,
    placeholder,
    filterOptions = null, // Array of { value: string, label: string }
    filterColumnName = 'status', // Column name for the filter
}) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center gap-2">
            {handleCreate && (
                <Link
                    href={handleCreate}
                    as="button"
                    className="m-0 flex rounded-md border bg-[#006600] px-3 py-1 text-sm text-white hover:bg-[#00964F] hover:text-white"
                    variant="outline"
                >
                    <Plus className="h-5" /> New
                </Link>
            )}
            {filterColumn && (
                <Input
                    placeholder={placeholder || `Filter ${filterColumn}...`}
                    value={table.getColumn(filterColumn)?.getFilterValue() ?? ''}
                    onChange={(event) => table.getColumn(filterColumn)?.setFilterValue(event.target.value)}
                    className="max-w-xs bg-white"
                />
            )}
            {filterOptions && (
                <Select
                    value={table.getColumn(filterColumnName)?.getFilterValue() ?? ''}
                    onValueChange={(value) => table.getColumn(filterColumnName)?.setFilterValue(value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">All</SelectItem>
                        {filterOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
            {isFiltered && (
                <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
                    Reset
                    <X />
                </Button>
            )}
        </div>
    );
}
