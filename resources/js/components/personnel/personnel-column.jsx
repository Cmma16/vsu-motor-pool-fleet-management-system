import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown, Loader2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

const columnHelper = createColumnHelper();

export const PersonnelColumn = (handleView, handleEdit, handleDelete, roles) => [
    {
        id: 'select',
        enableSorting: false,
        enableHiding: false,
    },
    columnHelper.accessor('personnel_name', {
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Personnel Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('email', {
        header: () => <div className="text-left">Email</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('phone_number', {
        header: () => <div className="text-left">Phone Number</div>,
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor('role_id', {
        header: () => <div className="text-left">Role</div>,
        cell: (info) => {
            const personnel = info.row.original;
            const [isUpdating, setIsUpdating] = React.useState(false);

            const handleRoleChange = (newRoleId) => {
                setIsUpdating(true);
                router.put(
                    `/personnel/${personnel.id}/role`,
                    {
                        role: newRoleId,
                    },
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            console.log('Role updated successfully');
                        },
                        onError: () => {
                            console.error('Failed to update role');
                        },
                        onFinish: () => {
                            setIsUpdating(false);
                        },
                    },
                );
            };

            return (
                <div className="text-left">
                    {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Select value={String(info.getValue())} onValueChange={handleRoleChange} disabled={isUpdating}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            {roles.map((role) => (
                                <SelectItem key={role.role_id} value={String(role.role_id)}>
                                    {role.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            );
        },
    }),
    {
        id: 'actions',
        header: () => <div className="text-left">Actions</div>,
        cell: ({ row }) => {
            const personnel = row.original;
            const handleUnverify = () => {
                router.put(`/personnel/${personnel.id}/unverify`);

                toast('Unverified');
            };
            return (
                <div className="flex gap-2">
                    <Button className="bg-yellow-300 text-black hover:bg-yellow-400" onClick={() => handleView(personnel.id)}>
                        View
                    </Button>
                    <Button className="bg-red-700 hover:bg-red-600" onClick={handleUnverify}>
                        Unverify
                    </Button>
                </div>
            );
        },
    },
];
