<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

trait Uuids
{
    protected static function bootUuids(): void
    {
        static::creating(function (Model $model) {
            $model->keyType = 'string';
            $model->incrementing = false;

            $model->{$model->getKeyName()} = $model->{$model->getKeyName()} ?: Uuid::uuid4();
        });
    }

    public function getIncrementing(): bool
    {
        return false;
    }

    public function getKeyType(): string
    {
        return 'string';
    }
}
