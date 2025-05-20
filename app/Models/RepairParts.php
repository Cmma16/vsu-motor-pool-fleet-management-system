<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepairParts extends Model
{
    /** @use HasFactory<\Database\Factories\RepairPartsFactory> */
    use HasFactory;

    protected $fillable = [
        'repair_id',
        'part_id',
        'quantity_used',
    ];

    public function repair() 
    {
        return $this->belongsTo(Repair::class, 'repair_id');
    }

    public function part()
    {
        return $this->belongsTo(Part::class, 'part_id');
    }
}
