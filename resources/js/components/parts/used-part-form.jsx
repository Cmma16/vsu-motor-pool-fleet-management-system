import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function UsedPartForm({ formData, setData, processing, errors, parts, disablePartSelect, part_name }) {
    return (
        <div className="grid grid-cols-1 gap-6">
            {/* Part */}
            <div className="space-y-2">
                <Label htmlFor="part_id">Part</Label>
                <Select disabled={disablePartSelect} value={String(formData.part_id)} onValueChange={(value) => setData('part_id', Number(value))}>
                    <SelectTrigger id="part_id">
                        <SelectValue placeholder="Select part" />
                    </SelectTrigger>
                    <SelectContent>
                        {parts ? (
                            parts.map((part) => (
                                <SelectItem key={part.part_id} value={String(part.part_id)}>
                                    {part.part_name}
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem key={formData.part_id} value={String(formData.part_id || '0')}>
                                {part_name || 'Part not found'}
                            </SelectItem>
                        )}
                    </SelectContent>
                </Select>
                <InputError message={errors.part_id} />
            </div>

            {/* Reading */}
            <div className="space-y-2">
                <Label htmlFor="quantity_used">Quantity Used</Label>
                <Input
                    id="quantity_used"
                    type="number"
                    value={formData.quantity_used}
                    onChange={(e) => setData('quantity_used', e.target.value)}
                    disabled={processing}
                    placeholder="Quantity Used"
                    tabIndex={5}
                />
                <InputError message={errors.quantity_used} />
            </div>
        </div>
    );
}
