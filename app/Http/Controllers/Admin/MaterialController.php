<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MaterialController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sortColumn = $request->input('sort', 'id');
        $sortDirection = $request->input('direction', 'desc');
        $validSortColumns = ['id', 'name', 'category', 'price', 'is_active'];
        if (!in_array($sortColumn, $validSortColumns)) {
            $sortColumn = 'id';
        }

        $materials = Material::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('specification', 'like', "%{$search}%");
            })
            ->orderBy($sortColumn, $sortDirection)
            ->paginate(10)
            ->withQueryString()
            ->through(function ($material) {
                return [
                    'id' => $material->id,
                    'name' => $material->name,
                    'category' => $material->category,
                    'specification' => $material->specification,
                    'price' => (float) $material->price,
                    'unit' => $material->unit,
                    'is_active' => $material->is_active,
                    'image' => $material->image_path
                        ? asset('storage/' . $material->image_path)
                        : 'https://placehold.co/400x400?text=No+Image',
                ];
            });

        return Inertia::render('Admin/Materials/index', [
            'materials' => $materials,
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
            'name' => 'required|string|max:255',
            'category' => 'required|string|in:plywood,hpl,finishing',
            'specification' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data = $request->except('image');
        $data['is_active'] = true;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('materials', 'public');
            $data['image_path'] = $path;
        }

        Material::create($data);

        return redirect()->route('admin.materials.index')
            ->with('success', 'Material berhasil ditambahkan.');
    }

    public function edit(Material $material)
    {
        return Inertia::render('Admin/Materials/Edit', [
            'material' => [
                'id' => $material->id,
                'name' => $material->name,
                'category' => $material->category,
                'specification' => $material->specification,
                'price' => $material->price,
                'unit' => $material->unit,
                'image' => $material->image_path ? asset('storage/' . $material->image_path) : null,
                'is_active' => $material->is_active,
            ]
        ]);
    }

    public function update(Request $request, Material $material)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|in:plywood,hpl,finishing',
            'specification' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            if ($material->image_path && Storage::disk('public')->exists($material->image_path)) {
                Storage::disk('public')->delete($material->image_path);
            }

            $path = $request->file('image')->store('materials', 'public');
            $data['image_path'] = $path;
        }

        $material->update($data);

        return redirect()->route('admin.materials.index')
            ->with('success', 'Material berhasil diperbarui.');
    }

    public function destroy(Material $material)
    {
        if ($material->image_path && Storage::disk('public')->exists($material->image_path)) {
            Storage::disk('public')->delete($material->image_path);
        }

        $material->delete();

        return redirect()->back()
            ->with('success', 'Material berhasil dihapus.');
    }

    public function toggle(Material $material)
    {
        $material->update([
            'is_active' => !$material->is_active
        ]);

        return redirect()->back()
            ->with('success', 'Status material diperbarui.');
    }
}
