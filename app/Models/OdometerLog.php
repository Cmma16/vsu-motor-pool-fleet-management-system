<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OdometerLog extends Model
{
    /** @use HasFactory<\Database\Factories\OdometerLogFactory> */
    use HasFactory;

    protected $primaryKey = 'odometer_id';

    protected $cast = [
        'logged_at' => 'datetime',
    ];

    protected $fillable = [
        'vehicle_id',
        'reading',
        'logged_at',
        'recorded_by',
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }

    public function recordedBy()
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }

    public function scopeOfVehicle($query, $vehicleId)
    {
        return $query->where('vehicle_id', $vehicleId);
    }

    public function scopeLatestReadingByDate($query, $vehicleId, $date)
    {
        return $query->where('vehicle_id', $vehicleId)
            ->where('logged_at', '<=', $date)
            ->orderBy('logged_at', 'desc')
            ->first();
    }
}
