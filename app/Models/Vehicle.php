<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    /** @use HasFactory<\Database\Factories\VehicleFactory> */
    use HasFactory;

    protected $primaryKey = 'vehicle_id';

    protected $fillable = [
        'asset_tag',
        'vehicle_name',
        'brand',
        'model',
        'engine_number',
        'chassis_number',
        'vehicle_type',
        'capacity',
        'location',
        'year_acquired',
        'category',
        'plate_number',
        // 'odometer_reading',
        'fuel_type',
        'status',
    ];
}
