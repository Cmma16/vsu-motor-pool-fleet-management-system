<?php

namespace App\Http\Requests\Repair;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRepairsRequest extends FormRequest
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
            'vehicle_id' => ['required', 'integer', 'exists:vehicles,vehicle_id'],
            'description' => ['required', 'string', 'max:255'],
            'scheduled_date' => ['required', 'date'],
            'required_by' => ['required', 'date'],
            'urgency_level' => ['required', 'string', 'in:low,medium,high'],
            'assigned_personnel' => ['nullable', 'integer', 'exists:users,id'],
            'status' => ['required', 'string', 'in:pending,in_progress,completed'],
            'requested_by' => ['required', 'integer', 'exists:users,id'],
        ];
    }
}
