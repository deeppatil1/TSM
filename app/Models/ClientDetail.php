<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; // Assuming client details will have factories
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClientDetail extends Model
{
    use HasFactory; // Add HasFactory

    protected $keyType = 'string';
    protected $fillable = ['id','user_id', 'company_name', 'contact_number'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
