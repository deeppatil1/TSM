<?php

namespace App\Http\Requests;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserValidateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

   public function rules(): array
{
    $userId = optional($this->userFromRoute())->id;

    return [
        'name' => 'required|string|max:255',
        'email' => [
            'required', 
            'email',
            Rule::unique('users', 'email')->ignore($userId)
        ],
        'password' => $this->isMethod('post') ? 'required|string|min:6' : 'sometimes',
        ...$this->clientSpecificRules(),
        'role' => ['required', Rule::in(array_column(Role::cases(), 'value'))],
    ];
}

protected function userFromRoute(): ?User
{
    $param = $this->route('id') ?? $this->route('user');
    return $param instanceof User ? $param : null;
}

protected function clientSpecificRules(): array
{
    if ($this->input('role') !== Role::CLIENT->value) {
        return [];
    }

    return [
        'client_company' => 'required|string|max:255',
        'company_number' => 'required|string|max:20',
    ];
}

    public function messages(): array
    {
        return [
            'name.required'     => 'The name field is required.',
            'email.required'    => 'The email field is required.',
            'email.unique'      => 'This email is already in use.',
            'password.required' => 'The password field is required.',
            'password.min'     => 'The password must be at least 6 characters.',
            'role.required'    => 'The role field is required.',
        ];
    }
    
}