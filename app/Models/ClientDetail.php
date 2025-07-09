<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientDetail extends Model
{
    protected $keyType = 'string';
    protected $fillable = ['id','user_id', 'company_name', 'contact_number'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
