import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function InspectionForm({ formData, formType, setData, onSubmit, processing, errors, users, lockInputs }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

                {/* Parts available */}
                <div className="space-y-2">
                    <Label htmlFor="parts_available">Parts available</Label>
                    <Select value={String(formData.parts_available)} onValueChange={(value) => setData('parts_available', Number(value))}>
                        <SelectTrigger id="parts_available" tabIndex={4}>
                            <SelectValue placeholder="Select parts availability" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Yes</SelectItem>
                            <SelectItem value="0">No</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.parts_available} />
                </div>

                {/* Personnel available */}
                <div className="space-y-2">
                    <Label htmlFor="personnel_available">Personnel available</Label>
                    <Select value={String(formData.personnel_available)} onValueChange={(value) => setData('personnel_available', Number(value))}>
                        <SelectTrigger id="personnel_available" tabIndex={5}>
                            <SelectValue placeholder="Select personnel availability" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Yes</SelectItem>
                            <SelectItem value="0">No</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.personnel_available} />
                </div>

                {/* Estimated duration */}
                <div className="space-y-2">
                    <Label htmlFor="estimated_duration">Estimated Duration</Label>
                    <Input
                        id="estimated_duration"
                        name="estimated_duration"
                        placeholder="Estimated duration to complete the service request"
                        value={formData.estimated_duration}
                        onChange={(e) => setData('estimated_duration', e.target.value)}
                        disabled={processing}
                        tabIndex={6}
                    />
                    <InputError message={errors.estimated_duration} />
                </div>
            </div>
            <Button disabled={processing} className="w-1/3">
                {formType === 'edit' ? 'Save Changes' : 'Submit Inspection'}
            </Button>
        </form>
    );
}
