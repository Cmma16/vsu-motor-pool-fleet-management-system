<?php

namespace App\Http\Requests\Vehicle;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
{
    return [
        'asset_tag' => 'required|string|max:255|unique:vehicles,asset_tag,' . $this->vehicle->vehicle_id . ',vehicle_id',
        'vehicle_name' => 'required|string|max:255',
        'brand' => 'required|string|max:255',
        'model' => 'required|string|max:255',
        'engine_number' => 'required|integer',
        'chassis_number' => 'required|integer|max:255',
        'vehicle_type' => 'required|string|in:sedan,truck,motorcycle,bus,other',
        'capacity' => 'required|integer|min:1',
        'location' => 'required|string|max:255',
        'year_acquired' => 'nullable|digits:4|integer|min:1900|max:' . date('Y'),
        'category' => 'required|string|in:light vehicle,heavy vehicle',
        'plate_number' => 'required|string|max:20|unique:vehicles,plate_number,' . $this->vehicle->vehicle_id . ',vehicle_id',
        'fuel_type' => 'required|string|in:diesel,gasoline',
        'status' => 'required|string|in:available,in use,under maintenance,retired',
    ];
}

}
