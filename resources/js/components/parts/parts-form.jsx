import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PartForm({ formData, formType, setData, onSubmit, processing, errors }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Part Name */}
                <div className="space-y-2">
                    <Label htmlFor="part_name">Part Name</Label>
                    <Input
                        id="part_name"
                        name="part_name"
                        placeholder="Part Name"
                        value={formData.part_name}
                        onChange={(e) => setData('part_name', e.target.value)}
                        disabled={processing}
                        tabIndex={1}
                    />
                    <InputError message={errors.part_name} />
                </div>

                {/* Stock Quantity */}
                <div className="space-y-2">
                    <Label htmlFor="stock_quantity">Stock Quantity</Label>
                    <Input
                        id="stock_quantity"
                        type="number"
                        value={formData.stock_quantity}
                        onChange={(e) => setData('stock_quantity', e.target.value)}
                        disabled={processing}
                        placeholder="Stock Quantity"
                        tabIndex={2}
                    />
                    <InputError message={errors.stock_quantity} />
                </div>

                {/* Unit */}
                <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                        id="unit"
                        value={formData.unit}
                        onChange={(e) => setData('unit', e.target.value)}
                        disabled={processing}
                        placeholder="Unit of measurement (e.g., pcs, liters)"
                        tabIndex={3}
                    />
                    <InputError message={errors.unit} />
                </div>

                {/* Unit Price */}
                <div className="space-y-2">
                    <Label htmlFor="unit_price">Unit Price</Label>
                    <Input
                        id="unit_price"
                        type="number"
                        value={formData.unit_price}
                        onChange={(e) => setData('unit_price', e.target.value)}
                        disabled={processing}
                        placeholder="Unit Price"
                        tabIndex={4}
                        step="0.01"
                        min="0"
                    />
                    <InputError message={errors.unit_price} />
                </div>

                {/* Restock Threshold */}
                <div className="space-y-2">
                    <Label htmlFor="restock_threshold">Restock Threshold</Label>
                    <Input
                        id="restock_threshold"
                        type="number"
                        value={formData.restock_threshold}
                        onChange={(e) => setData('restock_threshold', e.target.value)}
                        disabled={processing}
                        placeholder="Restock Threshold"
                        tabIndex={5}
                    />
                    <InputError message={errors.restock_threshold} />
                </div>
            </div>
            <Button disabled={processing} className="w-1/3">
                {formType === 'edit' ? 'Save Changes' : 'Add Part'}
            </Button>
        </form>
    );
}
