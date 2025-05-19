<?php

namespace Database\Factories;

use App\Models\Maintenance;
use App\Models\MaintenancePlan;
use App\Models\ServiceRequest;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\OdometerLog;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Maintenance>
 */
class MaintenanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'plan_id' => MaintenancePlan::inRandomOrder()->first()->plan_id,
            'request_id' => ServiceRequest::inRandomOrder()->first()->request_id,
            'vehicle_id' => Vehicle::inRandomOrder()->first()->vehicle_id,
            'date_completed' => $this->faker->dateTimeBetween('now', '+1 year'),
            'odometer_id' => OdometerLog::inRandomOrder()->first()->odometer_id,
            'performed_by' => User::inRandomOrder()->first()->id,
            'confirmed_by' => User::inRandomOrder()->first()->id,
            'date_confirmed' => $this->faker->dateTimeBetween('now', '+1 year'),
            'maintenance_summary' => $this->faker->sentence(),
        ];
    }
}
