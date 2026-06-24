<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\ProfileResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    // ===================================================
    // بخش خودِ کاربر لاگین‌شده (پروفایل خودش)
    // ===================================================

    /**
     * GET /api/profile
     */
    public function profile(Request $request)
    {
        return new ProfileResource($request->user());
    }

    /**
     * PUT /api/profile
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'username' => ['sometimes', 'string', 'max:255', Rule::unique('users', 'username')->ignore($user->id)],
        ]);

        $user->update($data);

        return new ProfileResource($user);
    }

    /**
     * POST /api/change-mypassword
     */
    public function changeMyPassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', 'string'],
            'new_password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        $user = $request->user();

        if (! Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'رمز عبور فعلی صحیح نیست.',
            ], 422);
        }

        // به دلیل فعال بودن cast در مدل، نیازی به Hash::make نیست
        $user->update([
            'password' => $request->new_password,
        ]);

        return response()->json([
            'message' => 'رمز عبور با موفقیت تغییر کرد.',
        ]);
    }

    // ===================================================
    // بخش مدیریت کاربران توسط ادمین
    // ===================================================

    /**
     * GET /api/users
     */
    public function index(Request $request)
    {
        $users = User::query()
            ->latest()
            ->paginate($request->per_page ?? 12);

        return UserResource::collection($users);
    }

    /**
     * GET /api/users/{user}
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * POST /api/admin/users
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'unique:users,username'],
            'password' => ['required', 'string', 'min:6'],
            'role' => ['required', 'in:admin,user'],
        ]);

        $user = User::create($data);

        return new UserResource($user);
    }

    /**
     * PUT /api/users/{user}
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'username' => ['sometimes', 'string', 'max:255', Rule::unique('users', 'username')->ignore($user->id)],
            'role' => ['sometimes', 'in:admin,user'],
        ]);

        $user->update($data);

        return new UserResource($user);
    }

    /**
     * DELETE /api/users/{user}
     */
    public function destroy(Request $request, User $user)
    {
        if ($request->user()->id === $user->id) {
            return response()->json([
                'message' => 'شما نمی‌توانید حساب خودتان را حذف کنید.',
            ], 422);
        }

        $user->delete();

        return response()->noContent();
    }

    /**
     * POST /api/users/{user}/change-password
     */
    public function changePassword(Request $request, User $user)
    {
        $data = $request->validate([
            'new_password' => ['required', 'string', 'min:6'],
        ]);

        $user->update([
            'password' => $data['new_password'],
        ]);

        return response()->json([
            'message' => 'رمز عبور کاربر با موفقیت تغییر کرد.',
        ]);
    }
}