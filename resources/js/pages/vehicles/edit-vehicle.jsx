import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import VehicleForm from '@/components/vehicle/vehicle-form';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    {
        title: 'Vehicles',
        href: '/vehicles',
    },
    {
        title: 'Edit',
        href: 'vehicles/edit',
    },
];

const pageDetails = {
    title: 'Edit Vehicle',
    description: 'Update the details of the vehicle.',
};

export default function EditVehicle({ vehicle }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        asset_tag: vehicle.asset_tag,
        vehicle_name: vehicle.vehicle_name,
        model: vehicle.model,
        brand: vehicle.brand,
        engine_number: vehicle.engine_number,
        chassis_number: vehicle.chassis_number,
        vehicle_type: vehicle.vehicle_type,
        capacity: vehicle.capacity,
        location: vehicle.location,
        year_acquired: vehicle.year_acquired,
        category: vehicle.category,
        plate_number: vehicle.plate_number,
        fuel_type: vehicle.fuel_type,
        status: vehicle.status,
        image: null,
        image_path: vehicle.image_path,
    });

    const editVehicle = (e) => {
        e.preventDefault();
        put(route('vehicles.update', vehicle.vehicle_id), {
            //forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Vehicle updated successfully');
            },
            onError: (errors) => {
                toast.error('Failed to update vehicle');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Vehicles" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Vehicle Information</CardTitle>
                        <CardDescription>Update the details of the vehicle.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <VehicleForm
                            formData={data}
                            formType={'edit'}
                            setData={setData}
                            onSubmit={editVehicle}
                            processing={processing}
                            errors={errors}
                        />
                    </CardContent>
                </Card>
            </div>
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </div>
        </AppLayout>
    );
}
