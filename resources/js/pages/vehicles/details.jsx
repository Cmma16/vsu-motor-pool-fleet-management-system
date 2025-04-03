import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import { Head } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Link } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    {
        title: 'Vehicles',
        href: '/vehicles',
    },
    {
        title: 'Details',
        href: 'vehicles/details',
    },
];

export default function details({ vehicle }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vehicles" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Vehicle Information</CardTitle>
                        <CardDescription>Showing details of the vehicle stored in the database.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {/* Asset Tag */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="asset_tag">Asset Tag</Label>
                                    <span>{vehicle.asset_tag}</span>
                                </div>

                                {/* Vehicle Name */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="vehicle_name">Vehicle Name</Label>
                                    <span>{vehicle.vehicle_name}</span>
                                </div>

                                {/* Model */}

                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="model">Model</Label>
                                    <span>{vehicle.model}</span>
                                </div>

                                {/* Vehicle Type */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="vehicle_type">Vehicle Type</Label>
                                    <span>{vehicle.vehicle_type}</span>
                                </div>

                                {/* Capacity */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="capacity">Capacity</Label>
                                    <span>{vehicle.capacity}</span>
                                    <p className="text-muted-foreground text-sm">Number of passengers</p>
                                </div>

                                {/* Location */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <span>{vehicle.location}</span>
                                </div>

                                {/* Year Acquired */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="year_acquired">Year Acquired</Label>
                                    <span>{vehicle.year_acquired}</span>
                                </div>

                                {/* Category */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <span>{vehicle.category}</span>
                                </div>

                                {/* Plate Number */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="plate_number">Plate Number</Label>
                                    <span>{vehicle.plate_number}</span>
                                </div>

                                {/* Odometer Reading */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="odometer_reading">Odometer Reading</Label>
                                    <span>{vehicle.odometer_reading}</span>
                                    <p className="text-muted-foreground text-sm">Current mileage in km</p>
                                </div>

                                {/* Fuel Type */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="fuel_type">Fuel Type</Label>
                                    <span>{vehicle.fuel_type}</span>
                                </div>

                                {/* Status */}
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <span>{vehicle.status}</span>
                                </div>
                            </div>
                            <Link href={`${vehicle.vehicle_id}/edit`} className="w-1/3 rounded-md bg-[#006600] px-3 py-2">
                                Edit vehicle details
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </div>
        </AppLayout>
    );
}
