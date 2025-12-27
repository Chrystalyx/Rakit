<?php

namespace App\Http\Controllers\Crafter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Project;
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

        return Inertia::render('Crafter/Dashboard', [
            'crafter' => $crafterData,
            'activeProjects' => $activeProjects,
            'newRequests' => $newRequests,
        ]);
    }

    public function show($id)
    {
        $user = Auth::user();

        // Ambil project, pastikan project ini milik crafter yang sedang login
        $project = Project::with('customer')
            ->where('crafter_id', $user->id)
            ->findOrFail($id);

        // Format data agar sesuai dengan props yang diminta React
        $projectData = [
            'id' => $project->id,
            'title' => $project->title,
            'client' => $project->customer->name ?? 'Klien',
            'client_id' => $project->customer->id, // Penting untuk Chat
            'client_avatar' => substr($project->customer->name, 0, 1),
            'address' => $project->address ?? 'Lokasi tidak tersedia',
            'start_date' => $project->start_date ? Carbon::parse($project->start_date)->format('d M Y') : '-',
            'deadline' => $project->end_date ? Carbon::parse($project->end_date)->format('d M Y') : '-',
            'status' => ucfirst(str_replace('_', ' ', $project->status)),
            'fee' => (int) $project->platform_fee, // Asumsi pendapatan crafter

            // Generate Data Spesifikasi Dummy (Karena belum ada di DB)
            // Nanti Anda bisa buat tabel 'project_specs' atau kolom JSON 'specifications'
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

            // Generate Timeline Logika Sederhana
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
}
