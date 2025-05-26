<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceInspection extends Model
{
    /** @use HasFactory<\Database\Factories\ServiceInspectionFactory> */
    use HasFactory;

    protected $primaryKey = 'inspection_id';
    protected $casts = [
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];
    protected $fillable = [
        'inspection_id',
        'request_id',
        'started_at',
        'completed_at',
        'parts_available',
        'personnel_available',
        'estimated_duration',
        'conducted_by',
        'confirmed_by',
    ];

    public function serviceRequest()
    {
        return $this->belongsTo(ServiceRequest::class, 'request_id');
    }

    public function conductedBy()
    {
        return $this->belongsTo(User::class, 'conducted_by');
    }

    public function confirmedBy()
    {
        return $this->belongsTo(User::class, 'confirmed_by');
    }
}
