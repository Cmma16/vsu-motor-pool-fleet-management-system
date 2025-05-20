import InputError from '@/components/input-error';
import { OdometerLogModal } from '@/components/odometer/odometer-log-modal';
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
    console.log(latestOdometer, odometerLogs, formData);

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Vehicle */}
                <div className="space-y-2">
                    <Label htmlFor="vehicle_id">Vehicle</Label>
                    <Select disabled={lockInputs} value={String(formData.vehicle_id)} onValueChange={(value) => setData('vehicle_id', Number(value))}>
                        <SelectTrigger id="vehicle_id" tabIndex={1}>
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
                    <Label htmlFor="request_id">Request Description</Label>
                    <Select disabled={lockInputs} value={String(formData.request_id)} onValueChange={(value) => setData('request_id', Number(value))}>
                        <SelectTrigger id="request_id" tabIndex={2}>
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

                <div className="space-y-2">
                    <Label htmlFor="repair_summary">Summary</Label>
                    <Input
                        id="repair_summary"
                        name="repair_summary"
                        placeholder="Description of the repair conducted"
                        value={formData.repair_summary}
                        onChange={(e) => setData('repair_summary', e.target.value)}
                        disabled={processing}
                        tabIndex={5}
                    />
                    <InputError message={errors.repair_summary} />
                </div>

                {/* Odometer Reading */}
                <div className="space-y-2">
                    <Label htmlFor="odometer_id">Odometer Reading</Label>
                    <Input value={latestOdometer?.reading ?? ''} disabled placeholder="No odometer reading available" className="bg-gray-100" />
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
