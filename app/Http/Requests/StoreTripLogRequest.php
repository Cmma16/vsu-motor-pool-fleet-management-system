<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTripLogRequest extends FormRequest
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
            'trip_id' => 'required|exists:trips,trip_id',
            'received_at' => 'required|date',
            'pre_trip_condition' => 'required|string',
            'departure_time_actual' => 'required|date_format:H:i',  
            'odometer_out' => 'required|exists:odometer_logs,odometer_id',  
            // 'date_returned' => 'nullable|date',
            // 'post_trip_condition' => 'nullable|string',
            // 'arrival_time' => 'nullable|date_format:H:i',  
            // 'odometer_in' => 'nullable|exists:odometer_logs,odometer_id', 
        ];
    }
}
