import InputError from '@/components/input-error';
import { OdometerLogModal } from '@/components/odometer/odometer-log-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function MaintenanceEditForm({
    formData,
    formType,
    setData,
    onSubmit,
    processing,
    errors,
    presets,
    odometerLogs,
    vehicles,
    lockInputs,
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Vehicle */}
                <div className="space-y-2">
                    <Label htmlFor="vehicle_id">Vehicle</Label>
                    <span className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm sm:text-sm">
                        {presets.vehicle_name}
                    </span>
                </div>
                {/* Request Description */}
                <div className="space-y-2">
                    <Label htmlFor="request_id">Request Description</Label>
                    <span className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm sm:text-sm">
                        {presets.request_description}
                    </span>
                </div>

                {/* Maintenance Plan */}
                <div className="space-y-2">
                    <Label htmlFor="plan_id">Maintenance Plan</Label>
                    <span className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm sm:text-sm">
                        {presets.plan_description}
                    </span>
                </div>

                {/* Date In */}
                <div className="space-y-2">
                    <Label htmlFor="date_in">Date In</Label>
                    <Input
                        id="date_in"
                        type="date"
                        value={formData.date_in}
                        onChange={(e) => setData('date_in', e.target.value)}
                        disabled={processing}
                        tabIndex={4}
                    />
                    <InputError message={errors.date_in} />
                </div>

                {/* Date Completed */}
                <div className="space-y-2">
                    <Label htmlFor="date_completed">Date Completed</Label>
                    <Input
                        id="date_completed"
                        type="date"
                        value={formData.date_completed}
                        onChange={(e) => setData('date_completed', e.target.value)}
                        disabled={processing}
                        tabIndex={5}
                    />
                    <InputError message={errors.date_completed} />
                </div>

                {/* Maintenance Summary */}
                <div className="space-y-2">
                    <Label htmlFor="maintenance_summary">Summary</Label>
                    <Input
                        id="maintenance_summary"
                        name="maintenance_summary"
                        placeholder="Description of the maintenance conducted"
                        value={formData.maintenance_summary}
                        onChange={(e) => setData('maintenance_summary', e.target.value)}
                        disabled={processing}
                        tabIndex={5}
                    />
                    <InputError message={errors.maintenance_summary} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="odometer_id">Odometer Reading</Label>
                    <Select
                        disabled={lockInputs}
                        value={String(formData.odometer_id)}
                        onValueChange={(value) => setData('odometer_id', Number(value))}
                    >
                        <SelectTrigger id="odometer_id" tabIndex={2}>
                            <SelectValue placeholder="Select odometer reading" />
                        </SelectTrigger>
                        <SelectContent>
                            {odometerLogs.map((log) => (
                                <SelectItem key={log.odometer_id} value={String(log.odometer_id)}>
                                    {log.reading}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <OdometerLogModal vehicles={vehicles} formType={'add'} vehicle_id={presets.vehicle_id} />
                    <InputError message={errors.odometer_id} />
                </div>
            </div>
            <Button disabled={processing} className="w-1/3">
                {formType === 'edit' ? 'Save Changes' : 'Add Maintenance'}
            </Button>
        </form>
    );
}
