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
        'level',
        'ktp_number',
        'address',
        'photo_path',
        'is_verified',
        'rating_skill',
        'badges',
        'bio',
        'cover_image',
        'skills'
    ];

    protected $casts = [
        'badges' => 'array',
        'is_verified' => 'boolean',
        'rating_skill' => 'decimal:2',
        'skills' => 'array',
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
