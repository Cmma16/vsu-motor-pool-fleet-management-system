<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    /** @use HasFactory<\Database\Factories\MaintenanceFactory> */
    use HasFactory;

    protected $table = 'maintenance';
    protected $primaryKey = 'maintenance_id';
    protected $fillable = [
        'maintenance_id',
        'plan_id',
        'request_id',
        'vehicle_id',
        'date_completed',
        'odometer_id',
        'performed_by',
        'confirmed_by',
        'date_confirmed',
        'maintenance_summary',
    ];

    public function plan()
    {
        return $this->belongsTo(MaintenancePlan::class, 'plan_id');
    }

    public function request()
    {
        return $this->belongsTo(ServiceRequest::class, 'request_id');
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }

    public function odometerReading()
    {
        return $this->belongsTo(OdometerLog::class, 'odometer_id');
    }

    public function performedBy()
    {
        return $this->belongsTo(User::class, 'performed_by');
    }

    public function confirmedBy()
    {
        return $this->belongsTo(User::class, 'confirmed_by');
    }
}
