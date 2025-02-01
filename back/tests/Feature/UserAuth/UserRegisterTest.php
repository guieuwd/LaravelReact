<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserRegisterTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_registeration_success(): void
    {
        $response = $this->postJson(
            $this->getApiUrl('auth-register'),
            [
                'name' => fake()->name(),
                'email' => fake()->unique()->safeEmail(),
                'password' => Hash::make('password'),
            ]
        );

        $response
            ->assertStatus(200)
            ->assertJson([
                'message' => 'User Created ',
            ]);
    }

    public function test_user_registeration_invalid_required(): void
    {
        $response = $this->postJson(
            $this->getApiUrl('auth-register'),
            [
                'name' => fake()->name(),
                'email' => fake()->unique()->safeEmail(),
            ]
        );

        $response
            ->assertStatus(422)
            ->assertJson([
                'message' => 'The password field is required.',
            ]);
    }

    public function test_resend_same_user_registration(): void
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
            $this->getApiUrl('auth-register'),
            [
                'email' => $user_params['email'],
                'password' => $user_params['password'],
            ]
        );

        $response->assertStatus(422);
    }
}
