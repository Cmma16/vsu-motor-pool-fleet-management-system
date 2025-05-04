<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    /** @use HasFactory<\Database\Factories\PartFactory> */
    use HasFactory;

    protected $primaryKey = 'part_id';
    protected $fillable = [
        'part_id',
        'name',
        'part_name',
        'stock_quantity',
        'unit',
        'unit_price',
        'restock_threshold',
    ];
}
