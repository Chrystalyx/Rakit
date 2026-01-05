<?php

namespace App\Http\Controllers\Crafter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Portfolio;
use App\Models\CrafterProfile;
use Illuminate\Support\Facades\Auth;

class PortfolioController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'description' => 'nullable|string',
            'config' => 'nullable|array',
            'specs' => 'nullable|array',
            'realPhotos' => 'nullable|array',
        ]);

        $profile = CrafterProfile::where('user_id', Auth::id())->firstOrFail();

        $coverImage = null;
        if (!empty($data['realPhotos']) && isset($data['realPhotos'][0]['url'])) {
            $coverImage = $data['realPhotos'][0]['url'];
        }

        Portfolio::create([
            'crafter_profile_id' => $profile->id,
            'title' => $data['title'],
            'category' => $data['category'],
            'description' => $data['description'],
            'config' => $data['config'],
            'specs' => $data['specs'],
            'images' => $data['realPhotos'],
            'image_path' => $coverImage,
            'project_value' => 0,
        ]);

        return back()->with('success', 'Proyek berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $portfolio = Portfolio::findOrFail($id);

        if ($portfolio->crafterProfile->user_id !== Auth::id()) {
            abort(403);
        }

        $data = $request->validate([
            'title' => 'required|string',
            'category' => 'required|string',
            'description' => 'nullable|string',
            'config' => 'nullable|array',
            'specs' => 'nullable|array',
            'realPhotos' => 'nullable|array',
        ]);

        $coverImage = $portfolio->image_path;
        if (!empty($data['realPhotos']) && isset($data['realPhotos'][0]['url'])) {
            $coverImage = $data['realPhotos'][0]['url'];
        }

        $portfolio->update([
            'title' => $data['title'],
            'category' => $data['category'],
            'description' => $data['description'],
            'config' => $data['config'],
            'specs' => $data['specs'],
            'images' => $data['realPhotos'],
            'image_path' => $coverImage,
        ]);

        return back()->with('success', 'Proyek berhasil diperbarui');
    }

    public function destroy($id)
    {
        $portfolio = Portfolio::findOrFail($id);

        if ($portfolio->crafterProfile->user_id !== Auth::id()) {
            abort(403);
        }

        $portfolio->delete();

        return back()->with('success', 'Proyek dihapus');
    }
}
