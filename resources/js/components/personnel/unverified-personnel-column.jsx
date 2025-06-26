import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';

import VerifyPersonnelModal from '@/components/personnel/verify-personnel-modal';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const columnHelper = createColumnHelper();

export const UnverifiedPersonnelColumn = (handleView, handleEdit, handleDelete, roles) => [
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
    columnHelper.accessor('created_at', {
        header: () => <div className="text-left">Created At</div>,
        cell: (info) => {
            const date = new Date(info.getValue());
            const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            return <div className="text-left">{formattedDate}</div>;
        },
    }),
    {
        id: 'actions',
        header: () => <div className="text-left">Actions</div>,
        cell: ({ row }) => {
            const personnel = row.original;
            const handleVerify = (roleId) => {
                router.put(
                    `/personnel/${personnel.id}/role`,
                    {
                        role: roleId,
                    },
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            router.put(
                                `/personnel/${personnel.id}/verify`,
                                {},
                                {
                                    preserveScroll: true,
                                    onSuccess: () => {
                                        toast.success('Personnel verified successfully', {
                                            description: 'The personnel can now access the system.',
                                        });
                                    },
                                    onError: () => {
                                        toast('Error', {
                                            description: 'Failed to verify personnel',
                                        });
                                    },
                                },
                            );
                        },
                        onError: () => {
                            toast.error('Failed to set personnel role');
                        },
                    },
                );
            };
            const handleDelete = () => {
                router.delete(`/personnel/${personnel.id}`, {
                    preserveScroll: true,
                    onSuccess: () => {
                        toast.success('Delete successful', {
                            description: 'The personnel has been successfully deleted from the system.',
                        });
                    },
                    onError: () => {
                        toast('Error', {
                            description: 'Failed to delete personnel',
                        });
                    },
                });
            };
            return (
                <div className="flex gap-2">
                    <Button
                        className="bg-yellow-300 text-black hover:bg-yellow-400"
                        onClick={() => router.get(route('personnel.show', { id: personnel.id }))}
                    >
                        View
                    </Button>
                    <VerifyPersonnelModal onConfirm={handleVerify} personnel={personnel} roles={roles} />
                    <Dialog>
                        <DialogTrigger className="rounded bg-red-700 px-3 text-white hover:bg-red-800">Delete</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete User?</DialogTitle>
                                <DialogDescription>This action cannot be undone. Are you sure you want to delete this user?</DialogDescription>
                                <div className="mt-4 flex justify-end gap-2">
                                    <Button className="border-2 transition-all hover:bg-transparent hover:text-black">Cancel</Button>
                                    <Button
                                        className="border-2 border-red-600 bg-red-600 transition-all hover:bg-transparent hover:text-black"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        },
    },
];
