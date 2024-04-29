<?php

namespace App\Http\Requests;

use App\Exceptions\ValidationException;
use Illuminate\Foundation\Http\FormRequest;

class StoreNewFolderRequest extends FormRequest
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
            'user_id' => 'required|exists:App\Models\User,id',
            'parent_id' => 'nullable|exists:App\Models\Folder,id',
            'name' => 'required|string|max:60'
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'Le champ utilisateur est requis.',
            'user_id.exists' => 'L\'utilisateur spécifié n\'existe pas.',
            'parent_id.exists' => 'Le dossier parent spécifié n\'existe pas.',
            'name.required' => 'Le champ nom est requis.',
            'name.string' => 'Le champ nom doit être une chaîne de caractères.',
            'name.max' => 'Le champ nom ne peut pas dépasser :max caractères.',
        ];
    }
}
