<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CrafterController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $sort = $request->input('sort', 'join_date');
        $direction = $request->input('direction', 'desc');

        $query = User::query()
            ->where('role', 'crafter')
            ->leftJoin('crafter_profiles', 'users.id', '=', 'crafter_profiles.user_id')
            ->select(
                'users.*',
                'crafter_profiles.level',
                'crafter_profiles.rating_skill',
                'crafter_profiles.is_verified',
                'crafter_profiles.ktp_number',
                'crafter_profiles.address',
                'crafter_profiles.badges'
            );

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('users.name', 'like', "%{$search}%")
                    ->orWhere('users.email', 'like', "%{$search}%");
            });
        }

        switch ($sort) {
            case 'level':
                $query->orderByRaw("FIELD(crafter_profiles.level, 'pemula', 'menengah', 'ahli') $direction");
                break;
            case 'rating_skill':
                $query->orderBy('crafter_profiles.rating_skill', $direction);
                break;
            case 'join_date':
            default:
                $query->orderBy('users.created_at', $direction);
                break;
        }

        $crafters = $query->paginate(10)
            ->withQueryString()
            ->through(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone_number ?? '-',
                    'avatar' => $user->photo_path
                        ? asset('storage/' . $user->photo_path)
                        : 'https://ui-avatars.com/api/?name=' . urlencode($user->name) . '&background=random',
                    'level' => $user->level ?? 'pemula',
                    'rating_skill' => (float) ($user->rating_skill ?? 0),
                    'is_verified' => (bool) $user->is_verified,
                    'ktp_number' => $user->ktp_number ?? '-',
                    'address' => $user->address ?? 'Belum melengkapi data',
                    'badges' => is_string($user->badges) ? json_decode($user->badges) : ($user->badges ?? []),
                    'join_date' => $user->created_at->format('d M Y'),
                ];
            });

        return Inertia::render('Admin/Crafters/index', [
            'crafters' => $crafters,
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }
}
