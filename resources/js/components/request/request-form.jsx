import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function RequestForm({ formData, formType, setData, onSubmit, processing, errors, vehicles, maintenancePlans, lockInputs }) {
    return (
        <form onSubmit={onSubmit} className="w-full space-y-8">
            <div className="grid grid-cols-1 gap-6">
                {/* Service Type */}
                <div className="space-y-2">
                    <Label htmlFor="service_type">
                        Service Type <span className="text-red-500">*</span>
                    </Label>
                    <Select disabled={lockInputs} value={formData.service_type} onValueChange={(value) => setData('service_type', value)}>
                        <SelectTrigger id="service_type" tabIndex={4}>
                            <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="repair">Repair</SelectItem>
                            <SelectItem value="preventive">Preventive Maintenance</SelectItem>
                            <SelectItem value="maintenance">Planned Maintenance</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.service_type} />
                </div>

                {/* Maintenance Plan */}
                {formData.service_type === 'maintenance' && (
                    <div className="space-y-2">
                        <Label htmlFor="plan_id">
                            Maintenance Plan <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            disabled={lockInputs}
                            value={formData.service_type === 'maintenance' ? String(formData.plan_id) : null}
                            onValueChange={(value) => {
                                const selectedPlan = maintenancePlans.find((plan) => String(plan.plan_id) === value);
                                if (selectedPlan) {
                                    setData({
                                        ...formData,
                                        plan_id: selectedPlan.plan_id,
                                        vehicle_id: selectedPlan.vehicle_id, // <-- Set vehicle_id too
                                    });
                                }
                            }}
                        >
                            <SelectTrigger id="plan_id" tabIndex={5}>
                                <SelectValue placeholder="Select maintenance plan" />
                            </SelectTrigger>
                            <SelectContent>
                                {maintenancePlans.map((plan) => (
                                    <SelectItem key={plan.plan_id} value={String(plan.plan_id)}>
                                        {plan.plan_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.plan_id} />
                    </div>
                )}

                {/* Vehicle */}
                {formData.service_type !== 'maintenance' && (
                    <div className="space-y-2">
                        <Label htmlFor="vehicle_id">
                            Vehicle <span className="text-red-500">*</span>
                        </Label>
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
                )}

                {/* Date filed */}
                <div className="space-y-2">
                    <Label htmlFor="date_filed">
                        Date filed <span className="text-red-500">*</span>
                    </Label>
                    <input
                        id="date_filed"
                        name="date_filed"
                        type="date"
                        className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.date_filed}
                        onChange={(e) => setData('date_filed', e.target.value)}
                        disabled={processing}
                        tabIndex={3}
                    />
                    <InputError message={errors.date_filed} />
                </div>

                {/* Work Description */}
                <div className="space-y-2">
                    <Label htmlFor="work_description">
                        Work Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                        id="work_description"
                        name="work_description"
                        placeholder="Provide a detailed description of the work to be done..."
                        value={formData.work_description}
                        onChange={(e) => setData('work_description', e.target.value)}
                        disabled={processing}
                        tabIndex={5}
                        className="min-h-[120px] resize-y"
                    />
                    <InputError message={errors.work_description} />
                </div>

                {/* Date received
                <div className="space-y-2">
                    <Label htmlFor="date_received">Date received</Label>
                    <input
                        id="date_received"
                        name="date_received"
                        type="datetime-local"
                        className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.date_received}
                        onChange={(e) => setData('date_received', e.target.value)}
                        disabled={processing}
                        tabIndex={6}
                    />
                    <InputError message={errors.date_received} />
                </div>

                {/* Received By 
                <div className="space-y-2">
                    <Label htmlFor="received_by">Received By</Label>
                    <Select value={String(formData.received_by)} onValueChange={(value) => setData('received_by', Number(value))}>
                        <SelectTrigger id="received_by" tabIndex={7}>
                            <SelectValue placeholder="Select requester" />
                        </SelectTrigger>
                        <SelectContent>
                            {users.map((user) => (
                                <SelectItem key={user.id} value={String(user.id)}>
                                    {`${user.first_name} ${user.last_name}`}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.received_by} />
                </div>

                {/* Status 
                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setData('status', value)}>
                        <SelectTrigger id="status" tabIndex={8}>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="received">Received</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.status} />
                </div> */}
            </div>
            <Button disabled={processing} className="w-full p-6">
                {formType === 'edit' ? 'Save Changes' : 'Submit Request'}
            </Button>
        </form>
    );
}
