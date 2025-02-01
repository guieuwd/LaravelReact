<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class UserLogoutTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_logout_success(): void
    {
        $sign_in = $this->signIn();

        $access_token = $sign_in['data']['access_token'];

        $response = $this
            ->withHeader('Authorization', $access_token)
            ->postJson($this->getApiUrl('auth-logout'));

        $response
            ->assertStatus(200)
            ->assertJson([
                'message' => 'logged out',
            ]);
    }

    public function test_user_login_unauthorized(): void
    {
        $response = $this->postJson($this->getApiUrl('auth-logout'), ['access_token' => Str::random()]);

        // 401
        $response->assertUnauthorized();
    }
}
