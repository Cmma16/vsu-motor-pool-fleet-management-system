import { MetricsCard } from '@/components/report/metrics-card';
import PartsInventoryChart from '@/components/report/part-inventory-chart';
import { TripChart } from '@/components/report/trip-chart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { CalendarIcon, Car, FilterIcon, MapPin, Trophy, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs = [
    {
        title: 'Reports',
        href: '/reports',
    },
];

const pageDetails = {
    title: 'Fleet Analytics',
    description: 'Comprehensive analytics and insights about your fleet operations.',
};

// Generate month options
const months = [
    { value: '0', label: 'All month' },
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
];

// Generate year options (current year and 5 years back)
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 6 }, (_, i) => ({
    value: (currentYear - i).toString(),
    label: (currentYear - i).toString(),
}));

// Report types configuration
const REPORT_TYPES = {
    trip: {
        label: 'Trip Analytics',
        chartTitle: 'Trips by Vehicle',
        chartDescription: 'Number of completed trips per vehicle',
        barKey: 'total',
        xKey: 'vehicle_name',
        reportType: 'Trips',
    },
    repair: {
        label: 'Repair Analytics',
        chartTitle: 'Repairs by Vehicle',
        chartDescription: 'Number of repairs conducted per vehicle',
        barKey: 'total',
        xKey: 'vehicle_name',
        reportType: 'Repairs',
    },
    // Add more report types here in the future

    preventive: {
        label: 'Preventive Maintenance Analytics',
        chartTitle: 'Preventive Maintenance by Vehicle',
        chartDescription: 'Number of preventive maintenance services per vehicle',
        barKey: 'total',
        xKey: 'vehicle_name',
        reportType: 'Preventive',
    },
};

export default function FleetAnalytics({ resultData, metrics, parts }) {
    const { vehicles, filters } = usePage().props;
    const { data, setData, get, processing } = useForm({
        start_date: filters?.start_date || '',
        end_date: filters?.end_date || '',
        month: filters?.month || '',
        year: filters?.year || '',
        vehicle_ids: filters?.vehicle_ids || [],
        report_type: filters?.report_type || '',
    });

    const [hasChanges, setHasChanges] = useState(false);
    const currentReportType = REPORT_TYPES[filters?.report_type] || REPORT_TYPES.trip;

    // Compare current form data with initial filters
    useEffect(() => {
        const hasFormChanges =
            data.start_date !== (filters?.start_date || '') ||
            data.end_date !== (filters?.end_date || '') ||
            data.month !== (filters?.month || '') ||
            data.year !== (filters?.year || '') ||
            data.report_type !== (filters?.report_type || '');

        setHasChanges(hasFormChanges);
    }, [data, filters]);

    const handleFilter = (e) => {
        e.preventDefault();
        get(route('reports.fleet'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Filter successfully applied');
                setHasChanges(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Reports" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                {/* Metrics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <MetricsCard title="Total Trips" value={metrics.total_trips} description="Total number of trips completed" icon={MapPin} />
                    <MetricsCard title="Total Vehicles" value={metrics.total_vehicles} description="Total number of vehicles in fleet" icon={Car} />
                    <MetricsCard
                        title="Service Requests"
                        value={metrics.total_requests}
                        description="Total number of service requests"
                        icon={Wrench}
                    />
                    <MetricsCard
                        title="Most Active Vehicle"
                        value={metrics.most_active_vehicle.name}
                        description={`${metrics.most_active_vehicle.trips} trips completed`}
                        icon={Trophy}
                    />
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white p-3 lg:col-span-4">
                    <Label htmlFor="report_type">Report Type</Label>
                    <Select id="report_type" value={data.report_type} onValueChange={(value) => setData('report_type', value)} disabled={processing}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(REPORT_TYPES).map(([value, config]) => (
                                <SelectItem key={value} value={value}>
                                    {config.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Filters Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <FilterIcon className="h-5 w-5" />
                            <CardTitle>Filter Reports</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFilter} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div className="space-y-2">
                                <Label htmlFor="start_date">Start Date</Label>
                                <div className="relative">
                                    <CalendarIcon className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        className="pl-9"
                                        disabled={processing}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="end_date">End Date</Label>
                                <div className="relative">
                                    <CalendarIcon className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                                    <Input
                                        id="end_date"
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        className="pl-9"
                                        disabled={processing}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="month">Month</Label>
                                <Select value={data.month} onValueChange={(value) => setData('month', value)} disabled={processing}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select month" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {months.map((month) => (
                                            <SelectItem key={month.value} value={month.value}>
                                                {month.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="year">Year</Label>
                                <Select value={data.year} onValueChange={(value) => setData('year', value)} disabled={processing}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem key="0" value="0">
                                            All Years
                                        </SelectItem>
                                        {years.map((year) => (
                                            <SelectItem key={year.value} value={year.value}>
                                                {year.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="col-span-full flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.get('/reports/fleet-analytics')}
                                    className="w-full md:w-auto"
                                    disabled={processing}
                                >
                                    Reset Filters
                                </Button>
                                <Button type="submit" className="w-full md:w-auto" disabled={processing || !hasChanges}>
                                    {processing ? 'Applying...' : 'Apply Filters'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Charts Section */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <div className="col-span-full">
                        <TripChart
                            tripData={resultData}
                            barKey={currentReportType.barKey}
                            xKey={currentReportType.xKey}
                            report_type={currentReportType.reportType}
                            chartTitle={currentReportType.chartTitle}
                            chartDescription={currentReportType.chartDescription}
                        />
                    </div>
                </div>
                <PartsInventoryChart parts={parts} />

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-4">
                        <h4 className="font-semibold text-green-600">Well Stocked</h4>
                        <p className="text-2xl font-bold">{parts.filter((part) => part.current_stock > part.restock_threshold).length}</p>
                        <p className="text-muted-foreground text-sm">parts above threshold</p>
                    </div>

                    <div className="rounded-lg border p-4">
                        <h4 className="font-semibold text-red-600">Need Restocking</h4>
                        <p className="text-2xl font-bold">{parts.filter((part) => part.current_stock <= part.restock_threshold).length}</p>
                        <p className="text-muted-foreground text-sm">parts below threshold</p>
                    </div>

                    <div className="rounded-lg border p-4">
                        <h4 className="font-semibold text-blue-600">Total Parts</h4>
                        <p className="text-2xl font-bold">{parts.length}</p>
                        <p className="text-muted-foreground text-sm">in inventory</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
