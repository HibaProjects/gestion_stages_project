<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_etudiants_can_authenticate_and_redirect_to_dashboard(): void
    {
        $etudiant = User::factory()->create(['role_id' => 1]);

        $response = $this->post('/login', [
            'email' => $etudiant->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticatedAs($etudiant);
        $response->assertRedirect(RouteServiceProvider::HOMEEtudiant);
    }

    public function test_formateurs_can_authenticate_and_redirect_to_dashboard(): void
    {
        $formateur = User::factory()->create(['role_id' => 2]);

        $response = $this->post('/login', [
            'email' => $formateur->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticatedAs($formateur);
        $response->assertRedirect(RouteServiceProvider::HOMEFormateur);
    }

    public function test_admins_can_authenticate_and_redirect_to_dashboard(): void
    {
        $admin = User::factory()->create(['role_id' => 3]);

        $response = $this->post('/login', [
            'email' => $admin->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticatedAs($admin);
        $response->assertRedirect(RouteServiceProvider::HOMEAdmin);
    }

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }

    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }
    }