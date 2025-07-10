<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\ClientDetail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Enums\Role;

class UserRepository extends BaseRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    public function AddUser(array $data)
    {
        $userId = Auth::id();

        $userData = [
            'id' => Str::uuid()->toString(),
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => $data['role'],
            'created_by' => $userId,
            'updated_by' => $userId,
        ];


        $user = $this->model->create($userData);


        if ($user->role === Role::CLIENT) {
            ClientDetail::create([
               'id' => Str::uuid()->toString(),
                'user_id' => $user->id, // Remove (string) cast
                'company_name' => $data['client_company'],
                'contact_number' => $data['company_number'],
            ]);
        }

        return $user;
    }

    public function UpdateUser($id, array $data)
    {
        $user = $this->model->findOrFail($id);

        $updateData = [
            'name' => $data['name'],
            'email' => $data['email'],
            'role' => $data['role'],
            'updated_by' => Auth::id(),
        ];

        $user->update($updateData);

        if ($user->role === Role::CLIENT) {
            // Use firstOrNew to find or create the client detail
            $clientDetail = $user->ClientDetail()->firstOrNew(['user_id' => $user->id]);
            // Remove explicit 'id' generation, model's boot method handles it for new records
            $clientDetail->user_id = $user->id; // Ensure user_id is set
            $clientDetail->company_name = $data['client_company'];
            $clientDetail->contact_number = $data['company_number'];
            $clientDetail->save(); // Save or update the record
        } else {
            // If role is not Client, delete any existing ClientDetail
            if ($user->ClientDetail) {
                $user->ClientDetail->delete();
            }
        }

        return $user;
    }
}