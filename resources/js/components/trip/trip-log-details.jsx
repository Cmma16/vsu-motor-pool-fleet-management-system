import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { router, usePage } from '@inertiajs/react';
import { Calendar, Clock, Edit3, Fuel, Gauge, HeartPulse } from 'lucide-react';

export default function TripLogDetails({ pre_trip, post_trip, trip_log_id, trip_status }) {
    const user = usePage().props.auth.user;
    return (
        <Card className="border border-blue-100 bg-white">
            <CardHeader className="flex flex-row items-center justify-between border-b border-blue-100">
                <div>
                    <CardTitle>Pre-Trip Inspection</CardTitle>
                    <CardDescription>Vehicle condition and inspection before the trip</CardDescription>
                </div>
                {user.role.name === 'Driver' && trip_status === 'completed' && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.get(route('trip-logs.edit', { trip_log_id }))}
                        className="border-green-200 hover:bg-green-50 hover:text-green-700"
                    >
                        <Edit3 className="mr-2 h-4 w-4 text-green-600" />
                        Edit
                    </Button>
                )}
            </CardHeader>
            <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <div className="flex flex-row gap-3 rounded-lg border border-blue-100/50 bg-blue-50/30 p-3">
                        <Calendar className="h-6 w-6 text-blue-600" />
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-blue-700/80">Date Received</p>
                            <p className="text-lg font-semibold text-blue-900">{pre_trip.received_at}</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3 rounded-lg border border-green-100/50 bg-green-50/30 p-3">
                        <Fuel className="h-6 w-6 text-green-600" />
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-green-700/80">Fuel/Lubricant Issued</p>
                            <p className="text-lg font-semibold text-green-900">{pre_trip.fuel_lubricant_issued_at}</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3 rounded-lg border border-purple-100/50 bg-purple-50/30 p-3">
                        <Clock className="h-6 w-6 text-purple-600" />
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-purple-700/80">Departure Time</p>
                            <p className="text-lg font-semibold text-purple-900 capitalize">{pre_trip.departure_time}</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3 rounded-lg border border-amber-100/50 bg-amber-50/30 p-3">
                        <Gauge className="h-6 w-6 text-amber-600" />
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-amber-700/80">Odometer Out</p>
                            <p className="text-lg font-semibold text-amber-900">{pre_trip.odometer_out} km</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3 rounded-lg border border-rose-100/50 bg-rose-50/30 p-3">
                        <HeartPulse className="h-6 w-6 text-rose-600" />
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-rose-700/80">Vehicle Condition (Before Trip)</p>
                            <p className="text-lg font-semibold text-rose-900 capitalize">{pre_trip.pre_trip_condition}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
            {post_trip.arrival_time !== null && (
                <>
                    <CardHeader className="flex flex-row items-center justify-between border-b border-emerald-100">
                        <div>
                            <CardTitle>Post-Trip Inspection</CardTitle>
                            <CardDescription>Vehicle condition and inspection after the trip</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                            <div className="flex flex-row gap-3 rounded-lg border border-emerald-100/50 bg-emerald-50/30 p-3">
                                <Calendar className="h-6 w-6 text-emerald-600" />
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-medium text-emerald-700/80">Date Returned</p>
                                    <p className="text-lg font-semibold text-emerald-900">{post_trip.date_returned}</p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-3 rounded-lg border border-teal-100/50 bg-teal-50/30 p-3">
                                <Fuel className="h-6 w-6 text-teal-600" />
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-medium text-teal-700/80">Fuel/Lubricant Balanced</p>
                                    <p className="text-lg font-semibold text-teal-900">{post_trip.fuel_lubricant_balanced_at}</p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-3 rounded-lg border border-indigo-100/50 bg-indigo-50/30 p-3">
                                <Clock className="h-6 w-6 text-indigo-600" />
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-medium text-indigo-700/80">Arrival Time</p>
                                    <p className="text-lg font-semibold text-indigo-900 capitalize">{post_trip.arrival_time}</p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-3 rounded-lg border border-cyan-100/50 bg-cyan-50/30 p-3">
                                <Gauge className="h-6 w-6 text-cyan-600" />
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-medium text-cyan-700/80">Odometer In</p>
                                    <p className="text-lg font-semibold text-cyan-900">{post_trip.odometer_in} km</p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-3 rounded-lg border border-violet-100/50 bg-violet-50/30 p-3">
                                <HeartPulse className="h-6 w-6 text-violet-600" />
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-medium text-violet-700/80">Vehicle Condition (After Trip)</p>
                                    <p className="text-lg font-semibold text-violet-900 capitalize">{post_trip.post_trip_condition}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </>
            )}
        </Card>
    );
}
