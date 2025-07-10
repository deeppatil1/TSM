<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;

class TaskRepository extends BaseRepository
{
    public function __construct(Task $model)
    {
        parent::__construct($model);
    }

    public function AddTask(array $data): Task
    {
        return $this->model->create($data);
    }

    public function UpdateTask(string $id, array $data): ?Task
    {
        $task = $this->model->find($id);
        if ($task) {
            $task->update($data);
            return $task;
        }
        return null;
    }
}
