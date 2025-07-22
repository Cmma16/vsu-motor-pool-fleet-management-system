import { DataTable } from '@/components/data-table';
import { MaintenanceReportsColumn } from '@/components/report/maintenance-reports-column';
import { TripReportsColumn } from '@/components/report/trip-reports-column';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { BarChart3, FileText, Search, TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs = [
    {
        title: 'Reports',
        href: '/reports',
    },
];

const pageDetails = {
    title: 'Vehicle Analytics',
    description: 'Generate detailed reports about the vehicles in your fleet.',
};

export default function DetailedReport({ vehicles, resultData }) {
    const { filters } = usePage().props;
    const { data, setData, get, processing } = useForm({
        start_date: filters.start_date || '',
        end_date: filters.end_date || '',
        vehicle_ids: (filters.vehicle_ids || []).map(Number),
        report_type: filters.report_type || '',
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [reportGenerated, setReportGenerated] = useState(false);

    useEffect(() => {
        if (Array.isArray(resultData) && resultData.length > 0) {
            setReportGenerated(true);
        }
    }, [resultData]);

    const generateReport = (e) => {
        e.preventDefault();
        get(route('reports.detailed'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Report Generated');
                setReportGenerated(true);
            },
        });
    };

    const viewTripDetails = (id) => {
        router.get(route('trips.show', { id }));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Reports" />
            <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-4">
                {/* Report Configuration */}
                <div className="space-y-6 lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Report Configuration</CardTitle>
                            <CardDescription>Configure your report parameters</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Vehicle Selection */}
                            <div className="space-y-3">
                                <Label className="text-sm font-medium">Select Vehicles</Label>

                                {/* Search Input */}
                                <div className="relative">
                                    <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                                    <Input
                                        placeholder="Search vehicles..."
                                        className="pl-8"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <div className="max-h-48 space-y-2 overflow-y-auto">
                                    {vehicles
                                        .filter(
                                            (vehicle) =>
                                                vehicle.vehicle_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                vehicle.plate_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                vehicle.asset_tag.toLowerCase().includes(searchQuery.toLowerCase()),
                                        )
                                        .map((vehicle) => (
                                            <div key={vehicle.vehicle_id} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={vehicle.vehicle_id}
                                                    checked={data.vehicle_ids.includes(vehicle.vehicle_id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setData('vehicle_ids', [...data.vehicle_ids, vehicle.vehicle_id]);
                                                        } else {
                                                            setData(
                                                                'vehicle_ids',
                                                                data.vehicle_ids.filter((vId) => vId !== vehicle.vehicle_id),
                                                            );
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor={vehicle.vehicle_id} className="cursor-pointer text-sm">
                                                    <div>
                                                        <p className="font-medium">{vehicle.vehicle_name}</p>
                                                        <p className="text-muted-foreground text-xs">{vehicle.plate_number}</p>
                                                    </div>
                                                </Label>
                                            </div>
                                        ))}
                                    {vehicles.filter(
                                        (vehicle) =>
                                            vehicle.vehicle_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            vehicle.plate_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            vehicle.asset_tag.toLowerCase().includes(searchQuery.toLowerCase()),
                                    ).length === 0 &&
                                        searchQuery && (
                                            <div className="text-muted-foreground py-4 text-center text-sm">
                                                No vehicles found matching "{searchQuery}"
                                            </div>
                                        )}
                                </div>
                            </div>

                            {/* Date Range */}
                            <div className="space-y-3">
                                <Label className="text-sm font-medium">Date Range</Label>
                                <div className="space-y-2">
                                    <div>
                                        <Label htmlFor="start-date" className="text-muted-foreground text-xs">
                                            Start Date
                                        </Label>
                                        <Input
                                            id="start-date"
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="end-date" className="text-muted-foreground text-xs">
                                            End Date
                                        </Label>
                                        <Input
                                            id="end-date"
                                            type="date"
                                            min={data.start_date ? format(data.start_date, 'yyyy-MM-dd') : ''}
                                            value={data.end_date}
                                            onChange={(e) => setData('end_date', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Report Type */}
                            <div className="space-y-3">
                                <Label className="text-sm font-medium">Report Type</Label>
                                <Select value={data.report_type} onValueChange={(value) => setData('report_type', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={'Select report type'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="trips">Trips</SelectItem>
                                        <SelectItem value="repair">Repairs</SelectItem>
                                        <SelectItem value="maintenance">Maintenance</SelectItem>
                                        <SelectItem value="all">All maintenance and repairs</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Generate Button */}
                            <Button
                                onClick={generateReport}
                                disabled={!data.start_date || !data.end_date || !data.vehicle_ids || !data.report_type}
                                className="w-full"
                            >
                                <BarChart3 className="mr-2 h-4 w-4" />
                                Generate Report
                            </Button>
                            <Button
                                onClick={() => router.get('/reports/detailed-report')}
                                className="w-full border-1 border-red-700 bg-white text-red-700 hover:bg-red-700 hover:text-white"
                            >
                                <TrashIcon className="mr-2 h-4 w-4" />
                                Clear
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                {/* Report Results */}
                <div className="space-y-6 lg:col-span-3">
                    {!reportGenerated ? (
                        <Card>
                            <CardContent className="flex h-96 items-center justify-center">
                                <div className="text-center">
                                    <FileText className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                    <h3 className="mb-2 text-lg font-medium">No Report Generated</h3>
                                    <p className="text-muted-foreground">
                                        Configure your report parameters and click "Generate Report" to view results.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            {/* Report Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Vehicle Report Details</CardTitle>
                                    <CardDescription>
                                        Showing {resultData.length} {data.report_type === 'trips' ? 'trip' : 'maintenance'} records from{' '}
                                        {data.start_date} to {data.end_date}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {filters.report_type === 'trips' ? (
                                        <DataTable columns={TripReportsColumn} data={resultData} handleView={viewTripDetails} />
                                    ) : (
                                        <DataTable columns={MaintenanceReportsColumn} data={resultData} />
                                    )}
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
