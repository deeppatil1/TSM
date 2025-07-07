<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $roles): Response
    {
        $user = $request->user();

        // Split the comma-separated roles string into an array
        $rolesArray = explode(',', $roles);

        if (! $user || ! in_array($user->role, $rolesArray)) { // Use the array here
            abort(403, 'Access denied: insufficient role.');
        }

        return $next($request);
    }
}
