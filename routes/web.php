<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route to render the TestComponents page
    Route::get('/test', function () {
        return Inertia::render('Users/TestComponents');
    })->name('test.components'); // Optional: give it a name
});

Route::resource('users', UserController::class)->middleware(['auth', 'role:Admin']); 


// Route::resource('projects', ProjectController::class)
//     ->middleware('auth') 
//     ->middleware('role:Admin')->except(['index']); // Require 'Admin' role for all actions except index

// Route::resource('tasks', TaskController::class);





Route::get('/projects/create', [ProjectController::class, 'create'])
    ->middleware('role:Admin')
    ->name('projects.create');

Route::post('/projects', [ProjectController::class, 'store'])
    ->middleware('role:Admin')
    ->name('projects.store');

Route::get('/projects', [ProjectController::class, 'index'])
    ->middleware('role:Admin,Employee,Client')
    ->name('projects.index');

Route::get('/projects/{project}/edit', [ProjectController::class, 'edit'])
    ->middleware('role:Admin')
    ->name('projects.edit');
Route::put('/projects/{project}', [ProjectController::class, 'update'])
    ->middleware('role:Admin')
    ->name('projects.update');
Route::get('/projects/{project}', [ProjectController::class, 'show'])
    ->middleware('role:Admin,Employee,Client')
    ->name('projects.show');
Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])
    ->middleware('role:Admin')
    ->name('projects.destroy');



Route::get('/tasks', [TaskController::class, 'index'])
    ->middleware('role:Admin,Employee,Client')
    ->name('tasks.index');

Route::get('/tasks/create', [TaskController::class, 'create'])
    ->middleware('role:Admin,Employee')
    ->name('tasks.create');
Route::post('/tasks', [TaskController::class, 'store'])
    ->middleware('role:Admin,Employee')
    ->name('tasks.store');
Route::get('/tasks/{task}', [TaskController::class, 'show'])
    ->middleware('role:Admin,Employee,Client')
    ->name('tasks.show');
Route::get('/tasks/{task}/edit', [TaskController::class, 'edit'])
    ->middleware('role:Admin,Employee')
    ->name('tasks.edit');
Route::put('/tasks/{task}', [TaskController::class, 'update'])
    ->middleware('role:Admin,Employee')
    ->name('tasks.update');
Route::patch('/tasks/{task}', [TaskController::class, 'update'])
    ->middleware('role:Admin,Employee')
    ->name('tasks.patch');
Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])
    ->middleware('role:Admin')
    ->name('tasks.destroy');
















require __DIR__.'/auth.php';
