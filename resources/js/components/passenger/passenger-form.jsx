import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PassengerForm({ formData, setData, processing, errors }) {
    return (
        <div className="grid grid-cols-1 gap-6">
            {/* Name */}
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    placeholder="Enter Passenger Name"
                    onChange={(e) => setData('name', e.target.value)}
                    disabled={processing}
                />
                <InputError message={errors.name} />
            </div>

            {/* Affiliation */}
            <div className="space-y-2">
                <Label htmlFor="affiliation">Department/Office/Center/Project</Label>
                <Input
                    id="affiliation"
                    type="text"
                    value={formData.affiliation}
                    onChange={(e) => setData('affiliation', e.target.value)}
                    disabled={processing}
                    placeholder="Affiliation"
                    tabIndex={5}
                />
                <InputError message={errors.affiliation} />
            </div>

            {/* Contact Number */}
            <div className="space-y-2">
                <Label htmlFor="contact_number">Contact Number</Label>
                <Input
                    id="contact_number"
                    type="text"
                    value={formData.contact_number}
                    onChange={(e) => setData('contact_number', e.target.value)}
                    disabled={processing}
                    placeholder="Contact Number"
                    tabIndex={6}
                />
                <InputError message={errors.contact_number} />
            </div>
        </div>
    );
}
