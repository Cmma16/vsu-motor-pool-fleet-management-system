import TripInfoCard from '@/components/trip/trip-info-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Loader2 } from 'lucide-react';
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
    title: 'Create Trip Log',
    description: 'Create a new trip log for a trip.',
};

const vehicleConditions = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' },
];

export default function CreateTripLog({ trip }) {
    const { data, setData, post, errors, processing, reset } = useForm({
        trip_id: trip.trip_id,
        received_at: '',
        departure_time_actual: '',
        odometer_out: trip.vehicle?.latest_odometer?.odometer_id || '',
        odometer_reading: trip.vehicle?.latest_odometer?.reading || 0,
        pre_trip_condition: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // If the odometer reading is different from the latest, we'll send both values
        // The backend will handle creating a new odometer log if needed
        const formData = {
            ...data,
            // If the reading is the same as the latest, we just send the odometer_out ID
            // If it's different, we send both and the backend will create a new odometer log
            odometer_reading: data.odometer_reading !== trip.vehicle?.latest_odometer?.reading ? data.odometer_reading : undefined,
        };

        post(route('trip-logs.store'), formData, {
            onSuccess: () => {
                toast.success('Trip log created successfully');
                reset();
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
                toast.error('Failed to create trip log. Please check the form for errors.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} pageDetails={pageDetails}>
            <Head title="Create Trip Log" />
            <Button
                variant="outline"
                className="m-4 w-full bg-white hover:bg-gray-50 sm:w-auto"
                onClick={() => router.get(route('trips.show', trip.trip_id))}
            >
                <ArrowLeft className="mr-2 h-4 w-4" /> Trip Details
            </Button>

            <div className="grid gap-6 px-4 pb-4 lg:grid-cols-2">
                <TripInfoCard trip={trip} />

                <Card className="shadow-sm">
                    <CardHeader className="">
                        <CardTitle className="text-lg">Pre-Trip Information</CardTitle>
                        <CardDescription>Record vehicle condition and trip details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-2 sm:grid-cols-2">
                                <div className="">
                                    <Label htmlFor="received_at" className="text-sm font-medium">
                                        Received At (Date) <span className="text-red-500">*</span>
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
                                    <Label htmlFor="departure_time_actual" className="text-sm font-medium">
                                        Departure Time (Actual) <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        type="time"
                                        id="departure_time_actual"
                                        value={data.departure_time_actual}
                                        onChange={(e) => setData('departure_time_actual', e.target.value)}
                                        className="w-full"
                                        required
                                    />
                                    {errors.departure_time_actual && <p className="mt-1 text-xs text-red-500">{errors.departure_time_actual}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="odometer_out" className="text-sm font-medium">
                                        Odometer Reading (Out) <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        type="number"
                                        id="odometer_reading"
                                        value={data.odometer_reading}
                                        onChange={(e) => {
                                            setData('odometer_reading', e.target.value);
                                            // If the reading is different from the latest, we'll create a new odometer log
                                            // and the controller will handle updating odometer_out with the new ID
                                        }}
                                        className="w-full"
                                        min={trip.vehicle?.latest_odometer?.reading || 0}
                                        placeholder={
                                            trip.vehicle?.latest_odometer?.reading
                                                ? `Last: ${trip.vehicle.latest_odometer.reading} km`
                                                : 'Enter reading'
                                        }
                                    />
                                    {errors.odometer_out && <p className="mt-1 text-xs text-red-500">{errors.odometer_out}</p>}
                                </div>

                                <div className="col-span-full space-y-2">
                                    <Label className="text-sm font-medium">
                                        Vehicle Condition (Before Trip) <span className="text-red-500">*</span>
                                    </Label>
                                    <RadioGroup
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

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                                    {processing ? (
                                        <span className="flex items-center">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Processing...
                                        </span>
                                    ) : (
                                        'Record'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
