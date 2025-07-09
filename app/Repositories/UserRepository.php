<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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

        return $this->model->create($userData); 
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

        return $user;
    }
}