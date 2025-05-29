import { DashboardCard } from '@/components/dashboard-card';
import { DashboardChartCard } from '@/components/dashboard-chart-card';
//import AdminDashboard from '@/components/dashboard/admin-dashboard';
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

const totalVehicles = {
    title: 'Total Vehicles',
    value: 42,
    description: 'as of this month',
    icon: Car,
};

const todayTrips = {
    title: "Today's Trips",
    value: 10,
    description: 'trips in progress',
    icon: MapPin,
};

const maintenanceDue = {
    title: 'Maintenance Due',
    value: 5,
    description: 'urgent, scheduled',
    icon: AlertTriangle,
};

const pendingRequests = {
    title: 'Pending Service Requests',
    value: 7,
    description: 'requests pending approval',
    icon: Package,
};

const upcomingMaintenancePlans = [];

const lowStockParts = [];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl">About Fleet</h2>
                </div>
                <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <DashboardCard cardData={totalVehicles} />
                        <DashboardCard cardData={todayTrips} />
                        <DashboardCard cardData={maintenanceDue} />
                        <DashboardCard cardData={pendingRequests} />
                    </div>
                    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
                        <DashboardChartCard
                            className=""
                            title="Vehicles Summary"
                            data={[
                                { label: 'Available', quantity: 29, fill: 'green' },
                                { label: 'In Use', quantity: 15, fill: 'yellow' },
                                { label: 'Maintenance or Repair', quantity: 4, fill: 'blue' },
                                { label: 'Retired', quantity: 2, fill: 'red' },
                            ]}
                            config={{
                                available: { label: 'Available', color: 'green' },
                                inUse: { label: 'In Use', color: 'yellow' },
                                maintenance: { label: 'Maintenance or Repair', color: 'blue' },
                                retired: { label: 'Retired', color: 'red' },
                            }}
                            totalLabel="Total Vehicles"
                        />
                        <DashboardChartCard
                            title="Employee Summary"
                            data={[
                                { label: 'Drivers', quantity: 34, fill: 'green' },
                                { label: 'Mechanics', quantity: 14, fill: 'yellow' },
                                { label: 'Manager', quantity: 12, fill: 'orange' },
                            ]}
                            config={{
                                active: { label: 'On duty', color: 'hsl(var(--chart-1))' },
                                inactive: { label: 'Off Duty', color: 'hsl(var(--chart-2))' },
                            }}
                            totalLabel="Total Employees"
                        />
                    </div>
                    <AdminDashboard upcomingMaintenancePlans={upcomingMaintenancePlans} lowStockParts={lowStockParts} />
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min"></div>
            </div>
        </AppLayout>
    );
}
