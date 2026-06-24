<?php

namespace App\Services;

use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtService
{
    public static function generate(User $user): string
    {
        $now = time();

        $payload = [
            'iss' => config('app.url'),
            'iat' => $now,
            'nbf' => $now,
            'exp' => $now + (config('jwt.ttl') * 60),
            'sub' => (string) $user->id,
            'name' => $user->name,
            'username' => $user->username,
            'role' => $user->role,
        ];

        return JWT::encode($payload, config('jwt.secret'), 'HS256');
    }

    public static function decode(string $token): ?object
    {
        try {
            return JWT::decode($token, new Key(config('jwt.secret'), 'HS256'));
        } catch (\Throwable $e) {
            return null;
        }
    }
}