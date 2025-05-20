<?php

namespace App\Http\Requests\MaintenancePart;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMaintenancePartsRequest extends FormRequest
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
            'maintenance_id' => 'required|exists:maintenance,maintenance_id',
            'part_id' => 'required|exists:parts,part_id',
            'quantity_used' => 'required|integer|min:0',
        ];
    }
}
