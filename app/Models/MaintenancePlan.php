<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaintenancePlan extends Model
{
    /** @use HasFactory<\Database\Factories\MaintenancePlanFactory> */
    use HasFactory;
    
    protected $primaryKey = 'plan_id';

    protected $fillable = [
        'plan_id',
        'vehicle_id',
        'scheduled_date',
        'next_service_km',
        'description',
        'created_by',
        'status',
    ];

    // Relationship with Vehicle
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }

    // Relationship with User (Created By)
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

}
