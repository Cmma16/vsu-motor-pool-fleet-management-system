import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function BasicInfoCard({ vehicle }) {
    return (
        <div className="space-y-6 md:col-span-1">
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Basic Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-muted-foreground text-sm">Asset Tag</p>
                            <p className="font-medium">{vehicle.asset_tag}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Plate Number</p>
                            <p className="font-medium">{vehicle.plate_number}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Brand</p>
                            <p className="font-medium">{vehicle.brand}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Model</p>
                            <p className="font-medium">{vehicle.model}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Location</p>
                            <p className="font-medium">{vehicle.location}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Capacity</p>
                            <p className="font-medium">{vehicle.capacity}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
