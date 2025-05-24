import InputError from '@/components/input-error';
import { OdometerLogModal } from '@/components/odometer/odometer-log-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

export default function RepairForm({
    formData,
    formType,
    setData,
    onSubmit,
    processing,
    errors,
    vehicles,
    users,
    serviceRequests,
    odometerLogs,
    lockInputs,
}) {
    const latestOdometer = React.useMemo(() => {
        const vehicleId = Number(formData.vehicle_id);
        return odometerLogs.filter((log) => log.vehicle_id === vehicleId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
    }, [formData.vehicle_id, odometerLogs]);

    React.useEffect(() => {
        if (latestOdometer) {
            setData('odometer_id', latestOdometer.odometer_id);
        } else {
            setData('odometer_id', '');
        }
    }, [latestOdometer]);

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Vehicle */}
                <div className="space-y-2">
                    <Label htmlFor="vehicle_id">
                        Vehicle <span className="text-red-500">*</span>
                        {lockInputs && (
                            <Badge variant="outline" className="ml-2">
                                Read only
                            </Badge>
                        )}
                    </Label>
                    <Select disabled={lockInputs} value={String(formData.vehicle_id)} onValueChange={(value) => setData('vehicle_id', Number(value))}>
                        <SelectTrigger className="mt-2 disabled:border-gray-300 disabled:opacity-100" id="vehicle_id" tabIndex={1}>
                            <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                        <SelectContent>
                            {vehicles.map((vehicle) => (
                                <SelectItem key={vehicle.vehicle_id} value={String(vehicle.vehicle_id)}>
                                    {vehicle.vehicle_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.vehicle_id} />
                </div>

                {/* Request Description */}
                <div className="space-y-2">
                    <Label htmlFor="request_id">
                        Request Description <span className="text-red-500">*</span>
                        {lockInputs && (
                            <Badge variant="outline" className="ml-2">
                                Read only
                            </Badge>
                        )}
                    </Label>
                    <Select disabled={lockInputs} value={String(formData.request_id)} onValueChange={(value) => setData('request_id', Number(value))}>
                        <SelectTrigger className="mt-2 disabled:border-gray-300 disabled:opacity-100" id="request_id" tabIndex={2}>
                            <SelectValue placeholder="Select service request" />
                        </SelectTrigger>
                        <SelectContent>
                            {serviceRequests.map((request) => (
                                <SelectItem key={request.request_id} value={String(request.request_id)}>
                                    {request.work_description}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.request_id} />
                </div>

                {/* Date In */}
                <div className="space-y-2">
                    <Label htmlFor="date_in">
                        Date In <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="date_in"
                        name="date_in"
                        className="mt-2"
                        type="date"
                        value={formData.date_in}
                        onChange={(e) => setData('date_in', e.target.value)}
                        disabled={processing}
                        tabIndex={3}
                    />
                    <InputError message={errors.date_in} />
                </div>

                {/* Date Completed */}
                <div className="space-y-2">
                    <Label htmlFor="date_completed">
                        Date Completed <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="date_completed"
                        name="date_completed"
                        className="mt-2"
                        type="date"
                        value={formData.date_completed}
                        onChange={(e) => setData('date_completed', e.target.value)}
                        disabled={processing}
                        tabIndex={4}
                    />
                    <InputError message={errors.date_completed} />
                </div>

                {/* Summary */}
                <div className="space-y-2">
                    <Label htmlFor="maintenance_summary">
                        Summary <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="maintenance_summary"
                        name="maintenance_summary"
                        className="mt-2"
                        placeholder="Description of the maintenance conducted"
                        value={formData.maintenance_summary}
                        onChange={(e) => setData('maintenance_summary', e.target.value)}
                        disabled={processing}
                        tabIndex={5}
                    />
                    <InputError message={errors.maintenance_summary} />
                </div>

                {/* Odometer Reading */}
                <div className="space-y-2">
                    <Label>Odometer Reading</Label>
                    <Input
                        value={latestOdometer?.reading ?? ''}
                        disabled
                        id="odometer_id"
                        name="odometer_id"
                        placeholder="No odometer reading available"
                        className="mt-2 bg-gray-100 disabled:border-gray-300 disabled:opacity-100"
                    />
                    {formData.vehicle_id && <OdometerLogModal vehicles={vehicles} formType={'add'} vehicle_id={formData.vehicle_id} />}
                    <InputError message={errors.odometer_id} />
                </div>
            </div>
            <Button disabled={processing} className="w-1/3">
                {formType === 'edit' ? 'Save Changes' : 'Add Repair'}
            </Button>
        </form>
    );
}
