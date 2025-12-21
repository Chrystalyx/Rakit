<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Pagination\LengthAwarePaginator;

class CrafterController extends Controller
{
    // DATA DUMMY (Sesuai Schema TECHNICIAN_PROFILES)
    private $dummyCrafters = [
        [
            'id' => 101,
            'user_id' => 1,
            'name' => 'Budi Santoso',
            'email' => 'budi@woodworks.com',
            'avatar' => 'https://ui-avatars.com/api/?name=Budi+Santoso&background=0D8ABC&color=fff',
            'phone' => '0812-3333-4444',
            'level' => 'ahli',
            'ktp_number' => '3201123456780001',
            'address' => 'Jl. Jati No. 5, Jepara, Jawa Tengah',
            'is_verified' => true,
            'rating_skill' => 4.8,
            'badges' => ['Woodworking Master', 'Verified Pro', 'Top Rated'],
            'join_date' => '2023-01-15',
            'status' => 'active', 
        ],
        [
            'id' => 102,
            'user_id' => 2,
            'name' => 'Siti Aminah',
            'email' => 'siti@craft.com',
            'avatar' => 'https://ui-avatars.com/api/?name=Siti+Aminah&background=D74654&color=fff',
            'phone' => '0812-5555-6666',
            'level' => 'menengah',
            'ktp_number' => '3204987654320002',
            'address' => 'Jl. Kulit No. 12, Garut, Jawa Barat',
            'is_verified' => true,
            'rating_skill' => 4.5,
            'badges' => ['Leather Specialist', 'Fast Response'],
            'join_date' => '2023-03-10',
            'status' => 'active',
        ],
        [
            'id' => 103,
            'user_id' => 3,
            'name' => 'Rudi Hartono',
            'email' => 'rudi@welding.com',
            'avatar' => 'https://ui-avatars.com/api/?name=Rudi+Hartono&background=333&color=fff',
            'phone' => '0812-7777-8888',
            'level' => 'pemula',
            'ktp_number' => '3273123456780003',
            'address' => 'Jl. Besi No. 88, Surabaya',
            'is_verified' => true,
            'rating_skill' => 3.8,
            'badges' => ['Newcomer'],
            'join_date' => '2023-11-20',
            'status' => 'active',
        ],
    ];

    public function index(Request $request)
    {
        $crafters = collect($this->dummyCrafters);

        // Filter Search
        if ($search = $request->input('search')) {
            $crafters = $crafters->filter(function ($item) use ($search) {
                return false !== stripos($item['name'], $search) || 
                       false !== stripos($item['email'], $search);
            });
        }

        // Sort
        $sortField = $request->input('sort', 'join_date');
        $sortDirection = $request->input('direction', 'desc');

        if ($sortDirection === 'desc') {
            $crafters = $crafters->sortByDesc($sortField);
        } else {
            $crafters = $crafters->sortBy($sortField);
        }

        $crafters = $crafters->values();

        // Manual Pagination
        $perPage = 10;
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $currentItems = $crafters->slice(($currentPage - 1) * $perPage, $perPage)->all();
        
        $paginatedItems = new LengthAwarePaginator(
            $currentItems, 
            count($crafters), 
            $perPage, 
            $currentPage, 
            ['path' => $request->url(), 'query' => $request->query()]
        );

        // PENTING: Nama view disesuaikan dengan "index" (huruf kecil)
        return Inertia::render('Admin/Crafters/index', [
            'crafters' => $paginatedItems,
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }
}