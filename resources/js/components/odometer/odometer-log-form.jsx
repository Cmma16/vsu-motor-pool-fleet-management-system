import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function OdometerLogForm({ formData, setData, processing, errors, vehicles, disableVehicleSelect }) {
    return (
        <div className="grid grid-cols-1 gap-6">
            {/* Vehicle */}
            {disableVehicleSelect ? (
                <div className="space-y-2">
                    <Label>Vehicle</Label>
                    <div className="rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm">
                        {Array.isArray(vehicles)
                            ? vehicles.find((v) => v.vehicle_id === formData.vehicle_id)?.vehicle_name
                            : vehicles?.vehicle_id === formData.vehicle_id
                              ? vehicles.vehicle_name
                              : 'Vehicle not found'}
                    </div>
                </div>
            ) : (
                <div className="space-y-2">
                    <Label htmlFor="vehicle_id">Vehicle</Label>
                    <Select value={String(formData.vehicle_id)} onValueChange={(value) => setData('vehicle_id', Number(value))}>
                        <SelectTrigger id="vehicle_id">
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
            )}

            {/* Reading */}
            <div className="space-y-2">
                <Label htmlFor="reading">Reading</Label>
                <Input
                    id="reading"
                    type="number"
                    value={formData.reading}
                    onChange={(e) => setData('reading', e.target.value)}
                    disabled={processing}
                    placeholder="Odometer Reading"
                    tabIndex={5}
                />
                <InputError message={errors.reading} />
            </div>
            {/* Logged at */}
            <div className="space-y-2">
                <Label htmlFor="logged_at">Logged at</Label>
                <input
                    id="logged_at"
                    name="logged_at"
                    type="datetime-local"
                    className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.logged_at}
                    onChange={(e) => setData('logged_at', e.target.value)}
                    disabled={processing}
                    tabIndex={3}
                />
                <InputError message={errors.logged_at} />
            </div>
        </div>
    );
}
