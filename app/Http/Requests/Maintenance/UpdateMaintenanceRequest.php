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
            'date_in' => 'required|date',
            'date_completed' => 'required|date',
            'odometer_id' => 'required|exists:odometer_logs,odometer_id',
            // 'performed_by' => 'required|exists:users,id',
            // 'confirmed_by' => 'required|exists:users,id',
            'date_confirmed' => 'nullable|date',
            'maintenance_summary' => 'required|string|max:255',
        ];
    }
}
