<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MaintenancePlan;
use App\Models\OdometerLog;

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
        'fuel_type',
        'status',
        'qr_code_path',
        'image_path',
    ];


    public function odometerLogs()
    {
        return $this->hasMany(OdometerLog::class, 'vehicle_id');
    }

    public function serviceRequests()
    {
        return $this->hasMany(ServiceRequest::class, 'vehicle_id');
    }

    public function maintenancePlans()
    {
        return $this->hasMany(MaintenancePlan::class, 'vehicle_id');
    }

    public function latestOdometerLog()
    {
        return $this->hasOne(OdometerLog::class, 'vehicle_id')->latest('created_at');
    }

    public function trips()
    {
        return $this->hasMany(Trip::class, 'vehicle_id');
    }

    public function repairMaintenances()
{
    return $this->hasManyThrough(
        Maintenance::class,
        ServiceRequest::class,
        'vehicle_id',           // Foreign key on service_requests
        'request_id',   // Foreign key on maintenances
        'vehicle_id',           // Local key on vehicles
        'request_id'    // Local key on service_requests
    )->whereHas('serviceRequest', function ($query) {
        $query->where('service_type', 'repair');
    });
}
}
