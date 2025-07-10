<?php

namespace App\Repositories;

use App\Models\Project;
use App\Repositories\BaseRepository;

class ProjectRepository extends BaseRepository
{
    public function __construct(Project $model)
    {
        parent::__construct($model);
    }

    public function addProject(array $data): Project
    {
        return $this->model->create($data);
    }

    public function updateProject(Project $project, array $data): bool
    {
        return $project->update($data);
    }
}


