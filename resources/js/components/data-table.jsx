'use client';

import PropTypes from 'prop-types';
import React from 'react';

import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { DataTablePagination } from '@/components/data-table-pagination';
import { DataTableToolbar } from '@/components/data-table-toolbar';

export function DataTable({
    columns,
    data,
    handleCreate,
    handleView,
    handleEdit,
    handleDelete,
    filterColumn,
    placeholder,
    filterOptions,
    filterColumnName,
}) {
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns: React.useMemo(() => columns(handleView, handleEdit, handleDelete), [handleView, handleEdit, handleDelete]),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    });

    return (
        <div>
            <DataTableToolbar
                table={table}
                handleCreate={handleCreate}
                filterColumn={filterColumn}
                placeholder={placeholder}
                filterOptions={filterOptions}
                filterColumnName={filterColumnName}
            />
            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}

// PropTypes validation
DataTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            accessorKey: PropTypes.string,
            header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
            cell: PropTypes.func,
        }),
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
