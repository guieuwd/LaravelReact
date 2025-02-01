<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserLoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_login_success(): void
    {
        $user_params = [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => Hash::make('password'),
        ];

        $response = $this->postJson(
            $this->getApiUrl('auth-register'),
            $user_params
        );

        $response
            ->assertStatus(200);

        $response = $this->postJson(
            $this->getApiUrl('auth-login'),
            [
                'email' => $user_params['email'],
                'password' => $user_params['password'],
            ]
        );

        $response->assertStatus(200);

        $response_data = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('access_token', $response_data);
    }

    public function test_user_login_fails_invalid_input(): void
    {
        $user_params = [
            'email' => fake()->unique()->safeEmail(),
            'password' => Hash::make('password'),
        ];

        $response = $this->postJson(
            $this->getApiUrl('auth-login'),
            [
                'email' => $user_params['email'],
                'password' => $user_params['password'],
            ]
        );

        $response->assertStatus(422);
    }
}
