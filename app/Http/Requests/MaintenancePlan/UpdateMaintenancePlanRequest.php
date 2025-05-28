<?php

namespace App\Http\Requests\MaintenancePlan;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMaintenancePlanRequest extends FormRequest
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
            'vehicle_id' => 'required|exists:vehicles,vehicle_id',
            'scheduled_date' => 'required|date',
            'description' => 'required|string|max:255',
            'created_by' => 'required|exists:users,id',
            'status' => 'required|string|in:pending,scheduled,completed,cancelled',
        ];
    }
}
