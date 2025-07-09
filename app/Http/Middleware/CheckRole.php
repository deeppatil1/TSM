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
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (empty($roles)) {
            abort(403, 'No roles specified for access');
        }

        $user = $request->user();

        if (!$user) {
            abort(401, 'Unauthenticated');
        }

            if ($user->role !== $role) {
                abort(403, 'Access denied: insufficient role');
            }
                return $next($request);
        

    }
}