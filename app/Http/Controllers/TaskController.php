<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Repositories\TaskRepository;
use App\Enums\Role;
use App\Enums\Status;
use Inertia\Inertia;
use App\Http\Requests\StoreTaskRequest;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    protected TaskRepository $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function index()
    {
        $tasks = $this->taskRepository->getAll(['project', 'assignedTo', 'createdBy']);
            
        return Inertia::render('Tasks/ViewTasks', [
            'tasks' => $tasks,
        ]);
    }

    public function create()
    {

        $projects = Project::get(['id', 'name']);
        $employees = User::where('role', Role::EMPLOYEE)->get(['id', 'name']);

        return Inertia::render('Tasks/TaskForm', [
            'type' => 'create',
            'projects' => $projects,
            'employees' => $employees,
            'Status' => array_column(Status::cases(), 'value')
        ]);
    }


    public function store(StoreTaskRequest $request)
    {

        $validatedData = $request->validated();
        $validatedData['created_by'] = Auth::id();
        $validatedData['updated_by'] = Auth::id();
        $validatedData['status'] = 'Pending';

        $this->taskRepository->AddTask($validatedData);

        return redirect()->route('tasks.index')->with('success', 'Task created successfully.');
    }

    public function show(string $id)
    {

    }

    public function edit(string $id)
    {
        $task = Task::with(['project', 'assignedTo'])->find($id);

        if (!$task) {
            return redirect()->route('tasks.index')->with('error', 'Task not found.');
        }

        $projects = Project::get(['id', 'name']);
        $employees = User::where('role', Role::EMPLOYEE)->get(['id', 'name']);

        return Inertia::render('Tasks/TaskForm', [
            'type' => 'edit',
            'task' => $task,
            'projects' => $projects,
            'employees' => $employees,
            'Status' => array_column(Status::cases(), 'value')
        ]);
    }

    public function update(StoreTaskRequest $request, string $id)
    {
        $validatedData = $request->validated();
        $validatedData['updated_by'] = Auth::id();

        $this->taskRepository->UpdateTask($id, $validatedData);

        return redirect()->route('tasks.index')->with('success', 'Task updated successfully.');
    }

    public function destroy(Task $task)
    {
        $this->taskRepository->destroy($task->id);

        return redirect()->route('tasks.index')->with('success', 'Task deleted successfully.');
    }
}
