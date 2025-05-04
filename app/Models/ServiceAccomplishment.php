<?php

namespace App\Models;

use App\Models\ServiceRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceAccomplishment extends Model
{
    /** @use HasFactory<\Database\Factories\ServiceAccomplishmentFactory> */
    use HasFactory;

    protected $primaryKey = 'accomplishment_id';
    protected $fillable = [
        'accomplishment_id',
        'request_id',
        'started_at',
        'completed_at',
        'conducted_by',
        'verified_by',
    ];

    public function serviceRequest()
    {
        return $this->belongsTo(ServiceRequest::class, 'request_id');
    }

    public function conductedBy()
    {
        return $this->belongsTo(User::class, 'conducted_by');
    }

    public function verifiedBy()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
}
