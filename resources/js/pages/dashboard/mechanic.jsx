import GeneralDashboard from '@/components/dashboard/general-dashboard';
import { format } from 'date-fns';
//import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
    uninspectedRequests,
    approvedRequests,
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
        { label: 'Maintenance or Repair', quantity: vehicleStats.underMaintenance || 0, fill: 'blue' },
        { label: 'Retired', quantity: vehicleStats.retired || 0, fill: 'red' },
    ];

    const personnelSummary = [
        { label: 'Drivers', quantity: personnelStats.driver || 0, fill: 'green' },
        { label: 'Mechanics', quantity: personnelStats.mechanic || 0, fill: 'yellow' },
        { label: 'Manager', quantity: personnelStats.manager || 0, fill: 'orange' },
    ];
    const formatDate = (date) => {
        const formattedDateTime = format(new Date(date), 'MMMM dd, yyyy');
        return formattedDateTime;
    };

    const print = () => {
        console.log('Printing');
        var element = document.getElementById('element-to-print');
        var opt = {
            margin: 1,
            filename: 'myfile.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };

        // New Promise-based usage:
        html2pdf(element);
    };

    const handleViewRequest = () => {};

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl px-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl">About Fleet</h2>
                </div>
                <div className="flex flex-col gap-4 p-4 md:gap-8">
                    <GeneralDashboard
                        totalVehicles={totalVehicles}
                        todayTrips={todayTrips}
                        maintenanceDue={maintenanceDue}
                        pendingRequests={pendingRequests}
                        vehicleSummary={vehicleSummary}
                        personnelSummary={personnelSummary}
                    />
                    <div className="grid gap-6">
                        <div className="flex flex-col gap-4 md:flex-row">
                            <Card className="flex-1">
                                <CardHeader className="pb-2">
                                    <CardTitle>Uninspected Requests</CardTitle>
                                    <CardDescription>Service requests that need to be inspected</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4">
                                        {uninspectedRequests.length === 0 ? (
                                            <div className="text-muted-foreground flex flex-col items-center justify-center py-8">
                                                <span className="text-lg font-medium">No uninspected requests found</span>
                                            </div>
                                        ) : (
                                            uninspectedRequests.map((request) => (
                                                <div key={`request-${request.request_id}`} className="rounded-lg border p-3">
                                                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="font-semibold">{request.work_description}</h3>
                                                                <Badge
                                                                    key={`badge-${request.id}`}
                                                                    variant={request.status === 'pending' ? 'outline' : 'secondary'}
                                                                >
                                                                    {request.status}
                                                                </Badge>
                                                            </div>
                                                            <div className="text-muted-foreground text-sm">{request.vehicle_name}</div>
                                                        </div>
                                                        <div className="mt-1 text-sm sm:mt-0 sm:text-right">
                                                            <div>{formatDate(request.date_filed)}</div>
                                                            <div className="text-muted-foreground">{`${request.status} at ${formatDate(request.updated_at)}`}</div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                router.get(
                                                                    route('request-inspections.create', {
                                                                        data: { requestId: request.request_id, vehicleId: request.vehicle_id },
                                                                    }),
                                                                );
                                                            }}
                                                        >
                                                            View Details
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="max-h-96 flex-1 overflow-y-auto">
                                <CardHeader className="pb-2">
                                    <CardTitle>Approved Requests</CardTitle>
                                    <CardDescription>Service requests that are ready for repair/maintenance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4">
                                        {approvedRequests.length === 0 ? (
                                            <div className="text-muted-foreground flex flex-col items-center justify-center py-8">
                                                <span className="mb-2 text-3xl">😢</span>
                                                <span className="text-lg font-medium">No approved requests found</span>
                                            </div>
                                        ) : (
                                            approvedRequests.map((request) => (
                                                <div key={`request-${request.request_id}`} className="rounded-lg border p-3">
                                                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="font-semibold">{request.work_description}</h3>
                                                                <Badge
                                                                    key={`badge-${request.id}`}
                                                                    variant={request.status === 'pending' ? 'outline' : 'secondary'}
                                                                >
                                                                    {request.status}
                                                                </Badge>
                                                            </div>
                                                            <div className="text-muted-foreground text-sm">{request.vehicle_name}</div>
                                                        </div>
                                                        <div className="mt-1 text-sm sm:mt-0 sm:text-right">
                                                            <div>{formatDate(request.date_filed)}</div>
                                                            <div className="text-muted-foreground">{`${request.status} at ${formatDate(request.updated_at)}`}</div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                if (request.service_type === 'repair') {
                                                                    router.get(
                                                                        route('repairs.create', {
                                                                            data: { requestId: request.request_id, vehicleId: request.vehicle_id },
                                                                        }),
                                                                    );
                                                                } else if (request.service_type === 'maintenance') {
                                                                    router.get(
                                                                        route('maintenance.create', {
                                                                            data: { requestId: request.request_id, vehicleId: request.vehicle_id },
                                                                        }),
                                                                    );
                                                                } else if (request.service_type === 'preventive') {
                                                                    router.get(
                                                                        route('preventive.create', {
                                                                            data: { requestId: request.request_id, vehicleId: request.vehicle_id },
                                                                        }),
                                                                    );
                                                                }
                                                            }}
                                                        >
                                                            View Details
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
