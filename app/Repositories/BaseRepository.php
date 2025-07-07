<?php

namespace App\Repositories;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

abstract class BaseRepository implements RepositoryInterface
{
    protected Model|Builder $model;

    /**
     * Create a new repository instance.
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function exists(string $key, $value, bool $withTrashed = false): bool
    {
        $query = $this->model->where($key, $value);
        if ($withTrashed) {
            $query = $query->hasMacro('withTrashed') ? $query->withTrashed() : $query;
        }

        return $query->exists();
    }

    public function getByAttribute(
        string $attr_name,
        mixed $attr_value,
        array $relations = [],
        bool $withTrashed = false,
        array $selects = []
    ): Builder|Model|null {
        $query = $this->initiateQuery($relations, $withTrashed, $selects);

        return $query->where($attr_name, $attr_value)->first();
    }

    private function initiateQuery(array $relations = [], bool $withTrashed = false, array $selects = []): Model|Builder
    {
        $query = $this->model;
        if (count($relations) > 0) {
            $query = $query->with($relations);
        }

        if (count($selects) > 0) {
            $query = $query->select($selects);
        }

        if ($withTrashed) {
            $query = $query->hasMacro('withTrashed') ? $query->withTrashed() : $query;
        }

        return $query;
    }

    public function getPaginate(?int $n = null, array $relations = [], bool $withTrashed = false, array $selects = []): LengthAwarePaginator
    {
        $query = $this->initiateQuery($relations, $withTrashed, $selects);

        return $query->paginate($n);
    }

    public function store(array $inputs): Model|null|Builder
    {
        return $this->model->create($inputs);
    }

    public function search($key, $value, array $relations = [], bool $withTrashed = false, array $selects = []): array|Collection|EloquentCollection
    {
        $query = $this->initiateQuery($relations, $withTrashed, $selects);

        return $query->where($key, 'like', '%' . $value . '%')
            ->get();
    }

    public function getAll(array $relations = [], bool $withTrashed = false, array $selects = []): array|Collection|EloquentCollection
    {
        $query = $this->initiateQuery($relations, $withTrashed, $selects);

        return $query->get();
    }

    public function countAll(bool $withTrashed = false): int
    {
        $query = $this->model;
        if ($withTrashed) {
            $query = $query->hasMacro('withTrashed') ? $query->withTrashed() : $query;
        }

        return $query->count();
    }

    public function getAllSelectable($key, string $attr = 'id'): Collection
    {
        return $this->model->pluck($key, $attr);
    }

    public function update($id, array $inputs): mixed
    {
        $model = $this->getById($id);
        if ($model) {
            $model->update($inputs);

            return $model->fresh();
        } else {
            return null;
        }
    }

    public function getById($id, array $relations = [], bool $withTrashed = false, array $selects = []): Model|EloquentCollection|static|null
    {
        $query = $this->initiateQuery($relations, $withTrashed, $selects);
        return $query->find($id);
    }

    public function destroy($id): bool
    {
        $data = $this->getById($id);

        return $data ? $data->delete() : false;
    }

    public function destroyAll(): bool
    {
        return $this->model->delete();
    }

    public function forceDelete($id): bool
    {
        $data = $this->getById($id, [], true);

        return $data ? $data->forceDelete() : false;
    }

    public function restore($id): bool
    {
        $data = $this->getById($id, [], true);

        return $data ? $data->restore() : false;
    }

    public function destroyByIds(array $ids): mixed
    {
        return $this->model->newQuery()->whereIn('id', $ids)->delete();
    }

    public function newQuery(): Builder
    {
        return $this->model->newQuery();
    }

    public function updateOrCreate(array $values, array $key = []): Model|Builder
    {
        return $this->newQuery()
            ->updateOrCreate(
                $key,
                $values
            );
    }

    public function insert(array $values): array|bool
    {
        return $this->model->insert($values);
    }
}
