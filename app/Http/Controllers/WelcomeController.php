<?php

namespace App\Http\Controllers;

use App\Models\PlatformReview;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class WelcomeController extends Controller
{
    public function index()
    {
        $reviews = PlatformReview::with('user')
            ->where('is_visible', true)
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($review) {
                return [
                    'id' => $review->id,
                    'name' => $review->user->name,
                    'role' => ucfirst($review->user->role),
                    'comment' => $review->comment,
                    'rating' => $review->rating,
                    'avatar_initial' => substr($review->user->name, 0, 1),
                ];
            });

        return Inertia::render('Dashboard', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'reviews' => $reviews,
        ]);
    }
}
