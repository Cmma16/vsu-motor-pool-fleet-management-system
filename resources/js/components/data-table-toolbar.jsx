import { DataTableActions } from '@/components/data-table-actions';
import { DataTableExportOptions } from '@/components/data-table-export-options';
import { DataTableViewOptions } from '@/components/data-table-view-options';

export function DataTableToolbar({ table, handleCreate, filterColumn, placeholder, filterOptions, filterColumnName }) {
    return (
        <div className="flex items-center gap-4 py-4">
            <DataTableActions
                table={table}
                handleCreate={handleCreate}
                filterColumn={filterColumn}
                placeholder={placeholder}
                filterOptions={filterOptions}
                filterColumnName={filterColumnName}
            />
            <DataTableExportOptions />
            <DataTableViewOptions table={table} />
        </div>
    );
}
