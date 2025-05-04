<?php

namespace Database\Factories;

use App\Models\ServiceRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceAccomplishment>
 */
class ServiceAccomplishmentFactory extends Factory
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
            'conducted_by' => User::inRandomOrder()->first()->id,
            'verified_by' => User::inRandomOrder()->first()->id,
        ];
    }
}
