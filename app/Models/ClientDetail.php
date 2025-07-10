<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str; // Import Str

class ClientDetail extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    // Remove 'id' from fillable as it will be generated in the boot method
    protected $fillable = ['id','user_id', 'company_name', 'contact_number'];

    // Add boot method to generate UUIDs
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
