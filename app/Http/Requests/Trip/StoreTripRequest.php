<?php

namespace App\Http\Requests\Trip;

use Illuminate\Foundation\Http\FormRequest;

class StoreTripRequest extends FormRequest
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
            //'trip_number' => ['required', 'integer'],
            'date_filed' => ['required', 'date'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'purpose' => ['required', 'string', 'max:255'],
            'destination' => ['required', 'string', 'max:255'],
            'departure_time' => ['required', 'date_format:H:i'],
            // 'vehicle_id' => ['required', 'integer', 'exists:vehicles,vehicle_id'],
            // 'driver_id' => ['required', 'integer', 'exists:users,id'],
            //'status' => ['required', 'string', 'in:pending,approved,ongoing,completed,cancelled'],
            'passengers' => 'array',
            'passengers.*.name' => 'required|string|max:255',
            'passengers.*.affiliation' => 'nullable|string|max:255',
            'passengers.*.contact_number' => 'nullable|string|max:255',
            'passengers.*.is_party_head' => 'required|boolean',
        ];
    }
}
