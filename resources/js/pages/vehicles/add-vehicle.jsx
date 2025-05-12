import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import VehicleForm from '@/components/vehicle/vehicle-form';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs = [
    { title: 'Vehicles', href: '/vehicles' },
    { title: 'Add new vehicle', href: '/vehicles/create' },
];

const pageDetails = {
    title: 'Add Vehicle',
    description: 'Add a new vehicle to the fleet.',
};

export default function AddVehicle() {
    const { data, setData, post, processing, errors, reset } = useForm({
        asset_tag: '',
        vehicle_name: '',
        model: '',
        brand: '',
        engine_number: '',
        chassis_number: '',
        vehicle_type: '',
        capacity: '',
        location: '',
        year_acquired: new Date().getFullYear().toString(),
        category: 'light vehicle',
        plate_number: '',
        fuel_type: 'gasoline',
        status: 'available',
    });

    const createVehicle = (e) => {
        e.preventDefault();
        post(route('vehicles.store'), {
            data,
            onSuccess: () => reset(),
            onError: (errors) => console.log(errors),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Vehicles" />
            <div className="mx-6 mb-3 space-y-6 rounded-lg bg-white">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Vehicle Information</CardTitle>
                        <CardDescription>Enter the details of the vehicle you want to add.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <VehicleForm
                            formData={data}
                            formType={'add'}
                            setData={setData}
                            onSubmit={createVehicle}
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
