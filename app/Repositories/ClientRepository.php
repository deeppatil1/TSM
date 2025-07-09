<?php

namespace App\Repositories;

use App\Models\ClientDetail;

class ClientRepository extends BaseRepository
{
    public function __construct(ClientDetail $model)
    {
        parent::__construct($model); 
    }
}