<?php

namespace App\Http\Requests\ServiceRequests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceRequestRequest extends FormRequest
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
            'requested_by' => ['required', 'integer', 'exists:users,id'],
            'date_filed' => ['required', 'date'],
            'service_type' => ['required', 'string', 'in:maintenance,repair'],
            'plan_id' => ['required_if:service_type,maintenance', 'nullable', 'integer', 'exists:maintenance_plans,plan_id'],
            'work_description' => ['required', 'string', 'max:255'],
            // 'received_by' => ['nullable', 'integer', 'exists:users,id', 'required_if:status,received,cancelled'],
            // 'date_received' => ['nullable', 'date', 'required_if:status,received,cancelled'],
            // 'status' => ['required', 'string', 'in:pending,received,approved,cancelled,conducted,completed'],
        ];
    }
}
