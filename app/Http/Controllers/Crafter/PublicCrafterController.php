<?php

namespace App\Http\Controllers\Crafter;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Project;
use App\Models\ProjectRejection;
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

        return Inertia::render('Customer/CrafterPortfolio', [
            'crafter' => $crafterData
        ]);
    }

    public function choose(Request $request)
    {
        $query = User::where('role', 'crafter')
            ->whereHas('crafterProfile', function ($q) {
                $q->where('is_verified', true);
            });

        if ($request->has('reorder_id')) {
            $rejectedCrafterIds = \App\Models\ProjectRejection::where('project_id', $request->reorder_id)
                ->pluck('crafter_id')
                ->toArray();

            $currentProject = Project::find($request->reorder_id);
            if ($currentProject && $currentProject->crafter_id) {
                $rejectedCrafterIds[] = $currentProject->crafter_id;
            }

            if (!empty($rejectedCrafterIds)) {
                $query->whereNotIn('id', $rejectedCrafterIds);
            }
        }

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->location && $request->location !== 'Semua') {
            $query->whereHas('crafterProfile', function ($q) use ($request) {
                $q->where('address', 'like', '%' . $request->location . '%');
            });
        }

        $crafters = $query->with(['crafterProfile', 'crafterProfile.portfolios'])
            ->get()
            ->map(function ($user) {
                $profile = $user->crafterProfile;

                $cover = 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80';

                if ($profile && $profile->portfolios && $profile->portfolios->isNotEmpty()) {
                    $cover = $profile->portfolios->first()->image_url;
                }

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'location' => $profile->address ?? 'Indonesia',
                    'rating' => (float) ($profile->rating_skill ?? 0),
                    'reviews' => 0,
                    'projects' => $profile->portfolios->count(),
                    'verified' => (bool) $profile->is_verified,
                    'avatar' => $user->avatar ?? "https://ui-avatars.com/api/?name=" . urlencode($user->name),
                    'cover' => $cover,
                    'status' => 'Available',
                    'specialties' => $profile->skills ? json_decode($profile->skills) : [],
                ];
            });

        return Inertia::render('Customer/ChooseCrafter', [
            'crafters' => $crafters,
            'filters' => $request->only(['search', 'location']),
        ]);
    }
}
