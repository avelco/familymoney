<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTransactionRequest extends FormRequest
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
            'amount' => 'required|numeric|min:0',
            'description' => 'required|string',
            'type' => 'required|in:expense,deposit',
            'date' => 'required|date',
            'allocation_id' => 'nullable|exists:allocations,id',
            'wallet_id' => 'required|exists:wallets,id',
        ];
    }
}
