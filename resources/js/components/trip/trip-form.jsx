import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function TripForm({ formData, setData, onSubmit, processing, errors, vehicles, users, formType }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Date filed */}
                <div className="space-y-2">
                    <Label htmlFor="date_filed">Date Filed</Label>
                    <input
                        id="date_filed"
                        name="date_filed"
                        type="date"
                        className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.date_filed}
                        onChange={(e) => setData('date_filed', e.target.value)}
                        disabled={processing}
                        tabIndex={1}
                    />
                    <InputError message={errors.date_filed} />
                </div>
                {/* Trip Number */}
                <div className="space-y-2">
                    <Label htmlFor="trip_number">Trip Number</Label>
                    <Input
                        id="trip_number"
                        name="trip_number"
                        value={formData.trip_number}
                        onChange={(e) => setData('trip_number', e.target.value)}
                        disabled={processing}
                        tabIndex={2}
                    />
                    <InputError message={errors.trip_number} />
                </div>

                {/* Purpose */}
                <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Input
                        id="purpose"
                        name="purpose"
                        value={formData.purpose}
                        onChange={(e) => setData('purpose', e.target.value)}
                        disabled={processing}
                        tabIndex={3}
                    />
                    <InputError message={errors.purpose} />
                </div>

                {/* Destination */}
                <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={(e) => setData('destination', e.target.value)}
                        disabled={processing}
                        tabIndex={4}
                    />
                    <InputError message={errors.destination} />
                </div>

                {/* Start Date */}
                <div className="space-y-2">
                    <Label htmlFor="start_date">Start Date</Label>
                    <input
                        id="start_date"
                        name="start_date"
                        type="date"
                        className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.start_date}
                        onChange={(e) => setData('start_date', e.target.value)}
                        disabled={processing}
                        tabIndex={5}
                    />
                    <InputError message={errors.start_date} />
                </div>

                {/* End Date */}
                <div className="space-y-2">
                    <Label htmlFor="end_date">End Date</Label>
                    <input
                        id="end_date"
                        name="end_date"
                        type="date"
                        className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.end_date}
                        onChange={(e) => setData('end_date', e.target.value)}
                        disabled={processing}
                        tabIndex={6}
                    />
                    <InputError message={errors.end_date} />
                </div>

                {/* Departure Time */}
                <div className="space-y-2">
                    <Label htmlFor="departure_time">Departure Time</Label>
                    <input
                        id="departure_time"
                        name="departure_time"
                        type="time"
                        className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.departure_time}
                        onChange={(e) => setData('departure_time', e.target.value)}
                        disabled={processing}
                        tabIndex={7}
                    />
                    <InputError message={errors.departure_time} />
                </div>

                {/* Requesting Party */}
                <div className="space-y-2">
                    <Label htmlFor="requesting_party">Requesting Party</Label>
                    <Input
                        id="requesting_party"
                        name="requesting_party"
                        value={formData.requesting_party}
                        onChange={(e) => setData('requesting_party', e.target.value)}
                        disabled={processing}
                        tabIndex={8}
                    />
                    <InputError message={errors.requesting_party} />
                </div>

                {/* Vehicle */}
                <div className="space-y-2">
                    <Label htmlFor="vehicle_id">Vehicle</Label>
                    <Select value={String(formData.vehicle_id)} onValueChange={(value) => setData('vehicle_id', Number(value))}>
                        <SelectTrigger id="vehicle_id" tabIndex={9}>
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

                {/* Driver */}
                <div className="space-y-2">
                    <Label htmlFor="driver_id">Driver</Label>
                    <Select value={String(formData.driver_id)} onValueChange={(value) => setData('driver_id', Number(value))}>
                        <SelectTrigger id="driver_id" tabIndex={10}>
                            <SelectValue placeholder="Select driver" />
                        </SelectTrigger>
                        <SelectContent>
                            {users.map((user) => (
                                <SelectItem key={user.id} value={String(user.id)}>
                                    {`${user.first_name} ${user.last_name}`}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.driver_id} />
                </div>

                {/* Status */}
                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setData('status', value)}>
                        <SelectTrigger id="status" tabIndex={11}>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="ongoing">Ongoing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.status} />
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-primary hover:bg-primary/90 rounded-md px-4 py-2 text-white disabled:opacity-50"
                    tabIndex={9}
                >
                    {formType === 'edit' ? 'Save Changes' : 'Submit Trip Request'}
                </button>
            </div>
        </form>
    );
}
