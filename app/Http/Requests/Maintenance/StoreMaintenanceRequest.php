<?php

namespace App\Http\Requests\Maintenance;

use Illuminate\Foundation\Http\FormRequest;

class StoreMaintenanceRequest extends FormRequest
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
            'request_id' => 'required|exists:service_requests,request_id',
            'date_completed' => 'required|date',
            'date_in' => 'required|date',
            'odometer_id' => 'required|exists:odometer_logs,odometer_id',
            'maintenance_summary' => 'required|string|max:255',
        ];
    }
}
