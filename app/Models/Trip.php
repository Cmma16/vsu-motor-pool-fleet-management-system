<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Vehicle;
use App\Models\User;

class Trip extends Model
{
    /** @use HasFactory<\Database\Factories\TripFactory> */
    use HasFactory;

    protected $primaryKey = 'trip_id';

    protected $fillable = [
        'trip_number',
        'date_filed',
        'start_date',
        'end_date',
        'destination',
        'purpose',
        'departure_time',
        'requesting_party',
        'vehicle_id',
        'driver_id',
        'dispatcher_id',
        'status',
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }

    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }

    public function passengers()
    {
        return $this->hasMany(Passenger::class, 'trip_id');
    }
}
