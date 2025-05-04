<?php

namespace App\Http\Requests\ServiceInspections;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceInspectionRequest extends FormRequest
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
            'request_id' => ['required', 'integer', 'exists:service_requests,request_id'],
            'started_at' => ['required', 'date'],
            'completed_at' => ['nullable', 'date', 'after_or_equal:started_at'],
            'parts_available' => ['required', 'boolean'],
            'personnel_available' => ['required', 'boolean'],
            'estimated_duration' => ['required', 'string', 'max:25'],
            'conducted_by' => ['required', 'integer', 'exists:users,id'],
            'confirmed_by' => ['nullable', 'integer', 'exists:users,id'],
        ];
    }
}
