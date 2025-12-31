<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Application;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\Auth\SocialAuthController;

use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\AnalyticsController;
use App\Http\Controllers\Admin\VerificationController;
use App\Http\Controllers\Admin\MaterialController;
use App\Http\Controllers\Admin\CrafterController as AdminCrafterController;

use App\Http\Controllers\Crafter\DashboardController as CrafterDashboardController;
use App\Http\Controllers\Crafter\PublicCrafterController;

Route::get('/', function () {
    return Inertia::render('Dashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/transactions', function () {
    return Inertia::render('Transaction/Index');
})->name('transactions.index');

Route::get('/transaction/{id}', function ($id) {
    return Inertia::render('Transaction/TransactionDetail', [
        'id' => $id
    ]);
})->name('transactions.show');

Route::get('/pengrajin', function () {
    // Sesuai lokasi file: resources/js/Pages/Customer/ChooseCrafter.jsx
    return Inertia::render('Customer/ChooseCrafter');
})->name('crafter.index');

Route::get('/checkout', function () {
    return Inertia::render('Customer/Checkout');
})->name('checkout.index');

Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    $user = Auth::user();

    if ($user->role === 'admin') return redirect()->route('admin.analytics.index');
    if ($user->role === 'crafter') return redirect()->route('crafter.dashboard');
    if ($user->role === 'customer') return redirect()->route('dashboard');

    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/Customize/Index', function () {
    return Inertia::render('Customize/Index', [
        'auth' => ['user' => Auth::user()]
    ]);
})->name('customize.index');

Route::get('/crafters', [PublicCrafterController::class, 'index'])->name('public.crafters.index');
Route::get('/crafter/{id}', [PublicCrafterController::class, 'show'])
    ->name('public.crafters.show')
    ->where('id', '[0-9]+');

    Route::middleware(['auth'])->group(function () {
    Route::post('/reviews', [WelcomeController::class, 'store'])->name('reviews.store');
});


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
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::get('/transaction/{id}', [TransactionController::class, 'show'])->name('transactions.show');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified', 'role:crafter'])->prefix('crafter')->name('crafter.')->group(function () {
    Route::get('/dashboard', [CrafterDashboardController::class, 'index'])->name('dashboard');
    Route::get('/project/{id}', [CrafterDashboardController::class, 'show'])->name('project.detail');

    Route::get('/portfolio', [CrafterDashboardController::class, 'portfolio'])->name('portfolio');
    Route::get('/projectlist', [CrafterDashboardController::class, 'projectList'])->name('projectlist');

    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::get('/transaction/{id}', [TransactionController::class, 'show'])->name('transactions.show');
});

Route::middleware(['auth', 'verified', 'role:crafter, customer'])->prefix('crafter')->name('crafter.')->group(function () {
    Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::patch('/projects/{id}/accept', [ProjectController::class, 'accept'])->name('projects.accept');
    Route::patch('/projects/{id}/reject', [ProjectController::class, 'reject'])->name('projects.reject');
    Route::post('/projects/{id}/progress', [ProjectController::class, 'updateProgress'])->name('projects.progress');
});

Route::middleware(['auth', 'verified', 'role:admin, customer'])->prefix('crafter')->name('crafter.')->group(function () {
    Route::post('/projects/{id}/pay', [PaymentController::class, 'pay'])->name('payment.pay');
    Route::post('/projects/{id}/confirm-payment', [PaymentController::class, 'confirm'])->middleware('role:admin')->name('payment.confirm');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
    Route::get('/chat/messages/{user}', [ChatController::class, 'getMessages'])->name('chat.getMessages');
    Route::post('/chat/messages/{user}', [ChatController::class, 'sendMessage'])->name('chat.sendMessage');

    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllRead'])->name('notifications.readAll');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/track-order', function () {
    return Inertia::render('Customer/TrackProgress');
})->name('customer.track');

Route::get('/my-orders', function () {
    return Inertia::render('Customer/OrderList');
})->name('customer.orders');

// ROUTE KHUSUS UNTUK DETAIL PROYEK CRAFTER (DUMMY DATA)
Route::get('/crafter/project/{id}', function ($id) {
    
    // Kita simulasi data berbeda sedikit berdasarkan ID agar terlihat dinamis
    // Jika ID = 'AP-002', kita ubah judulnya, sisanya default.
    
    $projectTitle = 'Kitchen Set Minimalis - Apartemen Gateway';
    $status = 'Produksi';
    
    if ($id == 'AP-002') {
        $projectTitle = 'Lemari Wardrobe 4 Pintu (Full Cermin)';
        $status = 'Finishing';
    }

    // Struktur Data yang SAMA PERSIS dengan kebutuhan ProjectDetail.jsx
    $projectData = [
        'id' => $id,
        'title' => $projectTitle,
        'status' => $status, // Produksi, Finishing, dll
        'client' => 'Budi Santoso',
        'client_id' => 'USER-123',
        'client_avatar' => 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random',
        'address' => 'Apartemen Gateway, Tower A, Lt. 12, Bandung',
        'deadline' => '15 Nov 2023',
        
        // Data Timeline Pengerjaan
        'timeline' => [
            [
                'stage' => 'Pembayaran DP & Verifikasi', 
                'status' => 'completed', 
                'date' => '20 Oct 2023'
            ],
            [
                'stage' => 'Pembelian Material', 
                'status' => 'completed', 
                'date' => '22 Oct 2023'
            ],
            [
                'stage' => 'Produksi (Potong & Rakit)', 
                'status' => $id == 'AP-002' ? 'completed' : 'current', // Simulasi beda status
                'date' => 'Sedang Berjalan'
            ],
            [
                'stage' => 'Finishing & Quality Control', 
                'status' => $id == 'AP-002' ? 'current' : 'upcoming', 
                'date' => 'Estimasi 10 Nov'
            ],
            [
                'stage' => 'Pengiriman & Instalasi', 
                'status' => 'upcoming', 
                'date' => '15 Nov 2023'
            ],
        ],

        // Data Spesifikasi Teknis (Dari Configurator)
        'specs' => [
            'materialName' => 'Multiplek Meranti 18mm',
            'finishing' => 'HPL Taco TH-888 (Wood Grain)',
            'width' => 240,
            'height' => 80,
            'depth' => 60,
            'plinth' => 10,
            'backPanel' => true,
            'partitions' => 4,
            'shelves' => 2,
            'ledStrip' => true,
            'doorType' => 'swing', // none, swing, sliding
            'lock' => true
        ],

        // Nilai Jasa (RAB)
        'fee' => 8500000 
    ];

    return Inertia::render('Crafter/ProjectDetail', [
        'project' => $projectData
    ]);
})->name('crafter.project.detail');

require __DIR__ . '/auth.php';
