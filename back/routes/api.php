<?php

use App\Http\Controllers\UserAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Authentication
Route::post('/v1/register', [UserAuthController::class, 'register']);
Route::post('/v1/login', [UserAuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/v1/logout', [UserAuthController::class, 'logout']);
});
