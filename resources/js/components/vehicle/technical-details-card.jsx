import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TechnicalDetailsCard({ vehicle }) {
    return (
        <div className="space-y-6 md:col-span-1">
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Technical Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-muted-foreground text-sm">Engine Number</p>
                            <p className="font-medium">{vehicle.engine_number}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Chassis Number</p>
                            <p className="font-medium">{vehicle.chassis_number}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Category</p>
                            <p className="font-medium">{vehicle.category}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Year Acquired</p>
                            <p className="font-medium">{vehicle.year_acquired}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Fuel Type</p>
                            <p className="font-medium">{vehicle.fuel_type}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Vehicle Type</p>
                            <p className="font-medium">{vehicle.vehicle_type}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
