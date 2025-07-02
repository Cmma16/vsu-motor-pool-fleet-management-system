import { MetricsCard } from '@/components/report/metrics-card';
import { TripChart } from '@/components/report/trip-chart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { CalendarIcon, Car, FilterIcon, MapPin, Trophy, Wrench } from 'lucide-react';
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

export default function ReportsIndex({ tripData, metrics }) {
    const { vehicles, filters } = usePage().props;
    const { data, setData, get } = useForm({
        start_date: filters?.start_date || '',
        end_date: filters?.end_date || '',
        month: filters?.month || '',
        year: filters?.year || '',
        vehicle_ids: filters?.vehicle_ids || [],
    });

    const handleFilter = (e) => {
        e.preventDefault();
        get(route('reports.index'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Filter successfully applied');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Reports" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
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
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="month">Month</Label>
                                <Select value={data.month} onValueChange={(value) => setData('month', value)}>
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
                                <Select value={data.year} onValueChange={(value) => setData('year', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {years.map((year) => (
                                            <SelectItem key={year.value} value={year.value}>
                                                {year.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="col-span-full flex justify-end">
                                <Button type="submit" className="w-full md:w-auto">
                                    Apply Filters
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Charts Section */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <div className="col-span-full">
                        <TripChart
                            tripData={tripData}
                            barKey={'total_trips'}
                            xKey={'vehicle_name'}
                            chartTitle={'Trips by Vehicle'}
                            chartDescription={'Number of completed trips per vehicle'}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
