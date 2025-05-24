import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function OdometerLogForm({ formData, setData, processing, errors, vehicles, disableVehicleSelect }) {
    return (
        <div className="grid grid-cols-1 gap-6">
            {/* Vehicle */}

            <div className="space-y-2">
                <Label htmlFor="vehicle_id">Vehicle</Label>
                <Select
                    disabled={disableVehicleSelect}
                    value={String(formData.vehicle_id)}
                    onValueChange={(value) => setData('vehicle_id', Number(value))}
                >
                    <SelectTrigger id="vehicle_id" className="mt-2 disabled:border-gray-300 disabled:opacity-100">
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
