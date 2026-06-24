<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Services\JwtService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JwtAuthenticate
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (! $token) {
            return response()->json(['message' => 'توکن ارسال نشده است.'], 401);
        }

        $payload = JwtService::decode($token);

        if (! $payload) {
            return response()->json(['message' => 'توکن نامعتبر یا منقضی شده است.'], 401);
        }

        $user = User::find($payload->sub);

        if (! $user) {
            return response()->json(['message' => 'کاربر پیدا نشد.'], 401);
        }

        $request->setUserResolver(fn () => $user);

        return $next($request);
    }
}