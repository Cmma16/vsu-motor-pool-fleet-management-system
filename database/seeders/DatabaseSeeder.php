<?php

namespace Database\Seeders;

use App\Models\Repairs;
use App\Models\User;
use App\Models\UserRole;
use App\Models\Vehicle;
use App\Models\ServiceRequest;
use App\Models\OdometerLog;
use App\Models\Trip;
use App\Models\Part;
use App\Models\MaintenancePlan;
use App\Models\Notification;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'Admin'],
            ['name' => 'Manager'],
            ['name' => 'Driver'],
            ['name' => 'Mechanic'],
        ];

        foreach ($roles as $role) {
            UserRole::create($role);
        }

        //User::factory(12)->create();
        User::factory()->create([
            'first_name' => 'Carlos Miguel',
            'middle_name' => 'Maniego',
            'last_name' => 'Advincula',
            'contact_number' => '09999788109',
            'province' => 'Leyte',
            'city' => 'Tolosa',
            'barangay' => 'Opong',
            'address_details' => 'Zone 5',
            'role_id' => 1,
            'is_verified' => true,
            'email' => '1cmadvincula@gmail.com',
            'password' => Hash::make('2fcc3627'),
        ]);
        User::factory()->create([
            'first_name' => 'Carlos Gabriel',
            'middle_name' => 'Maniego',
            'last_name' => 'Advincula',
            'contact_number' => '09999788109',
            'province' => 'Leyte',
            'city' => 'Tolosa',
            'barangay' => 'Opong',
            'address_details' => '',
            'role_id' => 4,
            'is_verified' => true,
            'email' => 'test@gmail.com',
            'password' => Hash::make('password'),
        ]);
        User::factory()->create([
            'first_name' => 'Juan',
            'middle_name' => '',
            'last_name' => 'Dela Cruz',
            'contact_number' => '09123456789',
            'province' => 'Leyte',
            'city' => 'Tolosa',
            'barangay' => 'Poblacion',
            'address_details' => '',
            'role_id' => 3,
            'is_verified' => true,
            'email' => 'juandelacruz@test.com',
            'password' => Hash::make('password'),
        ]);
        User::factory()->create([
            'first_name' => 'Mike',
            'middle_name' => '',
            'last_name' => 'Manager',
            'contact_number' => '09123456789',
            'province' => 'Kahit Saan',
            'city' => 'Dimakita',
            'barangay' => 'Bulalacao',
            'address_details' => '',
            'role_id' => 2,
            'is_verified' => true,
            'email' => 'mikemanager@test.com',
            'password' => Hash::make('password'),
        ]);

        // Vehicle::factory(5)->create();
        // MaintenancePlan::factory(3)->create();
        // ServiceRequest::factory(3)->create();
        // OdometerLog::factory(5)->create();   
        // //Repairs::factory(1)->create();
        // Trip::factory(2)->create();
        // Part::factory()->create([
        //     'part_name' => 'engine oil',
        //     'stock_quantity' => 2000,
        //     'unit' => 'ml',
        //     'unit_price' => 100,
        //     'restock_threshold' => 250,
        // ]);
        // Part::factory()->create([
        //     'part_name' => 'brake fluid',
        //     'stock_quantity' => 2000,
        //     'unit' => 'ml',
        //     'unit_price' => 265,
        //     'restock_threshold' => 250,
        // ]);
        // Part::factory()->create([
        //     'part_name' => 'wheel bearing',
        //     'stock_quantity' => 100,
        //     'unit' => 'pcs',
        //     'unit_price' => 321,
        // ]);
        // Notification::factory(5)->create();
        // $faker = Faker::create();
        // Vehicle::factory()->create([
        //     'asset_tag' => 'PPO-LV-05',
        //     'vehicle_name' => 'Toyok #1',
        //     'brand' => 'Mitsubishi',
        //     'model' => 'Toyok',
        //     'engine_number' => 4597,
        //     'chassis_number' => 7521,
        //     'vehicle_type' => 'bus',
        //     'capacity' => 12,
        //     'location' => 'PPO Garage',
        //     'year_acquired' => 2021,
        //     'category' => 'light vehicle',
        //     'plate_number' => strtoupper($faker->bothify('???-###')),
        //     // 'odometer_reading' => $faker->numberBetween(0, 500000),
        //     'fuel_type' => 'diesel',
        //     'status' => 'available',
        // ]);
        // Vehicle::factory()->create([
        //     'asset_tag' => 'PPO-LV-06',
        //     'vehicle_name' => 'Toyok #2',
        //     'brand' => 'Mitsubishi',
        //     'model' => 'Toyok',
        //     'engine_number' => $faker->unique()->numberBetween(4000, 6000),
        //     'chassis_number' => $faker->unique()->numberBetween(7000, 9000),
        //     'vehicle_type' => 'bus',
        //     'capacity' => 12,
        //     'location' => 'PPO Garage',
        //     'year_acquired' => 2021,
        //     'category' => 'light vehicle',
        //     'plate_number' => strtoupper($faker->bothify('???-###')),
        //     // 'odometer_reading' => $faker->numberBetween(0, 500000),
        //     'fuel_type' => 'diesel',
        //     'status' => 'available',
        // ]);
        // Vehicle::factory()->create([
        //     'asset_tag' => 'PPO-LV-07',
        //     'vehicle_name' => 'Toyok #3',
        //     'brand' => 'Mitsubishi',
        //     'model' => 'Toyok',
        //     'engine_number' => $faker->unique()->numberBetween(4000, 6000),
        //     'chassis_number' => $faker->unique()->numberBetween(7000, 9000),
        //     'vehicle_type' => 'bus',
        //     'capacity' => 12,
        //     'location' => 'PPO Garage',
        //     'year_acquired' => 2021,
        //     'category' => 'light vehicle',
        //     'plate_number' => strtoupper($faker->bothify('???-###')),
        //     // 'odometer_reading' => $faker->numberBetween(0, 500000),
        //     'fuel_type' => 'diesel',
        //     'status' => 'available',
        // ]);
        // Vehicle::factory()->create([
        //     'asset_tag' => 'PPO-LV-08',
        //     'vehicle_name' => 'Toyok #4',
        //     'brand' => 'Mitsubishi',
        //     'model' => 'Toyok',
        //     'engine_number' => $faker->unique()->numberBetween(4000, 6000),
        //     'chassis_number' => $faker->unique()->numberBetween(7000, 9000),
        //     'vehicle_type' => 'bus',
        //     'capacity' => 12,
        //     'location' => 'USHER',
        //     'year_acquired' => 2021,
        //     'category' => 'light vehicle',
        //     'plate_number' => strtoupper($faker->bothify('???-###')),
        //     // 'odometer_reading' => $faker->numberBetween(0, 500000),
        //     'fuel_type' => 'diesel',
        //     'status' => 'available',
        // ]);
    }
}
