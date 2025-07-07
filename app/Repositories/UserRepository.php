<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository
{
    public function __construct(User $user)
    {
        parent::__construct($user);
        $this->user = $user;
    }

    public function getAllUsers()
    {
        return $this->getAll();
        // return $this->user->all();
    }
}
