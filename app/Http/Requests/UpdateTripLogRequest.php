<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTripLogRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Get the trip log from the route parameter
        $tripLog = $this->route('tripLog');
        
        // Store the trip log for use in validation rules
        $this->tripLog = $tripLog;
        
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        
        // If this is a post-trip completion (odometer_in is not set)
        if (!$this->tripLog || !$this->tripLog->odometer_in) {
            return [
                'date_returned' => 'required|date',
                'post_trip_condition' => 'required|string',
                'arrival_time' => 'required|date_format:H:i',
                'odometer_reading' => 'required|integer|min:0',
                'odometer_in' => 'required|exists:odometer_logs,odometer_id',
            ];
        }

        // If this is a full edit of a completed trip
        return [
            'received_at' => 'required|date',
            'pre_trip_condition' => 'required|string',
            'departure_time_actual' => 'required|date_format:H:i:s',
            'odometer_out' => 'required|exists:odometer_logs,odometer_id',
            'date_returned' => 'required|date',
            'post_trip_condition' => 'required|string',
            'arrival_time' => 'required|date_format:H:i',
            'odometer_in' => 'required|exists:odometer_logs,odometer_id',
        ];
    }
}
