import { DisplayTable } from '@/components/display-table'; // adjust path if needed
import { OdometerColumn } from '@/components/odometer/odometer-column';
import { OdometerLogModal } from '@/components/odometer/odometer-log-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Download } from 'lucide-react';

export function OdometerLogsView({ selectedVehicle, odometerLogs, handleDelete, handleEdit, vehicles }) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex flex-col justify-between md:flex-row md:items-center">
                    <div>
                        {selectedVehicle ? (
                            <>
                                <CardTitle>
                                    {selectedVehicle.vehicle_name} ({selectedVehicle.plate_number})
                                </CardTitle>
                                <CardDescription>Asset Tag: {selectedVehicle.asset_tag}</CardDescription>
                            </>
                        ) : (
                            <>
                                <CardTitle>Select a Vehicle</CardTitle>
                                <CardDescription>Please select a vehicle from the list to view its odometer logs</CardDescription>
                            </>
                        )}
                    </div>
                    <div className="mt-2 flex gap-2 md:mt-0">
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        <OdometerLogModal vehicle_id={selectedVehicle?.vehicle_id} vehicles={vehicles} formType="create" />
                        {selectedVehicle && (
                            <Link href={`/vehicles/${selectedVehicle.vehicle_id}`}>
                                <Button variant="outline" size="sm">
                                    View Vehicle Details
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <DisplayTable columns={OdometerColumn} data={odometerLogs} handleView={''} handleEdit={handleEdit} handleDelete={handleDelete} />
                </div>
            </CardContent>
        </Card>
    );
}
