<?php

namespace App\Http\Requests\ServiceRequests;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequestRequest extends FormRequest
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
            // 'requested_by' => ['required', 'integer', 'exists:users,id'], delete this
            'date_filed' => ['required', 'date'],
            'service_type' => ['required', 'string', 'max:255'],
            'work_description' => ['required', 'string', 'max:255'],
            // 'received_by' => ['nullable', 'integer', 'exists:users,id'], delete this
            // 'date_received' => ['nullable', 'date'], delete this
            // 'status' => ['required', 'string', 'in:pending,received,cancelled'], delete this
        ];
    }
}
