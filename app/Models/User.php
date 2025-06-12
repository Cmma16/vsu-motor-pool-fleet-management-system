<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\UserRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'contact_number',
        'province',
        'city',
        'barangay',
        'address_details',
        'email',
        'password',
        'role_id',
        'is_verified'
    ];

    public function role()
    {
        return $this->belongsTo(UserRole::class, 'role_id');
    }

    /**
     * Check if the user is admin verified.
     */
    public function isVerified(): bool
    {
        return $this->is_verified;
    }

    public function isFullyVerified(): bool
    {
        return $this->hasVerifiedEmail() && $this->isAdminVerified();
    }

    /**
     * Mark the user as verified.
     */
    public function markAsVerified(): bool
    {
        return $this->update(['is_verified' => true]);
    }

    /**
     * Mark the user as unverified.
     */
    public function markAsUnverified(): bool
    {
        return $this->update(['is_verified' => false]);
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'is_verified' => 'boolean',
            'password' => 'hashed',
        ];
    }
}
