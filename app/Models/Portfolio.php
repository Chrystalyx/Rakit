<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $fillable = [
        'crafter_profile_id',
        'title',
        'project_value',
        'image_path',
        'category',
        'description',
        'config',
        'specs',
        'images'
    ];

    protected $casts = [
        'config' => 'array',
        'specs' => 'array',
        'images' => 'array',
    ];

    public function user()
    {
        return $this->hasOneThrough(
            User::class,
            CrafterProfile::class,
            'id',
            'id',
            'crafter_profile_id',
            'user_id'
        );
    }

    public function crafterProfile()
    {
        return $this->belongsTo(CrafterProfile::class, 'crafter_profile_id');
    }

    public function getImageUrlAttribute()
    {
        return $this->image_path ? asset('storage/' . $this->image_path) : 'https://placehold.co/600x400';
    }
}
