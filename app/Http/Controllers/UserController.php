<?php

namespace App\Http\Controllers;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Profile; // Assuming a Profile model exists and User has a profile relationship


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        // Add auth middleware to protect the store method
        $this->middleware('auth')->only(['index', 'store']);
    }

    public function index()
    {
        // $users = $this->userRepository->getAllUsers();
        // return response()->json($users);

         return Inertia::render('Profile/AddUser');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user(); // $user is guaranteed to be a valid User model here due to 'auth' middleware

        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role'     => 'required|in:Admin,Client,Employee',
        ]);

        $newUser = User::create([
            'id'         => Str::uuid()->toString(),
            'name'       => $validated['name'],
            'email'      => $validated['email'],
            'password'   => Hash::make($validated['password']),
            'role'       => $validated['role'],
            'created_by' => $user->id, // Use $user->id directly as $user is authenticated
        ]);


        // Pass the newly created user (potentially with relationships loaded) to the Welcome component
        // The client-side Welcome component should expect a 'user' prop.
        return Inertia::render('Welcome', [
            'user' => $newUser,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}


