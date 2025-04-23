<?php

namespace Database\Seeders;

use App\Models\Repairs;
use App\Models\User;
use App\Models\Vehicle;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(4)->create();
        User::factory()->create([
            'first_name' => 'Carlos Miguel',
            'middle_name' => 'Maniego',
            'last_name' => 'Advincula',
            'contact_number' => '09999788109',
            'province' => 'Leyte',
            'city' => 'Tolosa',
            'barangay' => 'Opong',
            'address_details' => 'Zone 5',
            'role' => 'admin',
            'email' => '1cmadvincula@gmail.com',
            'password' => Hash::make('2fcc3627'),
        ]);
        Vehicle::factory(5)->create();
        Repairs::factory(5)->create();
    }
}
