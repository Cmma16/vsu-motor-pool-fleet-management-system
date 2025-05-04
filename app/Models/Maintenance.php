<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    /** @use HasFactory<\Database\Factories\MaintenanceFactory> */
    use HasFactory;

    protected $primaryKey = 'maintenance_id';
    protected $fillable = [
        'maintenance_id',
        'vehicle_id',
        'scheduled_date',
        'date_completed',
        'odometer_reading',
        'next_service_date',
        'next_service_km',
        'performed_by',
        'confirmed_by',
        'date_confirmed',
        'description',
        'status',
    ];
}
