import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Link } from '@inertiajs/react';

export function AboutVehicleCard({ vehicle }) {
    return (
        <Card className="md:w-2/3">
            <CardHeader>
                <CardTitle>Vehicle Details</CardTitle>
                <CardDescription>Comprehensive information about the vehicle, including specifications and status.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

                        {/* Fuel Type */}
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="fuel_type">Fuel Type</Label>
                            <span>{vehicle.fuel_type}</span>
                        </div>

                        {/* Plate Number */}
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="plate_number">Plate Number</Label>
                            <span>{vehicle.plate_number}</span>
                        </div>
                        <Link
                            href={`${vehicle.vehicle_id}/edit`}
                            className="col-span-2 rounded-md bg-[#006600] px-3 py-2 text-center text-white hover:bg-[#005500]"
                        >
                            Edit vehicle details
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
