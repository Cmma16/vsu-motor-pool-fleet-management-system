<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicle>
 */
class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'asset_tag' => $this->faker->unique()->regexify('[A-Z0-9]{8}'),
            'vehicle_name' => $this->faker->randomElement([
                'Toyota Corolla', 
                'Honda Civic', 
                'Ford F-150', 
                'Nissan Sentra', 
                'Chevrolet Express Van', 
                'Hyundai Tucson', 
                'Isuzu NPR', 
                'Mercedes-Benz Sprinter Van', 
                'Ford Transit Van', 
                'Dodge Ram 1500', 
                'Mitsubishi L300', 
                'Volvo Bus', 
                'Mercedes-Benz Citaro', 
                'International Harvester Fire Truck', 
                'Pierce Arrow XT Fire Truck'
            ]),
            'brand' => $this->faker->randomElement(['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan']),
            'model' => $this->faker->word(),
            'engine_number' => $this->faker->unique()->numberBetween(100000, 999999),
            'chassis_number' => $this->faker->unique()->numberBetween(100000, 999999),
            'vehicle_type' => $this->faker->randomElement(['sedan', 'truck', 'motorcycle', 'bus', 'other']),
            'capacity' => $this->faker->numberBetween(2, 50),
            'location' => $this->faker->city(),
            'year_acquired' => $this->faker->year(),
            'category' => $this->faker->randomElement(['light vehicle', 'heavy vehicle']),
            'plate_number' => strtoupper($this->faker->bothify('???-####')),
            // 'odometer_reading' => $this->faker->numberBetween(0, 500000),
            'fuel_type' => $this->faker->randomElement(['gasoline', 'diesel']),
            'status' => $this->faker->randomElement(['available', 'in use', 'under maintenance', 'retired']),
        ];
    }
}
