import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Link } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// import { Button } from 'react-day-picker';

const breadcrumbs = [
    {
        title: 'Parts',
        href: '/parts',
    },
    {
        title: 'Details',
        href: 'parts/details',
    },
];

const pageDetails = {
    title: 'Part Details',
    description: 'Information about the parts.',
};

export default function details({ part }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Part Details" />
            <div className="mx-6 mb-3 flex flex-col gap-2 space-y-6 rounded-lg md:flex-row">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Part Details</CardTitle>
                        <CardDescription>Information about parts stored in the inventory</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Part Name */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="part_name">Part Name</Label>
                                    <span>{part.part_name}</span>
                                </div>

                                {/* Stock Quantity */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="stock_quantity">Stock Quantity</Label>
                                    <span>{part.stock_quantity}</span>
                                </div>

                                {/* Unit */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="unit">Unit</Label>
                                    <span>{part.unit}</span>
                                </div>

                                {/* Unit Price */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="unit_price">Unit Price</Label>
                                    <span>{part.unit_price}</span>
                                </div>

                                {/* Restock Threshold */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="restock_threshold">Restock Threshold</Label>
                                    <span>{part.restock_threshold}</span>
                                </div>
                                <Link
                                    href={`${part.part_id}/edit`}
                                    className="col-span-2 rounded-md bg-[#006600] px-3 py-2 text-center text-white hover:bg-[#005500]"
                                >
                                    Edit part details
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
