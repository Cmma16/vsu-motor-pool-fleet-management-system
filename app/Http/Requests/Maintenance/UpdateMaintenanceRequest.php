<?php

namespace App\Http\Requests\Maintenance;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMaintenanceRequest extends FormRequest
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
            'plan_id' => 'required|exists:maintenance_plans,plan_id',
            'request_id' => 'required|exists:service_requests,request_id',
            'vehicle_id' => 'required|exists:vehicles,vehicle_id',
            'date_completed' => 'nullable|date',
            'odometer_reading' => 'nullable|exists:odometer_logs,odometer_id',
            'performed_by' => 'required|exists:users,id',
            'confirmed_by' => 'required|exists:users,id',
            'date_confirmed' => 'required|date',
            'description' => 'required|string|max:255',
        ];
    }
}
