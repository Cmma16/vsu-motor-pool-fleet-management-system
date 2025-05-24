<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Services\PartStockService;

class MaintenanceParts extends Model
{
    /** @use HasFactory<\Database\Factories\MaintenancePartsFactory> */
    use HasFactory;

    protected $fillable = [
        'maintenance_id',
        'part_id',
        'quantity_used',
    ];

    public function maintenance()
    {
        return $this->belongsTo(Maintenance::class, 'maintenance_id');
    }

    public function part()
    {
        return $this->belongsTo(Part::class, 'part_id');
    }
    
    
}
