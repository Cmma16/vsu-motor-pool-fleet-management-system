<?php

namespace App\Http\Requests\ServiceAccomplishments;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceAccomplishmentRequest extends FormRequest
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
            'started_at' => 'required|date',
            'completed_at' => 'required|date|after_or_equal:started_at',
            'conducted_by' => 'required|exists:users,id',
            'verified_by' => 'nullable|exists:users,id',
        ];
    }
}
