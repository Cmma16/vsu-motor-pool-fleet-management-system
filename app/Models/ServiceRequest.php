<?php

namespace App\Models;

use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceRequest extends Model
{
    /** @use HasFactory<\Database\Factories\ServiceRequestFactory> */
    use HasFactory;

    protected $primaryKey = 'request_id';

    protected $casts = [
        'date_filed' => 'date',
        'date_received' => 'datetime',
    ];

    protected $fillable = [
        'request_id',
        'vehicle_id',
        'plan_id',
        'requested_by',
        'date_filed',
        'service_type',
        'work_description',
        'date_received',
        'received_by',
        'status',
    ];

    // Relationship with Vehicle
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }

    // Relationship with MaintenancePlan
    public function maintenancePlan()
    {
        return $this->belongsTo(MaintenancePlan::class, 'plan_id');
    }

    // Relationship with User (Requested By)
    public function requestedBy()
    {
        return $this->belongsTo(User::class, 'requested_by');
    }

    // Relationship with User (Received By)
    public function receivedBy()
    {
        return $this->belongsTo(User::class, 'received_by');
    }

    // Relationship with Repairs
    public function repairs()
    {
        return $this->hasOne(Repairs::class, 'request_id');
    }

    // Relationship with Maintenance
    public function maintenance()
    {
        return $this->hasOne(Maintenance::class, 'request_id');
    }

    // Relationship with ServiceInspection
    public function serviceInspection()
    {
        return $this->hasOne(ServiceInspection::class, 'request_id');
    }

}
