<?php

namespace App\Http\Requests\RepairPart;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRepairPartsRequest extends FormRequest
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
            'repair_id' => ['required', 'integer', 'exists:repairs,repair_id'],
            'part_id' => ['required', 'integer', 'exists:parts,part_id'],
            'quantity_used' => ['required', 'integer', 'min:1'],
        ];
    }
}
