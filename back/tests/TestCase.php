<?php

namespace Tests;

use App\Models\User;
use App\Traits\HasApiResponse;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;

abstract class TestCase extends BaseTestCase
{
    use HasApiResponse ,RefreshDatabase;

    /**
     * Sign in the given user or create new one if not provided.
     *
     * @param  $user  \App\User
     * @return \App\User
     */
    protected function user($user = null)
    {
        $user = $user ?: User::factory()->create();

        // ['*'] can be defined as [''view-tasks'']
        $user = Sanctum::actingAs($user, ['*']);

        return $user;
    }

    /**
     * Sign in the given user or create new one if not provided.
     *
     * @var array
     *
     * @return \App\User
     */
    protected function signIn($user = [])
    {
        $user_params = [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => Hash::make('password'),
        ];

        $user = $user ? $user : $user_params;

        $response = $this->postJson(
            '/api/v1/register',
            $user
        );

        $response
            ->assertStatus(200);

        $response = $this->postJson(
            '/api/v1/login',
            [
                'email' => $user['email'],
                'password' => $user['password'],
            ]
        );

        $response->assertStatus(200);

        $response_data = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('access_token', $response_data);

        $hashedTooken = $response_data['access_token'];
        $token = PersonalAccessToken::findToken($hashedTooken);

        $user = $token->tokenable;
        Sanctum::actingAs($user, ['*']);

        return $this->success(
            [
                'user' => $user,
                'access_token' => $response_data['access_token'],
            ]
        );
    }

    /**
     * Return API urls from name tags along with its version.
     *
     * @var
     *
     * @return api url
     */
    protected function getApiUrl($name_tag)
    {
        $version = env('API_VERSION', 'v1');

        switch ($name_tag) {
            case 'auth-register':
                return '/api/'.$version.'/register';
                break;
            case 'auth-login':
                return '/api/'.$version.'/login';
                break;
            case 'auth-logout':
                return '/api/'.$version.'/logout';
                break;
            default:
                return '/';
                break;
        }
    }
}
