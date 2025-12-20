<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\AnalyticsController;
use App\Http\Controllers\Admin\VerificationController;
use App\Http\Controllers\Admin\MaterialController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics');

    Route::get('/verification', [VerificationController::class, 'index'])->name('verification');

    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');

    Route::patch('/materials/{material}/toggle', [MaterialController::class, 'toggle'])->name('materials.toggle');

    Route::resource('materials', MaterialController::class)->except(['show']);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
