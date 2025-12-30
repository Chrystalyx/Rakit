<?php

namespace App\Http\Controllers;

use App\Models\PlatformReview;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect; 

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
    public function store(Request $request)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:500',
        ]);

        PlatformReview::create([
            'customer_id' => Auth::id(),
            'rating' => $request->rating,
            'comment' => $request->comment,
            'is_visible' => true, // Default true atau false tergantung kebijakan moderasi Anda
        ]);

        // Kita return back agar halaman tidak refresh total, Inertia akan handle partial reload
        return Redirect::back();
    }
}
