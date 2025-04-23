import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

import { Head } from '@inertiajs/react';

import { AboutVehicleCard } from '@/components/vehicle/about-vehicle-card';
import { OdometerReadingCard } from '@/components/vehicle/odometer-reading-card';
import { PlateNumberCard } from '@/components/vehicle/plate-number-card';
import { VehicleStatusCard } from '@/components/vehicle/vehicle-status-card';
import AppLayout from '@/layouts/app-layout';
// import { Button } from 'react-day-picker';

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

const pageDetails = {
    title: 'Vehicle Details',
    description: 'Comprehensive information about the vehicle, including specifications and status.',
};

export default function details({ vehicle }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Vehicle Details" />
            <div className="mx-6 mb-3 flex flex-col gap-2 space-y-6 rounded-lg md:flex-row">
                <AboutVehicleCard vehicle={vehicle} />
                <div className="space-y-1.5 md:w-1/3">
                    <OdometerReadingCard odometer_reading={vehicle.odometer_reading} />
                    <VehicleStatusCard status={vehicle.status} />
                    <PlateNumberCard plate_number={vehicle.plate_number} />
                </div>
            </div>
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </div>
        </AppLayout>
    );
}
