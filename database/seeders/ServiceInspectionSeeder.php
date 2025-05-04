<?php

namespace Database\Seeders;

use App\Models\ServiceInspection;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceInspectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ServiceInspection::factory()
            ->count(3) // Adjust the number of records to create as needed
            ->create();
    }
}
