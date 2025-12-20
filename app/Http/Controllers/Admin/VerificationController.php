<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerificationController extends Controller
{
    public function index()
    {
        // DATA DUMMY STATIC
        // Kita membungkusnya dalam array 'data' agar strukturnya
        // sama persis dengan hasil User::paginate() dari database.
        $crafters = [
            'data' => [
                [
                    'id' => 1,
                    'name' => 'Budi Santoso',
                    'email' => 'budi.crafter@example.com',
                    'phone' => '0812-3456-7890',
                    'ktp_number' => '3201123456780001',
                    'address' => 'Jl. Merdeka No. 45, Bandung, Jawa Barat',
                    'role' => 'crafter',
                    'status' => 'pending',
                    'created_at' => '2024-12-20 09:00',
                ],
                [
                    'id' => 2,
                    'name' => 'Siti Aminah',
                    'email' => 'siti.artisan@example.com',
                    'phone' => '0898-7654-3210',
                    'ktp_number' => '3204987654320002',
                    'address' => 'Komplek Griya Indah Blok A2, Cimahi',
                    'role' => 'crafter',
                    'status' => 'pending',
                    'created_at' => '2024-12-21 10:30',
                ],
                [
                    'id' => 3,
                    'name' => 'Rahmat Hidayat',
                    'email' => 'rahmat.woodwork@example.com',
                    'phone' => '0856-7890-1234',
                    'ktp_number' => '3273123456780003',
                    'address' => 'Jl. Dago Atas No. 102, Bandung',
                    'role' => 'crafter',
                    'status' => 'pending',
                    'created_at' => '2024-12-21 14:15',
                ],
            ],
            // 'links' dikosongkan agar logika pagination di frontend tidak error
            'links' => [],
            'current_page' => 1,
        ];

        return Inertia::render('Admin/Verification/index', [
            'crafters' => $crafters
        ]);
    }

    public function approve($id)
    {
        // Karena ini mode static/demo, kita tidak melakukan query database.
        // Cukup return back seolah-olah berhasil.
        
        return back()->with('message', 'Simulasi: Crafter berhasil diverifikasi (Mode Static).');
    }
}