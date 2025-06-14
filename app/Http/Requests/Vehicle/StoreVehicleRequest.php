<?php

namespace App\Http\Requests\Vehicle;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
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
            // Asset Tag - Ensure it's required, unique in the vehicles table, and a string with a max length
            'asset_tag' => 'required|string|max:255|unique:vehicles,asset_tag',

            // Vehicle Name - Required and should be a string with max length
            'vehicle_name' => 'required|string|max:255',

            // Vehicle brand - Required and should be a string with max length
            'brand' => 'required|string|max:255',

            // Model - Required and should be a string with max length
            'model' => 'required|string|max:255',

            // Engine Number - Required and should be a string with max length
            'engine_number' => 'required|integer',

            // Chassis Number - Required and should be a string with max length
            'chassis_number' => 'required|integer',

            // Vehicle Type - Required and should be a string
            'vehicle_type' => 'required|string|in:sedan,truck,bus,van,pickup,suv',

            // Capacity - Must be a valid integer and a positive number
            'capacity' => 'required|integer|min:1',

            // Location - Should be a string and not required
            'location' => 'required|string|max:255',

            // Year Acquired - Should be a valid year format
            'year_acquired' => 'nullable|digits:4|integer|min:1900|max:' . date('Y'),

            // Category - Should be a string and not required
            'category' => 'required|string|in:light vehicle,medium vehicle,heavy equipment',

            // Plate Number - Should be unique and a string
            'plate_number' => 'required|string|max:20|unique:vehicles,plate_number',

            // Fuel Type - Required and should be one of the defined values (diesel, gasoline)
            'fuel_type' => 'required|string|in:diesel,gasoline',

            // Status - Required and should be one of the defined values (active, inactive, maintenance)
            'status' => 'required|string|in:available,in use,under maintenance,retired',

            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
}
