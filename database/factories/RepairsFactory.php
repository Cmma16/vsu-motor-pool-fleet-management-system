<?php

namespace Database\Factories;


use App\Models\Vehicle;
use App\Models\User;
use App\Models\ServiceRequest;
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
            'request_id' => ServiceRequest::inRandomOrder()->first()->request_id, // Create a new request if needed
            'performed_by' => User::inRandomOrder()->first()->id, // Create a new personnel if needed
            'confirmed_by' => User::inRandomOrder()->first()->id, // Assuming requested_by refers to a user
            'description' => $this->faker->sentence(),
            'status' => $this->faker->randomElement(['pending', 'ongoing', 'completed', 'cancelled']),
        ];
    }
}
