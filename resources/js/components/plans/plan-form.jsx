import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PlanForm({ formData, formType, setData, onSubmit, processing, errors, vehicles, users }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Vehicle */}
                <div className="space-y-2">
                    <Label htmlFor="vehicle_id">Vehicle</Label>
                    <Select value={String(formData.vehicle_id)} onValueChange={(value) => setData('vehicle_id', Number(value))}>
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

                {/* Scheduled Date */}
                <div className="space-y-2">
                    <Label htmlFor="scheduled_date">Scheduled date</Label>
                    <input
                        id="scheduled_date"
                        name="scheduled_date"
                        type="date"
                        className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.scheduled_date}
                        onChange={(e) => setData('scheduled_date', e.target.value)}
                        disabled={processing}
                        tabIndex={2}
                    />
                    <InputError message={errors.scheduled_date} />
                </div>

                {/* Next Service (km) */}
                <div className="space-y-2">
                    <Label htmlFor="next_service_km">Next service (km)</Label>
                    <Input
                        id="next_service_km"
                        type="number"
                        value={formData.next_service_km}
                        onChange={(e) => setData('next_service_km', e.target.value)}
                        disabled={processing}
                        placeholder="Next service (km)"
                        tabIndex={3}
                    />
                    <InputError message={errors.next_service_km} />
                </div>

                {/* Created By */}
                <div className="space-y-2">
                    <Label htmlFor="created_by">Created By</Label>
                    <Select value={String(formData.created_by)} onValueChange={(value) => setData('created_by', Number(value))}>
                        <SelectTrigger id="created_by" tabIndex={4}>
                            <SelectValue placeholder="Select planner" />
                        </SelectTrigger>
                        <SelectContent>
                            {users.map((user) => (
                                <SelectItem key={user.id} value={String(user.id)}>
                                    {`${user.first_name} ${user.last_name}`}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.created_by} />
                </div>

                {/* Status */}
                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setData('status', value)}>
                        <SelectTrigger id="status" tabIndex={6}>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="overdue">Overdue</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.status} />
                </div>
            </div>
            <Button disabled={processing} className="w-1/3">
                {formType === 'edit' ? 'Save Changes' : 'Add Plan'}
            </Button>
        </form>
    );
}
