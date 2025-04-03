import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import { Head, useForm } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    {
        title: 'Vehicles',
        href: '/vehicles',
    },
    {
        title: 'Add new vehicle ',
        href: 'vehicles/create',
    },
];

export default function AddVehicle() {
    const { data, setData, post, processing, errors, reset } = useForm({
        asset_tag: '', // Uncomment this if needed
        vehicle_name: '',
        model: '',
        vehicle_type: '', // Default empty string or a specific type
        capacity: '0', // Ensure it's a string if used in an input field
        location: '',
        year_acquired: new Date().getFullYear().toString(), // Set a default year
        category: 'light vehicle', // Provide a default value if possible
        plate_number: '',
        odometer_reading: '0', // Ensure it's a string
        fuel_type: 'gasoline', // Set a default value
        status: 'available', // Set a default value
    });

    const createVehicle = (e) => {
        e.preventDefault();

        post(route('vehicles.store'), {
            data, // Sends all form data
            forceFormData: true, // Ensures file uploads and proper formatting
            preserveScroll: true,
            onSuccess: () => {
                reset(); // Reset all fields after a successful submission
            },
            onError: (errors) => {
                console.log(errors); // Log errors for debugging
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vehicles" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Vehicle Information</CardTitle>
                        <CardDescription>Enter the details of the vehicle you want to add.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={createVehicle} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {/* Asset Tag */}
                                <div className="space-y-2">
                                    <Label htmlFor="asset_tag">Asset Tag</Label>
                                    <Input
                                        id="asset_tag"
                                        name="asset_tag"
                                        placeholder="ABC123"
                                        value={data.asset_tag}
                                        onChange={(e) => setData('asset_tag', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.asset_tag} />
                                </div>

                                {/* Vehicle Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="vehicle_name">Vehicle Name</Label>
                                    <Input
                                        id="vehicle_name"
                                        name="vehicle_name"
                                        placeholder="Company Car 1"
                                        value={data.vehicle_name}
                                        onChange={(e) => setData('vehicle_name', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.vehicle_name} />
                                </div>

                                {/* Model */}
                                <div className="space-y-2">
                                    <Label htmlFor="model">Model</Label>
                                    <Input
                                        id="model"
                                        type="text"
                                        tabIndex={2}
                                        value={data.model}
                                        onChange={(e) => setData('model', e.target.value)}
                                        disabled={processing}
                                        placeholder="Model Name"
                                    />
                                    <InputError message={errors.model} />
                                </div>

                                {/* Vehicle Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="vehicle_type">Vehicle Type</Label>
                                    <Select value={data.vehicle_type} onValueChange={(value) => setData('vehicle_type', value)}>
                                        <SelectTrigger id="vehicle_type">
                                            <SelectValue placeholder="Select vehicle type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sedan">Sedan</SelectItem>
                                            <SelectItem value="truck">Truck</SelectItem>
                                            <SelectItem value="motorcycle">Motorcycle</SelectItem>
                                            <SelectItem value="bus">Bus</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.vehicle_type} />
                                </div>

                                {/* Capacity */}
                                <div className="space-y-2">
                                    <Label htmlFor="capacity">Capacity</Label>
                                    <Input
                                        id="capacity"
                                        type="number"
                                        value={data.capacity}
                                        onChange={(e) => setData('capacity', e.target.value)}
                                        disabled={processing}
                                        placeholder="Capacity"
                                    />
                                    <p className="text-muted-foreground text-sm">Number of passengers</p>
                                    <InputError message={errors.capacity} />
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        disabled={processing}
                                        placeholder="Location"
                                    />
                                    <InputError message={errors.location} />
                                </div>

                                {/* Year Acquired */}
                                <div className="space-y-2">
                                    <Label htmlFor="year_acquired">Year Acquired</Label>
                                    <Input
                                        id="year_acquired"
                                        value={data.year_acquired}
                                        onChange={(e) => setData('year_acquired', e.target.value)}
                                        disabled={processing}
                                        placeholder="Year acquired"
                                    />
                                    <InputError message={errors.year_acquired} />
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select value={data.category} onValueChange={(value) => setData('category', value)}>
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="light vehicle">Light Vehicle</SelectItem>
                                            <SelectItem value="heavy vehicle">Heavy Vehicle</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.category} />
                                </div>

                                {/* Plate Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="plate_number">Plate Number</Label>
                                    <Input
                                        id="plate_number"
                                        value={data.plate_number}
                                        onChange={(e) => setData('plate_number', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.plate_number} />
                                </div>

                                {/* Odometer Reading */}
                                <div className="space-y-2">
                                    <Label htmlFor="odometer_reading">Odometer Reading</Label>
                                    <Input
                                        id="odometer_reading"
                                        type="number"
                                        value={data.odometer_reading}
                                        onChange={(e) => setData('odometer_reading', e.target.value)}
                                        disabled={processing}
                                        placeholder="in km"
                                    />
                                    <p className="text-muted-foreground text-sm">Current mileage in km</p>
                                    <InputError message={errors.odometer_reading} />
                                </div>

                                {/* Fuel Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="fuel_type">Fuel Type</Label>
                                    <Select value={data.fuel_type} onValueChange={(value) => setData('fuel_type', value)}>
                                        <SelectTrigger id="fuel_type">
                                            <SelectValue placeholder="Select fuel type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="gasoline">Gasoline</SelectItem>
                                            <SelectItem value="diesel">Diesel</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.fuel_type} />
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="available">Available</SelectItem>
                                            <SelectItem value="in_use">In Use</SelectItem>
                                            <SelectItem value="under_maintenance">Under Maintenance</SelectItem>
                                            <SelectItem value="retired">Retired</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
                                </div>
                            </div>
                            <Button disabled={processing} className="w-1/3">
                                Add Vehicle
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </div>
        </AppLayout>
    );
}
