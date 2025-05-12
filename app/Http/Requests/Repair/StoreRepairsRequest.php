<?php

namespace App\Http\Requests\Repair;

use Illuminate\Foundation\Http\FormRequest;

class StoreRepairsRequest extends FormRequest
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
            'request_id' => ['required', 'integer', 'exists:service_requests,request_id'],
            'performed_by' => ['required', 'integer', 'exists:users,id'],
            'confirmed_by' => ['nullable', 'integer', 'exists:users,id'],
            'repair_summary' => ['required', 'string', 'max:255'],
            'odometer_id' => ['nullable', 'integer', 'exists:odometer_logs,odometer_id'],
        ];
    }
}
