<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\JwtService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * POST /api/oauth/sign-in
     */
    public function signIn(Request $request)
    {
        $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('username', $request->username)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'نام کاربری یا رمز عبور اشتباه است.',
            ], 400);
        }

        return response()->json([
            'accessToken' => JwtService::generate($user),
        ]);
    }



    /**
     * PUT /api/oauth/sign-in-token   (نیاز به توکن فعلی معتبر)
     */
    public function signInWithToken(Request $request)
    {
        return response()->json([
            'accessToken' => JwtService::generate($request->user()),
        ]);
    }

    /**
     * DELETE /api/oauth/sign-out
     */
    public function signOut(Request $request)
    {
        // چون JWT روی سرور state نداره، خروج فقط با حذف توکن سمت کلاینت انجام می‌شه.
        return response()->noContent();
    }
}