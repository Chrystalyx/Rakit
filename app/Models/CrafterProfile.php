<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CrafterProfile extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $fillable = [
        'user_id',
        'ktp_number',
        'address',
        'level',
        'is_verified',
        'rating_skill',
    ];

    protected $casts = [
        'badges' => 'array',
        'is_verified' => 'boolean',
        'rating_skill' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function portfolios()
    {
        return $this->hasMany(Portfolio::class, 'crafter_profile_id');
    }
}
