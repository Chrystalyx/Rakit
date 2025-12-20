<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        // DATA DUMMY STATIC (Untuk simulasi tampilan)
        $orders = [
            'data' => [
                [
                    'id' => 1001,
                    'project_id' => 55,
                    'customer_id' => 201,
                    'customer_name' => 'Alice Wonder',
                    'crafter_id' => 305,
                    'crafter_name' => 'Budi Woodworks',
                    'title' => 'Custom Teak Dining Table',
                    'status' => 'on progress', // pending, on progress, completed, cancelled
                    'total_amount' => 4500000,
                    'platform_fee' => 45000, // Misal 1% fee
                    'start_date' => '2024-12-01',
                    'end_date' => '2024-12-15',
                ],
                [
                    'id' => 1002,
                    'project_id' => 56,
                    'customer_id' => 202,
                    'customer_name' => 'John Doe',
                    'crafter_id' => 308,
                    'crafter_name' => 'Siti Leather Craft',
                    'title' => 'Handmade Leather Wallet Batch',
                    'status' => 'pending',
                    'total_amount' => 1250000,
                    'platform_fee' => 12500,
                    'start_date' => '2024-12-20',
                    'end_date' => '2024-12-25',
                ],
                [
                    'id' => 1003,
                    'project_id' => 57,
                    'customer_id' => 205,
                    'customer_name' => 'Michael Smith',
                    'crafter_id' => 305,
                    'crafter_name' => 'Budi Woodworks',
                    'title' => 'Minimalist Bookshelf',
                    'status' => 'completed',
                    'total_amount' => 2800000,
                    'platform_fee' => 28000,
                    'start_date' => '2024-11-10',
                    'end_date' => '2024-11-20',
                ],
            ],
            // Link pagination kosong agar tidak error di frontend
            'links' => [], 
        ];

        return Inertia::render('Admin/Orders/index', [
            'orders' => $orders
        ]);
    }
}