<?php

namespace App\Models;

use Illuminate\Support\Str;
use App\Enums\Role;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    protected $keyType = 'string';
    public $incrementing = false; // Add this line
    protected $casts = [
        'role' => Role::class,
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    use HasFactory, Notifiable;

    protected $fillable = ['id', 'name', 'email', 'password', 'role', 'created_by'];


    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function clientDetail(): HasOne
    {
        return $this->hasOne(ClientDetail::class);
    }

    public function createdProjects(): HasMany
    {
        return $this->hasMany(Project::class, 'created_by');
    }

    public function updatedProjects(): HasMany
    {
        return $this->hasMany(Project::class, 'updated_by');
    }

    public function projectsAsClient(): HasMany
    {
        return $this->hasMany(Project::class, 'client_id');
    }

    public function assignedTasks(): HasMany
    {
        return $this->hasMany(Task::class, 'assigned_to');
    }

    public function createdTasks(): HasMany
    {
        return $this->hasMany(Task::class, 'created_by');
    }

    public function updatedTasks(): HasMany
    {
        return $this->hasMany(Task::class, 'updated_by');
    }

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'project_employees', 'user_id', 'project_id');
    }
}
