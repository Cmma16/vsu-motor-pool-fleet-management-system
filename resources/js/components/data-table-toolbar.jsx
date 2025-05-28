import { DataTableActions } from '@/components/data-table-actions';
import { DataTableViewOptions } from '@/components/data-table-view-options';
import { usePage } from '@inertiajs/react';

export function DataTableToolbar({ table, handleCreate, filterColumn, placeholder, filterOptions, filterColumnName }) {
    const { auth } = usePage().props;
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
            {/* {auth.user.role.name === 'Manager' || (auth.user.role.name === 'Admin' && <DataTableExportOptions />)} */}
            <DataTableViewOptions table={table} />
        </div>
    );
}
