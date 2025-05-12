<?php

namespace Database\Seeders;

use App\Models\OdometerLogs;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OdometerLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OdometerLogs::factory()->count(count:3)->create();
    }
}
