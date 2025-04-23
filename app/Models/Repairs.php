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
            'description',
            'scheduled_date',
            'required_by',
            'urgency_level',
            'assigned_personnel',
            'status',
            'requested_by',
    ];

    // Relationship with Vehicle
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }

    // Relationship with User (Assigned Personnel)
    public function assignedPersonnel()
    {
        return $this->belongsTo(User::class, 'assigned_personnel');
    }

    // Relationship with User (Requested By)
    public function requestedBy()
    {
        return $this->belongsTo(User::class, 'requested_by');
    }
}


