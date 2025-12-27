<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Application;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\Auth\SocialAuthController;

use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\AnalyticsController;
use App\Http\Controllers\Admin\VerificationController;
use App\Http\Controllers\Admin\MaterialController;
use App\Http\Controllers\Admin\CrafterController as AdminCrafterController;

use App\Http\Controllers\Crafter\DashboardController as CrafterDashboardController;

Route::get('/', function () {
    return Inertia::render('Dashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/dashboard', function () {
    $user = Auth::user();

    if ($user->role === 'admin') return redirect()->route('admin.analytics.index');
    if ($user->role === 'crafter') return redirect()->route('crafter.dashboard');
    if ($user->role === 'customer') return redirect()->route('customer.dashboard');

    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/Customize/Index', function () {
    return Inertia::render('Customize/Index', [
        'auth' => ['user' => Auth::user()]
    ]);
})->name('customize.index');


Route::middleware('guest')->group(function () {
    Route::get('auth/{provider}/redirect', [SocialAuthController::class, 'redirect'])
        ->where('provider', 'google|facebook')
        ->name('social.redirect');

    Route::get('auth/{provider}/callback', [SocialAuthController::class, 'callback'])
        ->where('provider', 'google|facebook');
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics.index');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');

    Route::patch('/materials/{material}/toggle', [MaterialController::class, 'toggle'])->name('materials.toggle');
    Route::resource('materials', MaterialController::class)->except(['show']);

    Route::get('/verification', [VerificationController::class, 'index'])->name('verification.index');
    Route::post('/verification/{id}/approve', [VerificationController::class, 'approve'])->name('verification.approve');
    Route::get('/crafters', [AdminCrafterController::class, 'index'])->name('crafters.index');
});

Route::middleware(['auth', 'verified', 'role:customer'])->prefix('customer')->name('customer.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Customer/Dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified', 'role:crafter'])->prefix('crafter')->name('crafter.')->group(function () {
    Route::get('/dashboard', [CrafterDashboardController::class, 'index'])->name('dashboard');

    Route::get('/project/{id}', [CrafterDashboardController::class, 'show'])->name('project.detail');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
    Route::get('/chat/messages/{user}', [ChatController::class, 'getMessages'])->name('chat.getMessages');
    Route::post('/chat/messages/{user}', [ChatController::class, 'sendMessage'])->name('chat.sendMessage');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
