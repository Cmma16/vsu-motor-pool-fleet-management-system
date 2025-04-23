<?php

namespace Database\Seeders;

use App\Models\Repairs;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class RepairsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Repairs::factory()->count(count:3)->create();
    }
}
