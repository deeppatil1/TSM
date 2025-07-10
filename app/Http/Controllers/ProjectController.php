<?php

namespace App\Http\Controllers;
use App\Repositories\ProjectRepository;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth; 

class ProjectController extends Controller
{
    public function __construct(protected ProjectRepository $projectRepository)
    {
        $this->middleware('auth')->only(['index', 'store', 'create', 'edit', 'update', 'destroy']);
    }

    public function index()
    {   
        $projects = $this->projectRepository->getAll(relations: ['client']); 

        return Inertia::render('Projects/AllProjects', [
            'projects' => $projects,
        ]);
    }

    public function create()
    {
       $clients = User::where('role', 'Client')->get(['id', 'name']);
       $employees = User::where('role', 'Employee')->get(['id', 'name']); 

       return Inertia::render('Projects/ProjectForm', [
        'type' => 'create',
        'clients' => $clients,
        'employees' => $employees, 
    ]);
    }

    public function store(StoreProjectRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['created_by'] = Auth::id();
        $validatedData['updated_by'] = Auth::id();
        $employeeId = $validatedData['employee_id'];
        unset($validatedData['employee_id']); 
        
        $project = $this->projectRepository->addProject($validatedData);

        if ($employeeId) {
            $project->employees()->attach($employeeId);
        }

        return redirect()->route('projects.index')
            ->with('success', 'Project created successfully.');
    }

    public function show(Project $project)
    {
       //
    }

    public function edit(Project $project)
    {
        $clients = User::where('role', 'Client')->get(['id', 'name']);
        $employees = User::where('role', 'Employee')->get(['id', 'name']);

        return Inertia::render('Projects/ProjectForm', [
            'type' => 'edit',
            'project' => $project,
            'clients' => $clients,
            'employees' => $employees,
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $validatedData = $request->validated();
        $validatedData['updated_by'] = Auth::id();

        $this->projectRepository->updateProject($project, $validatedData);

        if (isset($validatedData['employee_id'])) {
            $employeeId = $validatedData['employee_id'];
            $project->employees()->sync([$employeeId]);
        } else {
            $project->employees()->detach();
        }

        return redirect()->route('projects.index')
            ->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $this->projectRepository->destroy($project->id);

        return redirect()->route('projects.index')
            ->with('success', 'Project deleted successfully.');
    }
}
