<?php

namespace App\Http\Controllers\Crafter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $profile = \App\Models\CrafterProfile::where('user_id', $user->id)->first();

        $activeProjectsCount = Project::where('crafter_id', $user->id)
            ->where('status', 'on_progress')
            ->count();

        $completedProjectsCount = Project::where('crafter_id', $user->id)
            ->where('status', 'completed')
            ->count();

        $monthlyIncome = Project::where('crafter_id', $user->id)
            ->where('status', 'completed')
            ->whereMonth('updated_at', Carbon::now()->month)
            ->sum('platform_fee');

        $crafterData = [
            'name' => $user->name,
            'level' => $profile->level ?? 'pemula',
            'rating' => (float) ($profile->rating_skill ?? 0),
            'monthly_income' => (int) $monthlyIncome,
            'active_projects' => $activeProjectsCount,
            'completed_projects' => $completedProjectsCount,
        ];

        $activeProjects = Project::where('crafter_id', $user->id)
            ->where('status', 'on_progress')
            ->with('customer')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'client' => $project->customer->name ?? 'Klien',
                    'deadline' => $project->end_date
                        ? Carbon::parse($project->end_date)->diffForHumans()
                        : '-',
                    'progress' => 50,
                    'status' => 'On Progress',
                ];
            });

        $newRequests = Project::whereNull('crafter_id')
            ->where('status', 'pending')
            ->latest()
            ->take(3)
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'budget' => "Rp " . number_format($project->total_amount, 0, ',', '.'),
                    'location' => 'Online',
                ];
            });

        return Inertia::render('Crafter/Portfolio', [
            'crafter' => $crafterData,
            'activeProjects' => $activeProjects,
            'newRequests' => $newRequests,
        ]);
    }

    public function show($id)
    {
        $user = Auth::user();

        $project = Project::with('customer')
            ->where('crafter_id', $user->id)
            ->findOrFail($id);

        $projectData = [
            'id' => $project->id,
            'title' => $project->title,
            'client' => $project->customer->name ?? 'Klien',
            'client_id' => $project->customer->id,
            'client_avatar' => substr($project->customer->name, 0, 1),
            'address' => $project->address ?? 'Lokasi tidak tersedia',
            'start_date' => $project->start_date ? Carbon::parse($project->start_date)->format('d M Y') : '-',
            'deadline' => $project->end_date ? Carbon::parse($project->end_date)->format('d M Y') : '-',
            'status' => ucfirst(str_replace('_', ' ', $project->status)),
            'fee' => (int) $project->platform_fee,

            'specs' => [
                'width' => 200,
                'height' => 220,
                'depth' => 60,
                'plinth' => 10,
                'backPanel' => true,
                'partitions' => 4,
                'shelves' => 8,
                'ledStrip' => true,
                'doorType' => 'swing',
                'lock' => true,
                'materialName' => 'Multiplek 18mm',
                'finishing' => 'HPL Taco (Custom)',
            ],

            'timeline' => [
                [
                    'stage' => 'Konfirmasi & DP',
                    'date' => $project->created_at->format('d M'),
                    'status' => 'completed'
                ],
                [
                    'stage' => 'Pengerjaan',
                    'date' => 'Sedang Berjalan',
                    'status' => $project->status == 'on_progress' ? 'current' : ($project->status == 'completed' ? 'completed' : 'upcoming')
                ],
                [
                    'stage' => 'Pengiriman & Instalasi',
                    'date' => 'Est. ' . ($project->end_date ? Carbon::parse($project->end_date)->format('d M') : '-'),
                    'status' => $project->status == 'completed' ? 'completed' : 'upcoming'
                ]
            ]
        ];

        return Inertia::render('Crafter/ProjectDetail', [
            'project' => $projectData
        ]);
    }

    public function portfolio()
    {
        $user = Auth::user();

        $user->load('crafterProfile.portfolios');

        if (!$user->crafterProfile) {
            return redirect()->route('crafter.dashboard');
        }

        $crafterData = [
            'id' => $user->id,
            'name' => $user->name,
            'role' => 'Pengrajin Kayu',
            'address' => $user->crafterProfile->address ?? '-',
            'avatar' => $user->avatar,
            'bio' => $user->crafterProfile->bio ?? '',
            'skills' => $user->crafterProfile->skills ? json_decode($user->crafterProfile->skills) : [],
            'reviewCount' => 0,

            'portfolios' => $user->crafterProfile->portfolios->map(function ($p) {
                return [
                    'id' => $p->id,
                    'title' => $p->title,
                    'category' => 'Furniture',
                    'images' => is_array($p->images) ? $p->images : [$p->image_url],
                    'image' => $p->image_url
                ];
            }),
            'reviews' => []
        ];

        return Inertia::render('Crafter/Portfolio', [
            'crafter' => $crafterData
        ]);
    }

    public function projectList()
    {
        $user = Auth::user();

        $activeProjects = Project::where('crafter_id', $user->id)
            ->where('status', 'on_progress')
            ->with('customer')
            ->latest()
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'client' => $project->customer->name ?? 'Klien',
                    'status' => 'On Progress',
                    'deadline' => $project->end_date
                        ? Carbon::parse($project->end_date)->diffForHumans()
                        : '-',
                    'progress' => $project->progress ?? 50,
                ];
            });

        $newRequests = Project::whereNull('crafter_id')
            ->where('status', 'pending')
            ->with('customer')
            ->latest()
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'budget' => "Rp " . number_format($project->total_amount, 0, ',', '.'),
                    'location' => $project->address ?? 'Online',
                ];
            });

        $rating = (float) ($user->crafterProfile->rating_skill ?? 0);

        $completedProjects = Project::where('crafter_id', $user->id)
            ->where('status', 'completed')
            ->count();

        $monthlyIncome = Project::where('crafter_id', $user->id)
            ->where('status', 'completed')
            ->whereMonth('updated_at', Carbon::now()->month)
            ->sum('platform_fee');

        $crafterData = [
            'name' => $user->name,
            'level' => ucfirst($user->crafterProfile->level ?? 'Pemula'),
            'active_projects' => $activeProjects->count(),
            'completed_projects' => $completedProjects,
            'rating' => $rating,
            'monthly_income' => (int) $monthlyIncome
        ];

        return Inertia::render('Crafter/ProjectList', [
            'crafter' => $crafterData,
            'activeProjects' => $activeProjects,
            'newRequests' => $newRequests
        ]);
    }
}
