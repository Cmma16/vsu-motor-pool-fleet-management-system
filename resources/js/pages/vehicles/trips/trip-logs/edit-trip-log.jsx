import { EditOdometerDialog } from '@/components/odometer/edit-odometer-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

const breadcrumbs = [
    {
        title: 'Trips',
        href: '/vehicles/trips',
    },
    {
        title: 'Trip Logs',
        href: 'vehicles/trips/trip-logs',
    },
];

const pageDetails = {
    title: 'Edit Trip Log',
    description: 'Edit the trip log of the selected trip.',
};

const vehicleConditions = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' },
];

export default function EditTripLog({ tripLog, trip }) {
    const { data, setData, put, errors, processing } = useForm({
        trip_id: tripLog.trip_id,
        received_at: tripLog.received_at || '',
        pre_trip_condition: tripLog.pre_trip_condition?.toLowerCase() || '',
        departure_time_actual: tripLog.departure_time_actual || '',
        odometer_out: tripLog.odometerOut?.odometer_id,
        odometer_out_reading: tripLog.odometerOut?.reading || 0,
        date_returned: tripLog.date_returned || '',
        post_trip_condition: tripLog.post_trip_condition?.toLowerCase() || '',
        arrival_time: tripLog.arrival_time || '',
        odometer_in: tripLog.odometerIn?.odometer_id,
        odometer_in_reading: tripLog.odometerIn?.reading || 0,
    });

    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
    const [editingLog, setEditingLog] = React.useState(null);

    const editOdometerReading = (odometerLog) => {
        setEditingLog(odometerLog);
        setIsEditDialogOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submission started');
        console.log('Current form data:', data);
        console.log('Form validation state:', Object.keys(errors).length > 0 ? errors : 'No validation errors');

        const submitData = { ...data };
        delete submitData.odometer_out_reading;
        delete submitData.odometer_in_reading;

        console.log('Submitting data to server:', submitData);
        console.log('Route being called:', route('trip-logs.update', tripLog.trip_log_id));

        put(route('trip-logs.update', tripLog.trip_log_id), submitData, {
            onSuccess: () => {
                console.log('Submission successful');
                toast.success('Trip log updated successfully');
            },
            onError: (errors) => {
                console.log('Submission failed with errors:', errors);
                toast.error('Failed to update trip log');
                console.log('Validation errors:', errors);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Complete Trip Log" />

            <div className="space-y-6 px-4 pb-6">
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        className="w-full bg-white hover:bg-gray-50 sm:w-auto"
                        onClick={() => router.get(route('trips.show', trip.trip_id))}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trip Details
                    </Button>
                </div>

                <EditOdometerDialog isOpen={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} editingLog={editingLog} vehicles={[trip.vehicle]} />
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Pre-Trip Section */}
                        <Card className="shadow-sm">
                            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                                <div className="flex items-center gap-2">
                                    <div>
                                        <CardTitle className="text-lg">Pre-Trip Information</CardTitle>
                                        <CardDescription>Record vehicle condition and details before the trip</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="received_at" className="text-sm font-medium">
                                                Date Received <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                type="date"
                                                id="received_at"
                                                value={data.received_at}
                                                onChange={(e) => setData('received_at', e.target.value)}
                                                className="w-full"
                                                required
                                            />
                                            {errors.received_at && <p className="mt-1 text-xs text-red-500">{errors.received_at}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="departure_time" className="text-sm font-medium">
                                                Departure Time <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                type="time"
                                                id="departure_time_actual"
                                                value={data.departure_time_actual}
                                                onChange={(e) => setData('departure_time_actual', e.target.value)}
                                                className="w-full"
                                                required
                                            />
                                            {errors.departure_time_actual && (
                                                <p className="mt-1 text-xs text-red-500">{errors.departure_time_actual}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="odometer_out_reading" className="text-sm font-medium">
                                                Odometer Reading (Out) <span className="text-red-500">*</span>
                                            </Label>
                                            <div className="flex flex-row gap-2">
                                                <Input
                                                    type="number"
                                                    id="odometer_out_reading"
                                                    value={data.odometer_out_reading}
                                                    onChange={(e) => setData('odometer_out_reading', e.target.value)}
                                                    disabled
                                                    className="disabled:bg-gray-500 disabled:opacity-100"
                                                />
                                                <Button variant="outline" type="button" onClick={() => editOdometerReading(tripLog.odometerOut)}>
                                                    Edit
                                                </Button>
                                            </div>
                                            {errors.odometer_out && <p className="mt-1 text-xs text-red-500">{errors.odometer_out}</p>}
                                        </div>

                                        <div className="col-span-full space-y-3">
                                            <Label className="text-sm font-medium">
                                                Vehicle Condition (Before Trip) <span className="text-red-500">*</span>
                                            </Label>
                                            <RadioGroup
                                                defaultValue={data.pre_trip_condition}
                                                value={data.pre_trip_condition}
                                                onValueChange={(value) => setData('pre_trip_condition', value)}
                                                className="grid grid-cols-2 gap-4 sm:grid-cols-4"
                                                required
                                            >
                                                {vehicleConditions.map((condition) => (
                                                    <div key={condition.value} className="flex items-center space-x-2">
                                                        <RadioGroupItem
                                                            value={condition.value}
                                                            id={`pre-trip-${condition.value}`}
                                                            className="border-gray-300 text-emerald-600 focus:ring-emerald-600"
                                                        />
                                                        <Label htmlFor={`pre-trip-${condition.value}`} className="text-sm font-normal">
                                                            {condition.label}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                            {errors.pre_trip_condition && <p className="text-xs text-red-500">{errors.pre_trip_condition}</p>}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Post-Trip Section */}
                        <Card className="shadow-sm">
                            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                                <div className="flex items-center gap-2">
                                    <div>
                                        <CardTitle className="text-lg">Post-Trip Information</CardTitle>
                                        <CardDescription>Record vehicle condition and details after the trip</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="date_returned" className="text-sm font-medium">
                                                Date Returned <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                type="date"
                                                id="date_returned"
                                                value={data.date_returned}
                                                onChange={(e) => setData('date_returned', e.target.value)}
                                                className="w-full"
                                                required
                                            />
                                            {errors.date_returned && <p className="mt-1 text-xs text-red-500">{errors.date_returned}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="arrival_time" className="text-sm font-medium">
                                                Arrival Time <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                type="time"
                                                id="arrival_time"
                                                value={data.arrival_time}
                                                onChange={(e) => setData('arrival_time', e.target.value)}
                                                className="w-full"
                                                required
                                            />
                                            {errors.arrival_time && <p className="mt-1 text-xs text-red-500">{errors.arrival_time}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="odometer_in_reading" className="text-sm font-medium">
                                                Odometer Reading (In) <span className="text-red-500">*</span>
                                            </Label>
                                            <div className="flex flex-row gap-2">
                                                <Input
                                                    type="number"
                                                    id="odometer_in_reading"
                                                    value={data.odometer_in_reading}
                                                    onChange={(e) => setData('odometer_in_reading', e.target.value)}
                                                    disabled
                                                    className="disabled:bg-gray-500 disabled:opacity-100"
                                                />
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    type="button"
                                                    onClick={() => editOdometerReading(tripLog.odometerIn)}
                                                >
                                                    Edit
                                                </Button>
                                            </div>
                                            {errors.odometer_in && <p className="mt-1 text-xs text-red-500">{errors.odometer_in}</p>}
                                        </div>

                                        <div className="col-span-full space-y-3">
                                            <Label className="text-sm font-medium">
                                                Vehicle Condition (After Trip) <span className="text-red-500">*</span>
                                            </Label>
                                            <RadioGroup
                                                defaultValue={data.post_trip_condition}
                                                value={data.post_trip_condition}
                                                onValueChange={(value) => setData('post_trip_condition', value)}
                                                className="grid grid-cols-2 gap-4 sm:grid-cols-4"
                                                required
                                            >
                                                {vehicleConditions.map((condition) => (
                                                    <div key={condition.value} className="flex items-center space-x-2">
                                                        <RadioGroupItem
                                                            value={condition.value}
                                                            id={`post-trip-${condition.value}`}
                                                            className="border-gray-300 text-emerald-600 focus:ring-emerald-600"
                                                        />
                                                        <Label htmlFor={`post-trip-${condition.value}`} className="text-sm font-normal">
                                                            {condition.label}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                            {errors.post_trip_condition && <p className="text-xs text-red-500">{errors.post_trip_condition}</p>}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Save Button - Now outside both cards */}
                    <div className="mt-6 flex justify-end">
                        <Button type="submit" disabled={processing} className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-auto">
                            {processing ? (
                                <span className="flex items-center">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </span>
                            ) : (
                                'Save changes'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
