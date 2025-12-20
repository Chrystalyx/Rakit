<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Pagination\LengthAwarePaginator; // Import wajib untuk pagination manual

class MaterialController extends Controller
{
    // DATA DUMMY STATIC
    private $dummyMaterials = [
        [
            'id' => 1,
            'name' => 'Multiplek Meranti 18mm',
            'category' => 'plywood',
            'specification' => 'Grade A, Face mulus, back sanding',
            'price' => 245000,
            'unit' => 'Lembar',
            'image' => 'https://placehold.co/100x100/png?text=Plywood',
            'is_active' => true,
        ],
        [
            'id' => 2,
            'name' => 'HPL Taco TH-123 AA',
            'category' => 'hpl',
            'specification' => 'Solid Color, White Glossy, 0.7mm',
            'price' => 185000,
            'unit' => 'Lembar',
            'image' => 'https://placehold.co/100x100/png?text=HPL',
            'is_active' => true,
        ],
        [
            'id' => 3,
            'name' => 'Cat Duco Nippe 2000',
            'category' => 'finishing',
            'specification' => 'Warna Super White, Kaleng 1kg',
            'price' => 85000,
            'unit' => 'Kaleng',
            'image' => 'https://placehold.co/100x100/png?text=Paint',
            'is_active' => false,
        ],
        // Tambahan data agar pagination terlihat
        [
            'id' => 4,
            'name' => 'Engsel Sendok Slow Motion',
            'category' => 'hardware',
            'specification' => 'Full bungkuk, soft close',
            'price' => 15000,
            'unit' => 'Pcs',
            'image' => 'https://placehold.co/100x100/png?text=Hinge',
            'is_active' => true,
        ],
    ];

    public function index(Request $request)
    {
        // 1. Ubah Array jadi Collection Laravel
        $materials = collect($this->dummyMaterials);

        // 2. LOGIKA SEARCH (Filter by Name)
        if ($search = $request->input('search')) {
            $materials = $materials->filter(function ($item) use ($search) {
                return false !== stripos($item['name'], $search); // Case-insensitive
            });
        }

        // 3. LOGIKA SORTING
        $sortField = $request->input('sort', 'id'); // Default sort by ID
        $sortDirection = $request->input('direction', 'asc'); // Default Ascending

        if ($sortDirection === 'desc') {
            $materials = $materials->sortByDesc($sortField);
        } else {
            $materials = $materials->sortBy($sortField);
        }

        // Reset keys agar JSON array tetap rapi (0, 1, 2...)
        $materials = $materials->values();

        // 4. Manual Pagination (Simulasi DB Paginate)
        $perPage = 10;
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $currentItems = $materials->slice(($currentPage - 1) * $perPage, $perPage)->all();
        
        $paginatedItems = new LengthAwarePaginator(
            $currentItems, 
            count($materials), 
            $perPage, 
            $currentPage, 
            ['path' => $request->url(), 'query' => $request->query()]
        );

        return Inertia::render('Admin/Materials/index', [
            'materials' => $paginatedItems,
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Materials/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'category' => 'required',
            'price' => 'required|numeric',
            'image' => 'nullable|image',
        ]);

        return redirect()->route('materials.index')
            ->with('success', 'Material berhasil ditambahkan (Simulasi).');
    }

    public function edit($id)
    {
        $material = collect($this->dummyMaterials)->firstWhere('id', (int)$id);
        if (!$material) abort(404);

        return Inertia::render('Admin/Materials/Edit', [
            'material' => $material
        ]);
    }

    public function update(Request $request, $id)
    {
        return redirect()->route('materials.index')
            ->with('success', 'Material berhasil diperbarui (Simulasi).');
    }

    public function destroy($id)
    {
        return redirect()->route('materials.index')
            ->with('success', 'Material berhasil dihapus (Simulasi).');
    }

    public function toggleStatus($id)
    {
        return back()->with('success', 'Status material berhasil diubah.');
    }
}