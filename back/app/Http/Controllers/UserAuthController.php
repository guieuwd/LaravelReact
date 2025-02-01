<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserAuth\LoginRequest;
use App\Http\Requests\UserAuth\LogoutRequest;
use App\Http\Requests\UserAuth\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

class UserAuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $request = $request->validated();

        User::create(
            [
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
            ]
        );

        return response()->json(
            [
            'message' => 'User Created ',
            ]
        );
    }

    public function login(LoginRequest $request)
    {
        $request = $request->validated();

        $user = User::where('email', $request['email'])->first();

        if (! $user || ! Hash::check($request['password'], $user->password)) {
            return response()->json(
                [
                'message' => 'Invalid Credentials',
                ],
                401
            );
        }

        $token = $user->createToken($user->name . '-AuthToken')->plainTextToken;

        return response()->json(
            [
            'access_token' => $token,
            ]
        );
    }

    public function logout(LogoutRequest $request)
    {
        $token = $request->bearerToken();

        $token = PersonalAccessToken::findToken($token);

        $user = $token->tokenable;
        // $user_1 = Auth::guard('sanctum')->user();

        // dd( $user_1->tokens()->get());

        // if ($user->accessToken) {
        //     $user->accessToken->delete();
        // }

        // foreach ($user->tokens as $token) {
        //     $token->delete();
        // }

        $user->tokens()->delete();

        return response()->json(
            [
            'message' => 'logged out',
            ]
        );
    }
}
