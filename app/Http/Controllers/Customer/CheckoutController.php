<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use App\Notifications\NewProjectNotification;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $reorderId = $request->query('reorder_id');
        $productConfig = null;
        $reorderProject = null;

        if ($reorderId) {
            $reorderProject = Project::where('id', $reorderId)
                ->where('customer_id', $user->id)
                ->firstOrFail();

            $productConfig = $reorderProject->specifications;

            if (!isset($productConfig['components'])) {
            }
        } else {
            $productConfig = session('cart');
        }

        if (!$productConfig) {
            return redirect()->route('customize.index')
                ->with('error', 'Data produk tidak ditemukan. Silakan desain ulang.');
        }

        $crafterId = $request->query('crafter_id');
        $crafter = User::where('id', $crafterId)
            ->where('role', 'crafter')
            ->with('crafterProfile')
            ->first();

        if (!$crafter) {
            return redirect()->route('crafter.choose')
                ->with('error', 'Silakan pilih mitra pengrajin terlebih dahulu.');
        }

        return Inertia::render('Customer/Checkout', [
            'crafter' => [
                'id' => $crafter->id,
                'name' => $crafter->name,
                'location' => $crafter->crafterProfile->address ?? 'Lokasi Tidak Tersedia',
                'avatar' => $crafter->avatar ?? "https://ui-avatars.com/api/?name=" . urlencode($crafter->name),
            ],
            'productConfig' => $productConfig,
            'user' => $user,
            'reorderId' => $reorderId
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'crafter_id' => 'required|exists:users,id',
            'recipient' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'city' => 'required|string',
            'zip' => 'required|string',
            'courier' => 'required|string',
            'payment_method' => 'required|string',
            'reorder_id' => 'nullable|exists:projects,id',
        ]);

        $user = Auth::user();
        $reorderId = $request->input('reorder_id');
        $productConfig = null;

        if ($reorderId) {
            $existingProject = Project::find($reorderId);
            $productConfig = $existingProject->specifications;
        } else {
            $productConfig = session('cart');
        }

        if (!$productConfig) {
            return redirect()->route('customize.index')
                ->with('error', 'Gagal memproses. Data produk hilang.');
        }

        $featuresTotal = 0;
        if (isset($productConfig['components']['features'])) {
            foreach ($productConfig['components']['features'] as $feat) {
                $featuresTotal += $feat['price'];
            }
        }

        $basePrice = $productConfig['components']['base']['price'] ?? 0;
        $finishPrice = $productConfig['components']['finish']['price'] ?? 0;
        $productSubtotal = $basePrice + $finishPrice + $featuresTotal;
        $shippingCost = $request->courier === 'pickup' ? 0 : 150000;
        $platformFee = 25000;
        $grandTotal = $productSubtotal + $shippingCost + $platformFee;

        $project = null;

        if ($reorderId) {
            $project = Project::find($reorderId);

            $project->update([
                'crafter_id' => $request->crafter_id,
                'status' => 'pending',
                'reject_reason' => null,
                'total_amount' => $grandTotal,
                'start_date' => now(),
                'end_date' => now()->addWeeks(3),
                'address' => $request->address . ', ' . $request->city . ' ' . $request->zip,
            ]);
        } else {
            $project = Project::create([
                'customer_id' => $user->id,
                'crafter_id' => $request->crafter_id,
                'title' => $productConfig['name'] ?? 'Custom Furniture Project',
                'description' => 'Pesanan Custom (Checkout via Web)',
                'specifications' => $productConfig,
                'status' => 'pending',
                'total_amount' => $grandTotal,
                'start_date' => now(),
                'end_date' => now()->addWeeks(3),
                'address' => $request->address . ', ' . $request->city . ' ' . $request->zip,
                'platform_fee' => $platformFee,
            ]);

            session()->forget('cart');
        }

        $crafter = User::find($request->crafter_id);
        if ($crafter) {
            $crafter->notify(new NewProjectNotification($project, $user->name));
        }

        return redirect()->route('customer.orders.index')
            ->with('success', 'Pesanan berhasil diteruskan ke pengrajin baru!');
    }
}
