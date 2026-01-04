<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\CustomizeController;
use App\Http\Controllers\Auth\SocialAuthController;

use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\AnalyticsController;
use App\Http\Controllers\Admin\VerificationController;
use App\Http\Controllers\Admin\MaterialController;
use App\Http\Controllers\Admin\CrafterController as AdminCrafterController;

use App\Http\Controllers\Crafter\DashboardController as CrafterDashboardController;
use App\Http\Controllers\Crafter\PublicCrafterController;

use App\Http\Controllers\Customer\OrderController as CustomerOrderController;
use App\Http\Controllers\Customer\CheckoutController;

Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::get('/customize', [CustomizeController::class, 'index'])->name('customize.index');
Route::post('/customize/save', [CustomizeController::class, 'store'])->name('customize.store');

Route::get('/crafters', [PublicCrafterController::class, 'index'])->name('public.crafters.index');

Route::middleware('guest')->group(function () {
    Route::get('auth/{provider}/redirect', [SocialAuthController::class, 'redirect'])
        ->where('provider', 'google|facebook')->name('social.redirect');
    Route::get('auth/{provider}/callback', [SocialAuthController::class, 'callback'])
        ->where('provider', 'google|facebook');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/choose-crafter', [PublicCrafterController::class, 'choose'])->name('crafter.choose');

    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

    Route::get('/crafter/{id}', [PublicCrafterController::class, 'show'])
        ->name('public.crafters.show')
        ->where('id', '[0-9]+');

    Route::get('/dashboard', function () {
        $user = Auth::user();
        if ($user->role === 'admin') return redirect()->route('admin.analytics.index');
        if ($user->role === 'crafter') return redirect()->route('crafter.portfolio');
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
    Route::get('/chat/messages/{user}', [ChatController::class, 'getMessages']);
    Route::post('/chat/messages/{user}', [ChatController::class, 'sendMessage']);

    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllRead']);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/reviews', [WelcomeController::class, 'store'])->name('reviews.store');
});

Route::middleware(['auth', 'verified', 'role:customer'])->prefix('customer')->name('customer.')->group(function () {
    Route::get('/my-orders', [CustomerOrderController::class, 'index'])->name('orders.index');
    Route::get('/track-order/{id}', [CustomerOrderController::class, 'show'])->name('orders.show');

    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::get('/transaction/{id}', [TransactionController::class, 'show'])->name('transactions.show');
});

Route::middleware(['auth', 'verified', 'role:crafter'])->prefix('crafter')->name('crafter.')->group(function () {
    Route::get('/dashboard', [CrafterDashboardController::class, 'index'])->name('dashboard');
    Route::get('/portfolio', [CrafterDashboardController::class, 'portfolio'])->name('portfolio');
    Route::get('/projectlist', [CrafterDashboardController::class, 'projectList'])->name('projectlist');
    Route::get('/project/{id}', [CrafterDashboardController::class, 'show'])->name('project.detail');

    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::get('/transaction/{id}', [TransactionController::class, 'show'])->name('transactions.show');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::patch('/projects/{id}/accept', [ProjectController::class, 'accept'])->name('projects.accept');
    Route::patch('/projects/{id}/reject', [ProjectController::class, 'reject'])->name('projects.reject');
    Route::post('/projects/{id}/progress', [ProjectController::class, 'updateProgress'])->name('projects.progress');

    Route::post('/projects/{id}/pay', [PaymentController::class, 'pay'])->name('payment.pay');
    Route::post('/projects/{id}/confirm-payment', [PaymentController::class, 'confirm'])
        ->middleware('role:admin')
        ->name('payment.confirm');
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

require __DIR__ . '/auth.php';
