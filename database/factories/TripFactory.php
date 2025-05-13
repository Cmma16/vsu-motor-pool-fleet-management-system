<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trip>
 */
class TripFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'trip_number' => $this->faker->unique()->numberBetween(1, 1000),
            'date_filed' => $this->faker->date(),
            'start_date' => $this->faker->dateTimeBetween('now', '+7 days')->format('Y-m-d'),
            'end_date' => $this->faker->dateTimeBetween('now', '+7 days')->format('Y-m-d'),
            'destination' => $this->faker->city(),
            'purpose' => $this->faker->sentence(),
            'departure_time' => $this->faker->time('H:i'),
            'requesting_party' => fake()->name(),
            'vehicle_id' => Vehicle::inRandomOrder()->first()->vehicle_id,
            'driver_id' => User::where('role_id', 3)->inRandomOrder()->first()->id,
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
        ];
    }
}
