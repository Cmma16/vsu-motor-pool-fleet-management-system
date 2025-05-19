<?php

namespace Database\Factories;

use App\Models\Vehicle;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceRequest>
 */
class ServiceRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'vehicle_id' => Vehicle::inRandomOrder()->first()->vehicle_id,
            'requested_by' => User::inRandomOrder()->first()->id,
            'date_filed' => $this->faker->dateTimeThisYear(),
            'service_type' => $this->faker->randomElement(['maintenance', 'repair']),
            'work_description' => $this->faker->sentence(),
            'date_received' => $this->faker->dateTimeThisYear(),
            'received_by' => User::inRandomOrder()->first()->id,
            'status' => $this->faker->randomElement(['pending', 'received', 'inspected', 'approved', 'completed', 'cancelled']),
        ];
    }
}
