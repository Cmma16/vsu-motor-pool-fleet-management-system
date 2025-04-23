import { DataTableActions } from '@/components/data-table-actions';
import { DataTableExportOptions } from '@/components/data-table-export-options';
import { DataTableViewOptions } from '@/components/data-table-view-options';

export function DataTableToolbar({ table, handleCreate }) {
    return (
        <div className="flex items-center gap-4 py-4">
            <DataTableActions table={table} handleCreate={handleCreate} />
            <DataTableExportOptions />
            <DataTableViewOptions table={table} />
        </div>
    );
}
