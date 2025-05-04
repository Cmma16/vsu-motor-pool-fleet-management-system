<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Part>
 */
class PartFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'part_name' => $this->faker->word(),
            'stock_quantity' => $this->faker->numberBetween(1, 100),
            'unit' => $this->faker->randomElement(['piece', 'set', 'box', 'liter']),
            'unit_price' => $this->faker->randomFloat(2, 1, 1000),
            'restock_threshold' => $this->faker->numberBetween(1, 20),
        ];
    }
}
