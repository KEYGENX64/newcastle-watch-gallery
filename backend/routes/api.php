<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('oauth')->group(function () {
    Route::post('/sign-in', [AuthController::class, 'signIn']);
    Route::post('/register', [AuthController::class, 'register']);

    Route::middleware('jwt')->group(function () {
        Route::put('/sign-in-token', [AuthController::class, 'signInWithToken']);
        Route::delete('/sign-out', [AuthController::class, 'signOut']);
    });
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/detail/{product}', [ProductController::class, 'detail']);
Route::get('/categories', [CategoryController::class, 'index']);

Route::middleware(['jwt', 'is_admin'])->group(function () {
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
    Route::get('/products/{product}', [ProductController::class, 'show']);

    
    Route::get('/categories/{category}', [CategoryController::class, 'show']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
    Route::post('/users/{user}/change-password', [UserController::class, 'changePassword']);
});

Route::middleware('jwt')->group(function () {
    Route::get('/profile', [UserController::class, 'profile']);
    Route::put('/profile', [UserController::class, 'updateProfile']);
    Route::post('/change-mypassword', [UserController::class, 'changeMyPassword']);
});





