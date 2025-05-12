import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Car, Search } from 'lucide-react';

export function VehicleSelector({ vehicles, selectedVehicle, setSelectedVehicle }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Select Vehicle</CardTitle>
                <CardDescription>Choose a vehicle to view its odometer logs</CardDescription>
            </CardHeader>
            <CardContent className="">
                <div className="space-y-4">
                    <div className="relative">
                        <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                        <Input placeholder="Search vehicles..." className="pl-8" />
                    </div>

                    <div className="space-y-2 overflow-y-auto md:max-h-[60vh]">
                        {vehicles.map((vehicle) => (
                            <div
                                key={vehicle.vehicle_id}
                                className={`hover:bg-muted flex cursor-pointer items-center rounded-md border p-2 ${
                                    selectedVehicle?.vehicle_id === vehicle.vehicle_id
                                        ? 'border-primary bg-primary/5'
                                        : 'hover:border-border border-transparent'
                                }`}
                                onClick={() => setSelectedVehicle(vehicle)}
                            >
                                <Car
                                    className={`mr-2 h-4 w-4 ${
                                        selectedVehicle?.vehicle_id === vehicle.vehicle_id ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                                />
                                <div>
                                    <p className={`text-sm font-medium ${selectedVehicle?.vehicle_id === vehicle.vehicle_id ? 'text-primary' : ''}`}>
                                        {vehicle.vehicle_name}
                                    </p>
                                    <p className="text-muted-foreground text-xs">{vehicle.plate_number}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
