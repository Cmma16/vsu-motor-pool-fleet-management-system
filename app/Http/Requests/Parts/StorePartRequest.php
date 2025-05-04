<?php

namespace App\Http\Requests\Parts;

use Illuminate\Foundation\Http\FormRequest;

class StorePartRequest extends FormRequest
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
            'part_name' => 'required|string|max:255',
            'stock_quantity' => 'required|integer|min:0',
            'unit' => 'required|string|max:20',
            'unit_price' => 'required|decimal:1,2|min:0',
            'restock_threshold' => 'required|integer|min:0',
        ];
    }
}
