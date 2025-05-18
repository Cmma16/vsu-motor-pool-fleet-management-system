import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
// import { Button } from 'react-day-picker';

const breadcrumbs = [
    {
        title: 'Personnel',
        href: '/personnel',
    },
    {
        title: 'Details',
        href: 'personnel/details',
    },
];

const pageDetails = {
    title: 'Personnel Details',
    description: 'View the details of a personnel.',
};

export default function details({ personnel }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Personnel Details" />
            {console.log(personnel)}
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Personnel Information</CardTitle>
                        <CardDescription>General details about the personnel.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* Personal Information Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Personal Information</h2>
                            <Separator />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <span id="firstName" className="block w-full rounded-md border border-gray-200 bg-gray-50 p-2">
                                        {personnel.first_name ?? 'N/A'}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="middleName">Middle Name</Label>
                                    <span id="middleName" className="block w-full rounded-md border border-gray-200 bg-gray-50 p-2">
                                        {personnel.middle_name ?? 'N/A'}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <span id="lastName" className="block w-full rounded-md border border-gray-200 bg-gray-50 p-2">
                                        {personnel.last_name ?? 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Contact Information</h2>
                            <Separator />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="contactNumber">Contact Number</Label>
                                    <span id="contactNumber" className="block w-full rounded-md border border-gray-200 bg-gray-50 p-2">
                                        {personnel.contact_number ?? 'N/A'}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <span id="email" className="block w-full rounded-md border border-gray-200 bg-gray-50 p-2">
                                        {personnel.email ?? 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Address</h2>
                            <Separator />

                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="barangay">Barangay</Label>
                                    <span id="barangay" className="block w-full rounded-md border border-gray-200 bg-gray-50 p-2">
                                        {personnel.barangay ?? 'N/A'}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="townCity">Town/City</Label>
                                    <span id="townCity" className="block w-full rounded-md border border-gray-200 bg-gray-50 p-2">
                                        {personnel.city ?? 'N/A'}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="province">Province</Label>
                                    <span id="province" className="block w-full rounded-md border border-gray-200 bg-gray-50 p-2">
                                        {personnel.province ?? 'N/A'}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="province">Zone/Block/Street/House No.</Label>
                                    <span id="province" className="block w-full rounded-md border border-gray-200 bg-gray-50 p-2">
                                        {personnel.address_details ?? 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
