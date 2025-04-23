<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'contact_number' => [
                'required',
                'string',
                'max:255',
                'regex:/^(09|\+639)\d{9}$/',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'province' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'barangay' => ['required', 'string', 'max:255'],
            'address_details' => ['nullable', 'string', 'max:255'],
            //not sure with this
            // 'role' => ['required', 'string', 'max:255'],
            // 'role' => ['required', 'string', 'max:255', Rule::in(['admin', 'driver', 'mechanic', 'staff'])],
            'role' => ['nullable', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
        ];
    }
}
