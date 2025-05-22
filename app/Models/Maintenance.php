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
        'request_id',
        'date_completed',
        'date_in',
        'odometer_id',
        'performed_by',
        'confirmed_by',
        'date_confirmed',
        'maintenance_summary',
    ];


    public function serviceRequest()
    {
        return $this->belongsTo(ServiceRequest::class, 'request_id');
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

    public function partsUsed()
    {
        return $this->hasMany(MaintenanceParts::class, 'maintenance_id');
    }
}
