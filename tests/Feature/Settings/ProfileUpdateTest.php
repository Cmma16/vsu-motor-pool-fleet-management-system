<?php

namespace Tests\Feature\Settings;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_page_is_displayed()
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/settings/profile');

        $response->assertOk();
    }

    public function test_profile_information_can_be_updated()
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch('/settings/profile', [
                'first_name' => 'John',
                'middle_name' => 'Smith',
                'last_name' => 'Doe',
                'contact_number' => '09123456789',
                'province' => 'Leyte',
                'city' => 'Baybay City',
                'barangay' => 'Opong',
                'address_details' => '123 Main St',
                'email' => 'test@example.com',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/settings/profile');

        $user->refresh();

        $this->assertSame('John', $user->first_name);
        $this->assertSame('Smith', $user->middle_name);
        $this->assertSame('Doe', $user->last_name);
        $this->assertSame('09123456789', $user->contact_number);
        $this->assertSame('Leyte', $user->province);
        $this->assertSame('Baybay City', $user->city);
        $this->assertSame('Opong', $user->barangay);
        $this->assertSame('123 Main St', $user->address_details);
        $this->assertSame('test@example.com', $user->email);
    }

    // public function test_email_verification_status_is_unchanged_when_the_email_address_is_unchanged()
    // {
    //     $user = User::factory()->create();

    //     $response = $this
    //         ->actingAs($user)
    //         ->patch('/settings/profile', [
    //             'first_name' => 'John',
    //             'middle_name' => 'Smith',
    //             'last_name' => 'Doe',
    //             'contact_number' => '09123456789',
    //             'province' => 'Leyte',
    //             'city' => 'Baybay City',
    //             'barangay' => 'Opong',
    //             'address_details' => '123 Main St',
    //             'email' => $user->email,
    //         ]);

    //     $response
    //         ->assertSessionHasNoErrors()
    //         ->assertRedirect('/settings/profile');

    //     $this->assertNotNull($user->refresh()->email_verified_at);
    // }

    public function test_user_can_delete_their_account()
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->delete('/settings/profile', [
                'password' => 'password',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/');

        $this->assertGuest();
        $this->assertNull($user->fresh());
    }

    public function test_correct_password_must_be_provided_to_delete_account()
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from('/settings/profile')
            ->delete('/settings/profile', [
                'password' => 'wrong-password',
            ]);

        $response
            ->assertSessionHasErrors('password')
            ->assertRedirect('/settings/profile');

        $this->assertNotNull($user->fresh());
    }
}
