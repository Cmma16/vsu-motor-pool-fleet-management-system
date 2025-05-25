<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Trip;
use App\Models\OdometerLog;

class TripLog extends Model
{
    /** @use HasFactory<\Database\Factories\TripLogFactory> */
    use HasFactory;

    protected $primaryKey = 'trip_log_id';

    protected $fillable = [
        'trip_id',
        'received_at',
        'pre_trip_condition',
        'fuel_lubricant_issued_at',
        'departure_time_actual',
        'odometer_out',
        'date_returned',
        'post_trip_condition',
        'fuel_lubricant_balanced_at',
        'arrival_time',
        'odometer_in',
    ];

    public function trip()
    {
        return $this->belongsTo(Trip::class, 'trip_id');
    }

    public function odometerOut()
    {
        return $this->belongsTo(OdometerLog::class, 'odometer_out');
    }

    public function odometerIn()
    {
        return $this->belongsTo(OdometerLog::class, 'odometer_in');
    }
}
