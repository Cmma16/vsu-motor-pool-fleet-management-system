import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function RepairForm({ formData, formType, setData, onSubmit, processing, errors, vehicles, users }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        name="description"
                        placeholder="Repair description"
                        value={formData.description}
                        onChange={(e) => setData('description', e.target.value)}
                        disabled={processing}
                        tabIndex={2}
                    />
                    <InputError message={errors.description} />
                </div>

                {/* Scheduled Date */}
                <div className="space-y-2">
                    <Label htmlFor="scheduled_date">Scheduled Date</Label>
                    <Input
                        id="scheduled_date"
                        type="date"
                        value={formData.scheduled_date}
                        onChange={(e) => setData('scheduled_date', e.target.value)}
                        disabled={processing}
                        tabIndex={3}
                    />
                    <InputError message={errors.scheduled_date} />
                </div>

                {/* Required By */}
                <div className="space-y-2">
                    <Label htmlFor="required_by">Required By</Label>
                    <Input
                        id="required_by"
                        type="date"
                        value={formData.required_by}
                        onChange={(e) => setData('required_by', e.target.value)}
                        disabled={processing}
                        tabIndex={4}
                    />
                    <InputError message={errors.required_by} />
                </div>

                {/* Urgency Level */}
                <div className="space-y-2">
                    <Label htmlFor="urgency_level">Urgency Level</Label>
                    <Select value={formData.urgency_level} onValueChange={(value) => setData('urgency_level', value)}>
                        <SelectTrigger id="urgency_level" tabIndex={5}>
                            <SelectValue placeholder="Select urgency level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.urgency_level} />
                </div>

                {/* Assigned Personnel */}
                <div className="space-y-2">
                    <Label htmlFor="assigned_personnel">Assigned Personnel</Label>
                    <Select value={String(formData.assigned_personnel)} onValueChange={(value) => setData('assigned_personnel', Number(value))}>
                        <SelectTrigger id="assigned_personnel" tabIndex={6}>
                            <SelectValue placeholder="Select personnel" />
                        </SelectTrigger>
                        <SelectContent>
                            {users.map((user) => (
                                <SelectItem key={user.id} value={String(user.id)}>
                                    {user.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.assigned_personnel} />
                </div>

                {/* Status */}
                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setData('status', value)}>
                        <SelectTrigger id="status" tabIndex={7}>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.status} />
                </div>

                {/* Requested By */}
                <div className="space-y-2">
                    <Label htmlFor="requested_by">Requested By</Label>
                    <Select value={String(formData.requested_by)} onValueChange={(value) => setData('requested_by', Number(value))}>
                        <SelectTrigger id="requested_by" tabIndex={8}>
                            <SelectValue placeholder="Select requester" />
                        </SelectTrigger>
                        <SelectContent>
                            {users.map((user) => (
                                <SelectItem key={user.id} value={String(user.id)}>
                                    {user.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.requested_by} />
                </div>
            </div>
            <Button disabled={processing} className="w-1/3">
                {formType === 'edit' ? 'Save Changes' : 'Submit Request'}
            </Button>
        </form>
    );
}
