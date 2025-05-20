import GeneralDashboard from '@/components/dashboard/general-dashboard';
import ServiceRequestSections from '@/components/request/service-request-sections';
import TripDisplaySection from '@/components/trip/trip-display-section';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { AlertTriangle, Car, MapPin, Package } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const pageDetails = {
    title: 'Dashboard',
    description: 'Fleet performance, tracking, and operational insights at a glance',
};

export default function Dashboard({ vehicleStats, maintenanceStats, tripStats, serviceStats, personnelStats, pendingRequests, pendingTrips }) {
    const totalVehicles = {
        title: 'Total Vehicles',
        value: vehicleStats.total,
        description: 'as of this month',
        icon: Car,
    };
    const todayTrips = {
        title: "Today's Trips",
        value: tripStats.today,
        description: 'trips in progress',
        icon: MapPin,
    };

    const maintenanceDue = {
        title: 'Maintenance Due',
        value: maintenanceStats.dueToday + maintenanceStats.dueSoon,
        description: 'upcoming maintenance',
        icon: AlertTriangle,
    };

    const pendingRequestsCount = {
        title: 'Pending Service Requests',
        value: serviceStats.pending,
        description: 'requests pending approval',
        icon: Package,
    };

    const vehicleSummary = [
        { label: 'Available', quantity: vehicleStats.available || 0, fill: 'green' },
        { label: 'In Use', quantity: vehicleStats.inUse || 0, fill: 'yellow' },
        { label: 'Maintenance or Repair', quantity: vehicleStats.maintenance || 0, fill: 'blue' },
        { label: 'Retired', quantity: vehicleStats.retired || 0, fill: 'red' },
    ];

    const personnelSummary = [
        { label: 'Drivers', quantity: personnelStats.driver || 0, fill: 'green' },
        { label: 'Mechanics', quantity: personnelStats.mechanic || 0, fill: 'yellow' },
        { label: 'Staff', quantity: personnelStats.staff || 0, fill: 'orange' },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl px-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl">About Fleet</h2>
                </div>
                <div className="flex flex-col gap-4 py-4 md:gap-8">
                    <div className="flex flex-col gap-4 md:flex-row">
                        {/*<LowStockPartsCard lowStockParts={lowStockParts} /> */}
                        <ServiceRequestSections
                            requests={pendingRequests}
                            sectionTitle=" Service Requests"
                            sectionDescription="Service requests that needs your attention"
                        />
                        <TripDisplaySection
                            trips={pendingTrips}
                            sectionTitle="Pending Trips Requests"
                            sectionDescription="Trips that are pending and have not been assigned."
                        />
                    </div>
                    <GeneralDashboard
                        totalVehicles={totalVehicles}
                        todayTrips={todayTrips}
                        maintenanceDue={maintenanceDue}
                        pendingRequests={pendingRequestsCount}
                        vehicleSummary={vehicleSummary}
                        personnelSummary={personnelSummary}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
