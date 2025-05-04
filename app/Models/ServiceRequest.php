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

    protected $fillable = [
        'request_id',
        'vehicle_id',
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
}
