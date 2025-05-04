<?php

namespace Database\Factories;

use App\Models\ServiceRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceInspection>
 */
class ServiceInspectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'request_id' => ServiceRequest::inRandomOrder()->first()->request_id,
            'started_at' => $this->faker->dateTimeThisYear(),
            'completed_at' => $this->faker->dateTimeThisYear(),
            'parts_available' => $this->faker->boolean(),
            'personnel_available' => $this->faker->boolean(),
            'estimated_duration' => $this->faker->numberBetween(1, 10) . ' hours',
            'conducted_by' => User::inRandomOrder()->first()->id,
            'confirmed_by' => User::inRandomOrder()->first()->id,
        ];
    }
}
