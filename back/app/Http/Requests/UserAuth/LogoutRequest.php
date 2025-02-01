<?php

namespace App\Http\Requests\UserAuth;

use App\Traits\HasBearerToken;
use Illuminate\Foundation\Http\FormRequest;

class LogoutRequest extends FormRequest
{
    use HasBearerToken;

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
            // 'token' => 'required|string|min:8',
        ];
    }
}
