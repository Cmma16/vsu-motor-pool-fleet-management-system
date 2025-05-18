import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

export default function UserVerification({ users }) {
    const { post, processing } = useForm();

    const handleVerify = (userId) => {
        post(route('admin.users.verify', userId));
    };

    const handleUnverify = (userId) => {
        post(route('admin.users.unverify', userId));
    };

    return (
        <AppLayout>
            <Head title="User Verification" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="mb-4 text-2xl font-semibold">User Verification</h2>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                {user.first_name} {user.middle_name} {user.last_name}
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.role?.name}</TableCell>
                                            <TableCell>
                                                {user.is_verified ? (
                                                    <span className="text-green-600">Verified</span>
                                                ) : (
                                                    <span className="text-red-600">Unverified</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {user.is_verified ? (
                                                    <Button variant="destructive" onClick={() => handleUnverify(user.id)} disabled={processing}>
                                                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                                        Unverify
                                                    </Button>
                                                ) : (
                                                    <Button variant="default" onClick={() => handleVerify(user.id)} disabled={processing}>
                                                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                                        Verify
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
