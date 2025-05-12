<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repairs extends Model
{
    /** @use HasFactory<\Database\Factories\RepairsFactory> */
    use HasFactory;

    protected $primaryKey = 'repair_id';

    protected $fillable = [
            'repair_id',
            'vehicle_id', 
            'request_id',
            'performed_by',
            'confirmed_by',
            'repair_summary',
            'odometer_id',
            // 'created_at',
            // 'updated_at',
    ];

    // Relationship with Vehicle
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }
    // Relationship with Request
    public function serviceRequest()
    {
        return $this->belongsTo(ServiceRequest::class, 'request_id');
    }   

    // Relationship with User (Assigned Personnel)
    public function performedBy()
    {
        return $this->belongsTo(User::class, 'performed_by');
    }

    // Relationship with User (Requested By)
    public function confirmedBy()
    {
        return $this->belongsTo(User::class, 'confirmed_by');
    }

    // Relationship with OdometerLog
    public function odometerReading()
    {
        return $this->belongsTo(OdometerLog::class, 'odometer_id');
    }
}


