<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Enums\Role;

class CheckRole
{

    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (empty($roles)) {
            abort(403, 'No roles specified for access');
        }

        $user = $request->user();

        if (!$user) {
            abort(401, 'Unauthenticated');
        }


        if (!($user->role instanceof Role)) {
            abort(403, 'Access denied: Invalid role format');
        }

        $userRoleValue = $user->role->value;

        $allowedRoles = [];
        foreach ($roles as $roleString) {
            $splitRoles = explode(',', $roleString);
            $allowedRoles = array_merge($allowedRoles, $splitRoles);
        }

        $allowedRoles = array_map(function ($role) {
            return trim($role);
        }, $allowedRoles);


        if (!in_array($userRoleValue, $allowedRoles)) {
            abort(403, 'Access denied: insufficient role');
        }

        return $next($request);
    }
}
