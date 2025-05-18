<?php

namespace Database\Seeders;

use App\Models\Repairs;
use App\Models\User;
use App\Models\UserRole;
use App\Models\Vehicle;
use App\Models\ServiceRequest;
use App\Models\OdometerLog;
use App\Models\Trip;

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
        // $roles = [
        //     ['name' => 'Admin'],
        //     ['name' => 'Staff'],
        //     ['name' => 'Driver'],
        //     ['name' => 'Technician'],
        // ];

        // foreach ($roles as $role) {
        //     UserRole::create($role);
        // }

        // User::factory(3)->create();
        // User::factory()->create([
        //     'first_name' => 'Carlos Miguel',
        //     'middle_name' => 'Maniego',
        //     'last_name' => 'Advincula',
        //     'contact_number' => '09999788109',
        //     'province' => 'Leyte',
        //     'city' => 'Tolosa',
        //     'barangay' => 'Opong',
        //     'address_details' => 'Zone 5',
        //     'role_id' => 1,
        //     'email' => '1cmadvincula@gmail.com',
        //     'password' => Hash::make('2fcc3627'),
        // ]);

        // Vehicle::factory(5)->create();
        // ServiceRequest::factory(3)->create();
        // OdometerLog::factory(5)->create();   
        Repairs::factory(1)->create();
        Trip::factory(2)->create();
    }
}
