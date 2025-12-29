<?php

namespace App\Http\Controllers\Crafter;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicCrafterController extends Controller
{
    public function index(Request $request)
    {
        $query = User::where('role', 'crafter')
            ->whereHas('crafterProfile');

        if ($request->has('search') && $request->search != '') {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhereHas('crafterProfile', function ($qp) use ($search) {
                        $qp->where('address', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->has('level') && $request->level !== 'all') {
            $query->whereHas('crafterProfile', function ($q) use ($request) {
                $q->where('level', $request->level);
            });
        }

        $crafters = $query->with(['crafterProfile.portfolios'])
            ->get()
            ->map(function ($user) {
                $profile = $user->crafterProfile;

                $mainPortfolio = $profile->portfolios->first();
                $coverImage = $mainPortfolio ? $mainPortfolio->image_url : null;

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'level' => $profile->level ?? 'pemula',
                    'address' => $profile->address ?? '-',
                    'rating' => (float) ($profile->rating_skill ?? 0),
                    'is_verified' => (bool) $profile->is_verified,
                    'projects_count' => $profile->portfolios->count(),
                    'avatar' => $user->avatar,
                    'portfolios' => $coverImage ? [['image' => $coverImage]] : []
                ];
            });

        return Inertia::render('CrafterList', [
            'crafters' => $crafters,
            'filters' => $request->only(['search', 'level']),
        ]);
    }

    public function show($id)
    {
        $user = User::where('role', 'crafter')
            ->with(['crafterProfile.portfolios'])
            ->findOrFail($id);

        $profile = $user->crafterProfile;

        $crafterData = [
            'id' => $user->id,
            'name' => $user->name,
            'role' => 'Pengrajin Kayu',
            'level' => ucfirst($profile->level ?? 'Pemula'),
            'address' => $profile->address ?? '-',
            'joinDate' => $user->created_at->format('Y'),
            'isVerified' => (bool) $profile->is_verified,
            'rating' => (float) ($profile->rating_skill ?? 0),
            'reviewCount' => 0,
            'projectsCompleted' => $profile->portfolios->count(),
            'responseTime' => '< 1 Jam',
            'bio' => $profile->bio ?? 'Belum ada deskripsi profil.',
            'skills' => $profile->skills ? json_decode($profile->skills) : [],

            'portfolios' => $profile->portfolios->map(function ($p) {
                return [
                    'id' => $p->id,
                    'title' => $p->title,
                    'category' => 'Furniture Custom',
                    'duration' => '-',
                    'image' => $p->image_url,
                    'images' => [$p->image_url],
                ];
            }),

            'reviews' => [],
        ];

        return Inertia::render('CrafterDetail', [
            'crafter' => $crafterData
        ]);
    }
}
