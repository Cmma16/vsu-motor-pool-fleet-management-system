import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

export default function RecordPartUse({ recordType, recordId, onAddPart, onCancel, parts }) {
    const [form, setForm] = useState({
        part_id: '',
        quantity_used: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const partData = {
            part_id: form.part_id,
            quantity_used: Number(form.quantity_used),
            ...(recordType === 'repair' ? { repair_id: recordId } : { maintenance_id: recordId }),
        };
        onAddPart(partData);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Part</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="part_id">Part</Label>
                            <Select value={String(form.part_id)} onValueChange={(value) => setForm({ ...form, part_id: Number(value) })}>
                                <SelectTrigger id="part_id" tabIndex={1}>
                                    <SelectValue placeholder="Select part" />
                                </SelectTrigger>
                                <SelectContent>
                                    {parts.map((part) => (
                                        <SelectItem key={part.part_id} value={String(part.part_id)}>
                                            {part.part_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                                id="quantity"
                                type="number"
                                min="1"
                                value={form.quantity_used}
                                onChange={(e) => setForm({ ...form, quantity_used: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit">Add Part</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
