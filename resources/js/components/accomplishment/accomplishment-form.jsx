import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AccomplishmentForm({ formData, formType, setData, onSubmit, processing, errors, serviceRequests, users }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Request */}
                <div className="space-y-2">
                    <Label htmlFor="request_id">Service request</Label>
                    <Select value={String(formData.request_id)} onValueChange={(value) => setData('request_id', Number(value))}>
                        <SelectTrigger id="request_id" tabIndex={1}>
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

                {/* Started at */}
                <div className="space-y-2">
                    <Label htmlFor="started_at">Started at</Label>
                    <input
                        id="started_at"
                        name="started_at"
                        type="datetime-local"
                        className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.started_at}
                        onChange={(e) => setData('started_at', e.target.value)}
                        disabled={processing}
                        tabIndex={2}
                    />
                    <InputError message={errors.started_at} />
                </div>

                {/* Completed at */}
                <div className="space-y-2">
                    <Label htmlFor="completed_at">Completed at</Label>
                    <input
                        id="completed_at"
                        name="completed_at"
                        type="datetime-local"
                        className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.completed_at}
                        onChange={(e) => setData('completed_at', e.target.value)}
                        disabled={processing}
                        tabIndex={3}
                    />
                    <InputError message={errors.completed_at} />
                </div>

                {/* Conducted By */}
                <div className="space-y-2">
                    <Label htmlFor="conducted_by">Conducted By</Label>
                    <Select value={String(formData.conducted_by)} onValueChange={(value) => setData('conducted_by', Number(value))}>
                        <SelectTrigger id="conducted_by" tabIndex={7}>
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
                    <InputError message={errors.conducted_by} />
                </div>

                {/* Verified by */}
                <div className="space-y-2">
                    <Label htmlFor="verified_by">Verified By</Label>
                    <Select value={String(formData.verified_by)} onValueChange={(value) => setData('verified_by', Number(value))}>
                        <SelectTrigger id="verified_by" tabIndex={8}>
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
                    <InputError message={errors.verified_by} />
                </div>
            </div>
            <Button disabled={processing} className="w-1/3">
                {formType === 'edit' ? 'Save Changes' : 'Submit Inspection'}
            </Button>
        </form>
    );
}
