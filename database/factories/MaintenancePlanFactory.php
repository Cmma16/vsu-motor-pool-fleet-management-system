<?php

namespace Database\Factories;

use App\Models\Vehicle;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MaintenancePlan>
 */
class MaintenancePlanFactory extends Factory
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
            'scheduled_date' => $this->faker->dateBetween('now', '+1 year'),
            'next_service_km' => $this->faker->numberBetween(1000, 20000),
            'created_by' => User::inRandomOrder()->first()->id, // Create a new personnel if needed
            'status' => $this->faker->randomElement(['pending', 'scheduled', 'completed', 'cancelled']),
        ];
    }
}
