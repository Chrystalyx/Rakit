<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        if ($user->role === 'crafter') {
            $query = Project::where('crafter_id', $user->id);
        } else {
            $query = Project::where('customer_id', $user->id);
        }

        if ($request->tab === 'active') {
            $query->whereIn('status', ['pending', 'processing', 'shipping']);
        } elseif ($request->tab === 'done') {
            $query->whereIn('status', ['done', 'cancelled']);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('id', 'like', '%' . $request->search . '%');
            });
        }

        $transactions = $query->latest()
            ->get()
            ->map(function ($trx) {
                return [
                    'id' => $this->generateInvoiceCode($trx),
                    'original_id' => $trx->id,
                    'date' => $trx->created_at->format('d M Y'),
                    'item_name' => $trx->title,
                    'total_price' => $trx->total_amount,
                    'status' => $trx->status,
                    'specs' => $this->formatSpecsSummary($trx->specifications),
                ];
            });

        return Inertia::render('Transaction/Index', [
            'transactions' => $transactions,
            'filters' => $request->only(['search', 'tab']),
        ]);
    }

    public function show($id)
    {
        $project = Project::with(['crafter.crafterProfile', 'customer'])->findOrFail($id);
        $user = Auth::user();

        if ($project->customer_id !== $user->id && $project->crafter_id !== $user->id) {
            abort(403);
        }

        if ($user->role === 'customer') {
            $counterpartData = [
                'role_label' => 'Pengrajin',
                'name' => $project->crafter->name ?? 'Belum Dipilih',
                'location' => $project->crafter->crafterProfile->address ?? '-',
                'avatar' => $project->crafter->avatar ?? "https://ui-avatars.com/api/?name=" . urlencode($project->crafter->name ?? 'C'),
            ];
        } else {
            $counterpartData = [
                'role_label' => 'Customer',
                'name' => $project->customer->name ?? 'Customer',
                'location' => $project->address ?? 'Alamat Pengiriman',
                'avatar' => $project->customer->avatar ?? "https://ui-avatars.com/api/?name=" . urlencode($project->customer->name ?? 'C'),
            ];
        }

        $transactionData = [
            'id' => $this->generateInvoiceCode($project),
            'created_at' => $project->created_at->format('d F Y, H:i'),
            'status' => $project->status,
            'item' => [
                'name' => $project->title,
                'image' => $project->image ?? 'https://placehold.co/600x400?text=No+Image',
                'config' => is_array($project->specifications) ? $project->specifications : json_decode($project->specifications, true),
            ],
            'crafter' => $counterpartData,

            'shipping' => [
                'recipient' => $project->customer->name,
                'phone' => $project->customer->phone_number ?? '-',
                'address' => $project->address ?? 'Alamat belum diset',
                'courier' => 'Kargo Logistik',
                'tracking_code' => $project->resi_number ?? '-',
            ],
            'payment' => [
                'method' => 'Bank Transfer',
                'total' => $project->total_amount,
                'status' => $project->status === 'pending' ? 'Unpaid' : 'Paid',
            ],
        ];

        return Inertia::render('Transaction/TransactionDetail', [
            'transaction' => $transactionData
        ]);
    }

    private function generateInvoiceCode($project)
    {
        $year = $project->created_at->format('Y');
        $month = $project->created_at->format('m');
        $orderId = str_pad($project->id, 4, '0', STR_PAD_LEFT);
        $crafterId = $project->crafter_id ? str_pad($project->crafter_id, 3, '0', STR_PAD_LEFT) : '000';
        $customerId = str_pad($project->customer_id, 3, '0', STR_PAD_LEFT);

        return "TRX-{$year}{$month}-{$orderId}-{$crafterId}-{$customerId}";
    }

    private function formatSpecsSummary($specs)
    {
        $data = is_array($specs) ? $specs : json_decode($specs, true);
        if (!$data) return '-';
        return ($data['base_material'] ?? '') . ' • ' . ($data['finish_material'] ?? '');
    }
}
