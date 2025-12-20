<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CrafterProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'ktp_number',
        'address',
        'level',
        'is_verified',
        'rating_skill',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
