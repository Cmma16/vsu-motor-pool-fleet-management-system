<?php

namespace Database\Factories;

use App\Models\Vehicle;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OdometerLog>
 */
class OdometerLogFactory extends Factory
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
            'reading' => $this->faker->numberBetween(1000, 200000),
            'logged_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'recorded_by' => User::inRandomOrder()->first()->id,
        ];
    }
}
