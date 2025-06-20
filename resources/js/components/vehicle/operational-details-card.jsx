import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

export function OperationalDetailsCard({ vehicle, odometer_reading }) {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'available':
                return <Badge className="bg-green-500 text-sm">Available</Badge>;
            case 'in use':
                return <Badge className="bg-blue-500">In Use</Badge>;
            case 'under maintenance':
                return <Badge className="bg-yellow-500 text-black">Under Maintenance</Badge>;
            case 'retired':
                return <Badge className="bg-gray-500">Retired</Badge>;
            default:
                return <Badge>Unknown</Badge>;
        }
    };
    return (
        <div className="space-y-6 md:col-span-1">
            <Card className="h-full">
                {console.log(vehicle, odometer_reading)}
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Operational Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                {odometer_reading ? (
                                    <>
                                        <p className="text-muted-foreground mb-1 text-sm">Current Reading</p>
                                        <p className="mb-2 text-lg font-medium">{odometer_reading.reading} km</p>
                                    </>
                                ) : (
                                    <div className="text-muted-foreground my-4.5">No odometer log available for this vehicle yet.</div>
                                )}
                                {/* <OdometerLogModal vehicle_id={vehicle.vehicle_id} vehicles={vehicle} formType="add" /> */}
                            </div>
                            <div className="space-y-1">
                                {odometer_reading ? (
                                    <p className="text-muted-foreground text-xs">
                                        Updated {formatDistanceToNow(new Date(odometer_reading.updated_at), { addSuffix: true })}
                                    </p>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground mb-2 text-sm">Current Status</p>
                                <p className="font-medium">{getStatusBadge(vehicle.status)}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-muted-foreground text-xs">
                                    Updated {formatDistanceToNow(new Date(vehicle.updated_at), { addSuffix: true })}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
