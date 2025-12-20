<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Project::with(['customer', 'crafter'])
            ->latest()
            ->paginate(10)
            ->through(function ($order) {
                return [
                    'id' => $order->id,
                    'project_id' => $order->id,
                    'title' => $order->title,
                    'customer_id' => $order->customer_id,
                    'customer_name' => $order->customer ? $order->customer->name : 'Deleted User',
                    'crafter_id' => $order->crafter_id,
                    'crafter_name' => $order->crafter ? $order->crafter->name : 'Menunggu Crafter',
                    'total_amount' => $order->total_amount,
                    'platform_fee' => $order->platform_fee,
                    'status' => $this->normalizeStatus($order->status),
                    'start_date' => $order->start_date,
                    'end_date' => $order->end_date,
                ];
            });

        return Inertia::render('Admin/Orders/index', [
            'orders' => $orders
        ]);
    }

    private function normalizeStatus($status)
    {
        return match ($status) {
            'pending_review' => 'pending',
            'payment_pending' => 'pending',
            'on_progress' => 'on progress',
            default => $status,
        };
    }
}
