<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    /**
     * A basic functional test example.
     */
    public function test_making_an_api_request(): void
    {
        $sign_in = $this->signIn();
        $user = $sign_in['data']['user'];

        $response = $this->actingAs($user)
            ->getJson('/api/user', ['name' => $user->name]);

        $response
            ->assertStatus(200)
            ->assertJson([
                'name' => $user->name,
            ]);
    }
}
