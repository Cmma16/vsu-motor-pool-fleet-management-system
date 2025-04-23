<?php

namespace Database\Factories;


use App\Models\Vehicle;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Repairs>
 */
class RepairsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'vehicle_id' => Vehicle::inRandomOrder()->first()->vehicle_id, // Create a new vehicle if needed
            'description' => $this->faker->sentence(),
            'scheduled_date' => $this->faker->date(),
            'required_by' => $this->faker->date(),
            'urgency_level' => $this->faker->randomElement(['low', 'medium', 'high', 'critical']),
            'assigned_personnel' => User::inRandomOrder()->first()->id, // Create a new personnel if needed
            'status' => $this->faker->randomElement(['pending', 'in progress', 'completed', 'cancelled']),
            'requested_by' => User::inRandomOrder()->first()->id, // Assuming requested_by refers to a user
        ];
    }
}
