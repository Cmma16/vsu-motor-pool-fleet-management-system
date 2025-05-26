import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function VehicleForm({ formData, formType, setData, onSubmit, processing, errors }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Asset Tag */}
                <div className="space-y-2">
                    <Label htmlFor="asset_tag">Asset Tag</Label>
                    <Input
                        id="asset_tag"
                        name="asset_tag"
                        placeholder="ABC123"
                        value={formData.asset_tag}
                        onChange={(e) => setData('asset_tag', e.target.value)}
                        disabled={processing}
                        tabIndex={1}
                    />
                    <InputError message={errors.asset_tag} />
                </div>

                {/* Vehicle Name */}
                <div className="space-y-2">
                    <Label htmlFor="vehicle_name">Vehicle Name</Label>
                    <Input
                        id="vehicle_name"
                        name="vehicle_name"
                        placeholder="Company Car 1"
                        value={formData.vehicle_name}
                        onChange={(e) => setData('vehicle_name', e.target.value)}
                        disabled={processing}
                        tabIndex={2}
                    />
                    <InputError message={errors.vehicle_name} />
                </div>

                {/* Brand */}
                <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                        id="brand"
                        type="text"
                        tabIndex={3}
                        value={formData.brand}
                        onChange={(e) => setData('brand', e.target.value)}
                        disabled={processing}
                        placeholder="Brand Name"
                    />
                    <InputError message={errors.brand} />
                </div>

                {/* Model */}
                <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                        id="model"
                        type="text"
                        tabIndex={4}
                        value={formData.model}
                        onChange={(e) => setData('model', e.target.value)}
                        disabled={processing}
                        placeholder="Model Name"
                    />
                    <InputError message={errors.model} />
                </div>

                {/* Engine Number */}
                <div className="space-y-2">
                    <Label htmlFor="engine_number">Engine Number</Label>
                    <Input
                        id="engine_number"
                        type="text"
                        tabIndex={5}
                        value={formData.engine_number}
                        onChange={(e) => setData('engine_number', e.target.value)}
                        disabled={processing}
                        placeholder="Engine Number"
                    />
                    <InputError message={errors.engine_number} />
                </div>

                {/* Chassis Number */}
                <div className="space-y-2">
                    <Label htmlFor="chassis_number">Chassis Number</Label>
                    <Input
                        id="chassis_number"
                        type="text"
                        tabIndex={6}
                        value={formData.chassis_number}
                        onChange={(e) => setData('chassis_number', e.target.value)}
                        disabled={processing}
                        placeholder="Chassis Number"
                    />
                    <InputError message={errors.chassis_number} />
                </div>

                {/* Vehicle Type */}
                <div className="space-y-2">
                    <Label htmlFor="vehicle_type">Vehicle Type</Label>
                    <Select value={formData.vehicle_type} onValueChange={(value) => setData('vehicle_type', value)}>
                        <SelectTrigger id="vehicle_type" tabIndex={7}>
                            <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sedan">Sedan</SelectItem>
                            <SelectItem value="truck">Truck</SelectItem>
                            <SelectItem value="bus">Bus</SelectItem>
                            <SelectItem value="van">Van</SelectItem>
                            <SelectItem value="pickup">Pickup</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.vehicle_type} />
                </div>

                {/* Capacity */}
                <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                        id="capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={(e) => setData('capacity', e.target.value)}
                        disabled={processing}
                        placeholder="Capacity"
                        tabIndex={8}
                    />
                    <p className="text-muted-foreground text-sm">Number of passengers</p>
                    <InputError message={errors.capacity} />
                </div>

                {/* Location */}
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setData('location', e.target.value)}
                        disabled={processing}
                        placeholder="Location"
                        tabIndex={9}
                    />
                    <InputError message={errors.location} />
                </div>

                {/* Year Acquired */}
                <div className="space-y-2">
                    <Label htmlFor="year_acquired">Year Acquired</Label>
                    <Input
                        id="year_acquired"
                        value={formData.year_acquired}
                        onChange={(e) => setData('year_acquired', e.target.value)}
                        disabled={processing}
                        placeholder="Year acquired"
                        tabIndex={10}
                    />
                    <InputError message={errors.year_acquired} />
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setData('category', value)}>
                        <SelectTrigger id="category" tabIndex={11}>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light vehicle">Light Vehicle</SelectItem>
                            <SelectItem value="heavy vehicle">Heavy Vehicle</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.category} />
                </div>

                {/* Plate Number */}
                <div className="space-y-2">
                    <Label htmlFor="plate_number">Plate Number</Label>
                    <Input
                        id="plate_number"
                        value={formData.plate_number}
                        onChange={(e) => setData('plate_number', e.target.value)}
                        disabled={processing}
                        tabIndex={12}
                    />
                    <InputError message={errors.plate_number} />
                </div>

                {/* Fuel Type */}
                <div className="space-y-2">
                    <Label htmlFor="fuel_type">Fuel Type</Label>
                    <Select value={formData.fuel_type} onValueChange={(value) => setData('fuel_type', value)}>
                        <SelectTrigger id="fuel_type" tabIndex={11}>
                            <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="gasoline">Gasoline</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.fuel_type} />
                </div>

                {/* Odometer Reading */}
                {formType !== 'edit' && (
                    <div className="space-y-2">
                        <Label htmlFor="odometer_reading">Odometer Reading</Label>
                        <Input
                            id="odometer_reading"
                            value={formData.odometer_reading}
                            onChange={(e) => setData('odometer_reading', e.target.value)}
                            disabled={processing}
                            placeholder="Odometer Reading"
                            tabIndex={13}
                        />
                        <InputError message={errors.odometer_reading} />
                    </div>
                )}

                {/* Vehicle Image */}
                {formType !== 'edit' && (
                    <div className="space-y-2">
                        <Label htmlFor="image"> 'Vehicle Image'</Label>
                        <Input id="image" type="file" onChange={(e) => setData('image', e.target.files[0])} disabled={processing} tabIndex={14} />
                        <InputError message={errors.image} />
                    </div>
                )}
            </div>
            <Button disabled={processing} className="w-1/3">
                {formType === 'edit' ? 'Save Changes' : 'Add Vehicle'}
            </Button>
        </form>
    );
}
