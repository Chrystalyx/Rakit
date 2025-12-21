<?php

namespace App\Http\Controllers\Admin;

use App\Models\Project;
use App\Models\CrafterProfile;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AnalyticsController extends Controller
{
    public function index()
    {
        // Setup Range 6 Bulan Terakhir
        $months = collect(range(5, 0))->map(function ($i) {
            return Carbon::now()->subMonths($i);
        });

        // Format Label Bulan (Jan, Feb, etc) untuk Sumbu X Chart
        $revenueCategories = $months->map->format('M')->values();

        // 1. DATA REVENUE (Line/Area Chart)
        $monthlyRevenue = Project::select(
            DB::raw('SUM(platform_fee) as total'),
            DB::raw("DATE_FORMAT(updated_at, '%Y-%m') as month_key")
        )
            ->where('status', 'completed')
            ->where('updated_at', '>=', Carbon::now()->subMonths(6))
            ->groupBy('month_key')
            ->pluck('total', 'month_key');

        $revenueData = $months->map(function ($date) use ($monthlyRevenue) {
            return $monthlyRevenue->get($date->format('Y-m')) ?? 0;
        })->values();

        // 2. DATA PROJECT VOLUME (Bar Chart) - [DATA BARU]
        // Menghitung jumlah proyek yang dibuat per bulan
        $monthlyProjects = Project::select(
            DB::raw('COUNT(*) as total'),
            DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month_key")
        )
            ->where('created_at', '>=', Carbon::now()->subMonths(6))
            ->groupBy('month_key')
            ->pluck('total', 'month_key');

        $projectVolumeData = $months->map(function ($date) use ($monthlyProjects) {
            return $monthlyProjects->get($date->format('Y-m')) ?? 0;
        })->values();

        // 3. DATA STATUS (Donut Chart)
        $statusCounts = Project::select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status');

        $projectStatusSeries = [
            $statusCounts['pending'] ?? 0,
            $statusCounts['on_progress'] ?? 0,
            $statusCounts['completed'] ?? 0
        ];

        // 4. DATA TOP CRAFTER (Horizontal Bar Chart)
        $topCraft = CrafterProfile::with('user')
            ->orderByDesc('rating_skill')
            ->limit(5)
            ->get();

        $topCraftNames = $topCraft->map(fn($t) => $t->user->name)->values();
        $topCraftRatings = $topCraft->map(fn($t) => $t->rating_skill)->values();

        // 5. DATA LEVEL CRAFTER (Pie Chart) - [DATA BARU]
        // Menghitung distribusi level crafter
        $levelCounts = CrafterProfile::select('level', DB::raw('count(*) as total'))
            ->groupBy('level')
            ->pluck('total', 'level');
        
        // Pastikan urutannya konsisten sesuai label
        $crafterLevelSeries = [
            $levelCounts['pemula'] ?? 0,
            $levelCounts['menengah'] ?? 0,
            $levelCounts['ahli'] ?? 0
        ];

        return Inertia::render('Admin/Analytics/index', [
            // Data Revenue
            'revenueSeries' => [[
                'name' => 'Komisi Rakit (10%)',
                'data' => $revenueData
            ]],
            'revenueCategories' => $revenueCategories,

            // Data Project Volume (Insight Baru)
            'projectVolumeSeries' => [[
                'name' => 'Jumlah Proyek Baru',
                'data' => $projectVolumeData
            ]],

            // Data Status
            'projectStatusSeries' => $projectStatusSeries,
            'projectStatusLabels' => ['Menunggu Review', 'Dalam Pengerjaan', 'Selesai'],

            // Data Top Crafter
            'topCraftSeries' => [[
                'name' => 'Rating Rata-rata',
                'data' => $topCraftRatings
            ]],
            'topCraftCategories' => $topCraftNames,

            // Data Level Crafter (Insight Baru)
            'crafterLevelSeries' => $crafterLevelSeries,
            'crafterLevelLabels' => ['Pemula', 'Menengah', 'Ahli'],
        ]);
    }
}