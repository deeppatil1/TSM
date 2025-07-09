<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\UserRepository;
use App\Http\Requests\UserValidateRequest;
use Inertia\Inertia;
use App\Enums\Role;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct(public UserRepository $userRepository)
    {
        $this->middleware('auth')->only(['index', 'store', 'create', 'edit', 'update', 'destroy']);
    }

    public function index()
    {
        try {
            $users = $this->userRepository->getAll();
            return Inertia::render('Users/ViewUsers', ['users' => $users]);
        } catch (\Exception $e) {
            abort(503);
        }
    }

    public function create()
    {
        try {
            return Inertia::render('Users/UserForm', [
                'type' => 'create',
                'roles' => array_column(Role::cases(), 'value')
            ]);
        } catch (\Exception $e) {
            abort(503);
        }
    }
    public function store(UserValidateRequest $request)
    {
        try {
            $newUser = $this->userRepository->store($request->validated());
            return Inertia::render('Users/ViewUsers', ['user' => $newUser]);
        } catch (\Exception $e) {
            abort(503);
        }
    }


    public function update(UserValidateRequest $request, string $id)
    {
        try {
            $this->userRepository->update($id, $request->validated());
            return redirect()->route('users.index')->with('success', 'User updated successfully.');
        } catch (\Exception $e) {
            abort(503);
        }
    }

    public function show(string $id)
    {
        abort(503);
    }

    public function edit(User $user)
    {
        try {
            return Inertia::render('Users/UserForm', [
                'type' => 'edit',
                'user' => $user,
                'roles' => array_column(Role::cases(), 'value')
            ]);
        } catch (\Exception $e) {
            abort(503);
        }
    }



    public function destroy(string $id)
    {
        try {
            $this->userRepository->destroy($id);
            return redirect()->route('users.index')->with('success', 'User deleted successfully.');
        } catch (\Exception $e) {
            abort(503);
        }
    }
}
