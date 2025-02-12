<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect('/login')->with('error', 'You must be logged in to access this page.');
        }

        if (Auth::user()->role !== 'admin') {
            return redirect('/products')->with('error', 'You do not have access to this page.');
        }

        return $next($request);
    }
}
