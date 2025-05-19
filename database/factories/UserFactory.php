<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\UserRole;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName(),
            'middle_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'contact_number' => $this->faker->phoneNumber(),
            'province' => 'Leyte',
            'city' => $this->faker->randomElement([
                'Baybay City',
                'Carigara',
                'Dagami',
                'Dulag',
                'Hilongos',
                'Inopacan',
                'Jaro',
                'Julita',
                'La Paz',
                'Leyte',
                'Macarthur',
                'Mahaplag',
                'Malitbog',
                'Matag-ob',
                'Matalom',
                'Palo',
                'San Isidro',
                'San Miguel',
                'Santa Fe',
                'Tabango',
            ]),
            'barangay' => $this->faker->randomElement([
                'Opong',
                'San Roque',
                'Telegrafo',
                'Olot',
                'Burak',
            ]),
            'address_details' => $this->faker->streetAddress(),
            'role_id' => UserRole::first()?->role_id ?? UserRole::factory()->create()->role_id,
            'email' => fake()->unique()->safeEmail(),
            'is_verified' => $this->faker->boolean(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            // 'name' => fake()->name(),
            // 'email' => fake()->unique()->safeEmail(),
            // 'email_verified_at' => now(),
            // 'password' => static::$password ??= Hash::make('password'),
            // 'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_verified' => false,
        ]);
    }
}
