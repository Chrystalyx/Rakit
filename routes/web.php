<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\AnalyticsController;
use App\Http\Controllers\Admin\VerificationController;
use App\Http\Controllers\Admin\MaterialController;
use App\Http\Controllers\Admin\CrafterController;
use App\Http\Controllers\ChatController;


Route::get('/', function () {
    return Inertia::render('Crafter/ProjectDetail');
});


Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {

    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');

    Route::patch('/materials/{material}/toggle', [MaterialController::class, 'toggle'])->name('materials.toggle');

    Route::resource('materials', MaterialController::class)->except(['show']);
    Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics.index');
    
    Route::get('/verification', [VerificationController::class, 'index'])->name('verification.index');
    Route::post('/verification/{id}/approve', [VerificationController::class, 'approve'])->name('verification.approve');
    
    Route::get('/crafters', [CrafterController::class, 'index'])->name('crafters.index');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    
    // Halaman Utama Chat (Menampilkan UI)
    Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');

    // API: Ambil pesan dari user tertentu
    Route::get('/chat/messages/{user}', [ChatController::class, 'getMessages'])->name('chat.getMessages');

    // API: Kirim pesan ke user tertentu
    Route::post('/chat/messages/{user}', [ChatController::class, 'sendMessage'])->name('chat.sendMessage');

});
require __DIR__ . '/auth.php';
