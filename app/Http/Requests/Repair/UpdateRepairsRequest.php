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
            'request_id' => ['required', 'integer', 'exists:service_requests,request_id'],
            'performed_by' => ['required', 'integer', 'exists:users,id'],
            'confirmed_by' => ['required', 'integer', 'exists:users,id'],
            'description' => ['required', 'string', 'max:255'],
            'status' => ['required', 'string', 'in:pending,ongoing,completed,cancelled'],
        ];
    }
}
