import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

import { DrillIcon, Truck, Users, WrenchIcon } from 'lucide-react';

import { DashboardCard } from '@/components/dashboard-card';
import { CalendarDateRangePicker } from '@/components/date-range-picker';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const vehiclePageData = {
    title: 'Vehicle Management',
    icon: Truck,
    description: 'Review and manage all vehicles in your fleet',
    stats: [
        {
            label: 'Available',
            value: '18',
        },
        {
            label: 'In use',
            value: '30',
        },
        {
            label: 'Out of service',
            value: '2',
        },
        {
            label: 'Total',
            value: '50',
        },
    ],
    linkHref: 'vehicles',
};

const maintenancePageData = {
    title: 'Maintenance Management',
    icon: DrillIcon,
    description: 'Track and schedule maintenance to ensure vehicle safety',
    stats: [
        {
            label: 'Pending',
            value: '12',
        },
        {
            label: 'Completed',
            value: '25',
        },
        {
            label: 'Scheduled',
            value: '5',
        },
        {
            label: 'Overdue',
            value: '2',
        },
    ],
    linkHref: 'vehicle-list',
};

const repairPageData = {
    title: 'Repair Logs/Overview',
    icon: WrenchIcon,
    description: 'Log and monitor repair histories and ongoing repair statuses for your vehicles',
    stats: [
        {
            label: 'Ongoing',
            value: '6',
        },
        {
            label: 'Completed',
            value: '18',
        },
        {
            label: 'Pending',
            value: '8',
        },
        {
            label: 'Total',
            value: '32',
        },
    ],
    linkHref: 'vehicle-list',
};

const personnelPageData = {
    title: 'Personnel Management',
    icon: Users,
    description: 'Oversee and manage personnel assignments and roles',
    stats: [
        {
            label: 'Active',
            value: '18',
        },
        {
            label: 'Available',
            value: '5',
        },
        {
            label: 'On leave',
            value: '2',
        },
        {
            label: 'Total',
            value: '25',
        },
    ],
    linkHref: 'vehicle-list',
};

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl">About Fleet</h2>
                    <CalendarDateRangePicker />
                </div>
                <div className="grid auto-rows-min gap-4 lg:grid-cols-2">
                    <DashboardCard pageData={vehiclePageData} />
                    <DashboardCard pageData={maintenancePageData} />
                    <DashboardCard pageData={repairPageData} />
                    <DashboardCard pageData={personnelPageData} />
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
