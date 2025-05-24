import GeneralDashboard from '@/components/dashboard/general-dashboard';
//import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
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

export default function Dashboard({
    vehicleStats,
    maintenanceStats,
    tripStats,
    serviceStats,
    personnelStats,
    activeVehicle,
    upcomingTrips,
    latestOdometerReading,
    nextMaintenance,
    notifications,
}) {
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

    const pendingRequests = {
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
                {console.log(activeVehicle, latestOdometerReading, nextMaintenance)}
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl">Information Relevant to You</h2>
                </div>
                <div className="flex flex-col gap-4 p-4 md:gap-8">
                    <div className="grid gap-6">
                        <div className="flex flex-col gap-4 md:flex-row">
                            <Card className="flex-1">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Current Vehicle</CardTitle>
                                    <CardDescription>Vehicle details and status</CardDescription>
                                </CardHeader>
                                {activeVehicle ? (
                                    <CardContent>
                                        <div className="grid gap-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-semibold">{activeVehicle.vehicle_name}</h3>
                                                <Badge variant={activeVehicle.status === 'available' ? 'success' : 'destructive'}>
                                                    {activeVehicle.status}
                                                </Badge>
                                            </div>
                                            <div className="text-muted-foreground text-sm">Asset tag: {activeVehicle.asset_tag}</div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-medium">Fuel Type</span>
                                                    <span>{activeVehicle.fuel_type}</span>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-medium">Passenger Capacity</span>
                                                    <span>{activeVehicle.capacity} Persons</span>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-medium">Odometer Reading</span>
                                                    <span className="flex items-center gap-1">
                                                        {latestOdometerReading?.reading}
                                                        <span className="text-muted-foreground text-xs">
                                                            due at: {nextMaintenance.next_service_km} km
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-medium">Next Maintenance</span>
                                                    <span>{nextMaintenance.scheduled_date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                ) : (
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm">You currently don't have any vehicle assigned to you.</p>
                                    </CardContent>
                                )}
                                {activeVehicle && (
                                    <CardFooter>
                                        <div className="flex w-full gap-2">
                                            <Button
                                                onClick={() => router.get(route('vehicles.show', activeVehicle.vehicle_id))}
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                            >
                                                View Vehicle
                                            </Button>
                                        </div>
                                    </CardFooter>
                                )}
                            </Card>
                            <Card className="flex-1">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Notifications</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-3">
                                        {notifications ? (
                                            notifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className={`rounded-lg border p-3 ${notification.read ? '' : 'bg-muted/50'}`}
                                                >
                                                    <div className="flex justify-between">
                                                        <h4 className="font-medium">{notification.title}</h4>
                                                        <span className="text-muted-foreground text-xs">{notification.time}</span>
                                                    </div>
                                                    <p className="mt-1 text-sm">{notification.message}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-muted-foreground text-sm">No new notifications</p>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="ghost" size="sm" className="w-full">
                                        View All Notifications
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>

                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-2xl">About Fleet</h2>
                    </div>
                    <GeneralDashboard
                        totalVehicles={totalVehicles}
                        todayTrips={todayTrips}
                        maintenanceDue={maintenanceDue}
                        pendingRequests={pendingRequests}
                        vehicleSummary={vehicleSummary}
                        personnelSummary={personnelSummary}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
