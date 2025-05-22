<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Passenger extends Model
{
    /** @use HasFactory<\Database\Factories\PassengerFactory> */
    use HasFactory;

    protected $fillable = [
        'trip_id',
        'name',
        'affiliation',
        'contact_number',
        'is_party_head',
    ];

    public function trip()
    {
        return $this->belongsTo(Trip::class, 'trip_id');
    }
}
