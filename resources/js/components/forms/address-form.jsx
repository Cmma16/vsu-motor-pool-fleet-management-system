import React from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getBarangays, getCities, getProvinces } from '@/hooks/use-psgc';

export function AddressForm({ data, setData, errors, nextStage, previousStage, processing }) {
    const [provinces, setProvinces] = React.useState([]);
    const [cities, setCities] = React.useState([]);
    const [barangays, setBarangays] = React.useState([]);

    const [selectedProvinceCode, setSelectedProvinceCode] = React.useState('');
    const [selectedCityCode, setSelectedCityCode] = React.useState('');

    // Load provinces and restore province code from saved name
    React.useEffect(() => {
        getProvinces().then((res) => {
            setProvinces(res.data);

            const selected = res.data.find((p) => p.name === data.province);
            if (selected) {
                setSelectedProvinceCode(selected.code);
            }
        });
    }, []);

    // Load cities and restore city code from saved name
    React.useEffect(() => {
        if (selectedProvinceCode) {
            getCities(selectedProvinceCode).then((res) => {
                setCities(res.data);

                const selected = res.data.find((c) => c.name === data.city);
                if (selected) {
                    setSelectedCityCode(selected.code);
                }
            });
        } else {
            setCities([]);
        }
    }, [selectedProvinceCode]);

    // Load barangays based on city code
    React.useEffect(() => {
        if (selectedCityCode) {
            getBarangays(selectedCityCode).then((res) => {
                setBarangays(res.data);
            });
        } else {
            setBarangays([]);
        }
    }, [selectedCityCode]);

    // Handlers
    const handleProvinceChange = (code) => {
        setSelectedProvinceCode(code);
        const selectedName = provinces.find((p) => p.code === code)?.name || '';
        setData('province', selectedName);
        setData('city', '');
        setData('barangay', '');
    };

    const handleCityChange = (code) => {
        setSelectedCityCode(code);
        const selectedName = cities.find((c) => c.code === code)?.name || '';
        setData('city', selectedName);
        setData('barangay', '');
    };

    const handleBarangayChange = (code) => {
        const selectedName = barangays.find((b) => b.code === code)?.name || '';
        setData('barangay', selectedName);
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={nextStage}>
            <div className="grid gap-6">
                {/* Province */}
                <div className="grid gap-2">
                    <Label htmlFor="province">Province</Label>
                    <Select value={selectedProvinceCode} required onValueChange={handleProvinceChange} disabled={processing}>
                        <SelectTrigger id="province" tabIndex={6}>
                            <SelectValue placeholder="Select Province" />
                        </SelectTrigger>
                        <SelectContent>
                            {provinces.map((province) => (
                                <SelectItem key={province.code} value={province.code}>
                                    {province.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.province} />
                </div>

                {/* City */}
                <div className="grid gap-2">
                    <Label htmlFor="city">City/Municipality/Town</Label>
                    <Select value={selectedCityCode} required onValueChange={handleCityChange} disabled={!selectedProvinceCode || processing}>
                        <SelectTrigger id="city" tabIndex={7}>
                            <SelectValue placeholder="Select City/Municipality/Town" />
                        </SelectTrigger>
                        <SelectContent>
                            {cities.map((city) => (
                                <SelectItem key={city.code} value={city.code}>
                                    {city.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.city} />
                </div>

                {/* Barangay */}
                <div className="grid gap-2">
                    <Label htmlFor="barangay">Barangay</Label>
                    <Select
                        value={barangays.find((b) => b.name === data.barangay)?.code || ''}
                        required
                        onValueChange={handleBarangayChange}
                        disabled={!selectedCityCode || processing}
                    >
                        <SelectTrigger id="barangay" tabIndex={8}>
                            <SelectValue placeholder="Select Barangay" />
                        </SelectTrigger>
                        <SelectContent>
                            {barangays.map((barangay) => (
                                <SelectItem key={barangay.code} value={barangay.code}>
                                    {barangay.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.barangay} />
                </div>

                {/* Other Details */}
                <div className="grid gap-2">
                    <Label htmlFor="address_details">Other Details (Optional)</Label>
                    <Input
                        id="address_details"
                        type="text"
                        tabIndex={9}
                        value={data.address_details}
                        onChange={(e) => setData('address_details', e.target.value)}
                        disabled={processing}
                        placeholder="Building, Street, etc."
                    />
                    <InputError message={errors.address_details} />
                </div>
            </div>

            <div className="flex justify-between">
                <Button type="button" onClick={previousStage} className="mt-2" tabIndex={10} disabled={processing}>
                    Back
                </Button>
                <Button type="submit" className="mt-2" tabIndex={11} disabled={processing}>
                    Next
                </Button>
            </div>
        </form>
    );
}
