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
        $months = collect(range(5, 0))->map(function ($i) {
            return Carbon::now()->subMonths($i);
        });

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

        $revenueCategories = $months->map->format('M')->values();

        $statusCounts = Project::select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status');

        $projectStatusSeries = [
            $statusCounts['pending'] ?? 0,
            $statusCounts['on_progress'] ?? 0,
            $statusCounts['completed'] ?? 0
        ];

        $projectStatusLabels = ['Menunggu Review', 'Dalam Pengerjaan', 'Selesai'];

        $topCraft = CrafterProfile::with('user')
            ->orderByDesc('rating_skill')
            ->limit(5)
            ->get();

        $topCraftNames = $topCraft->map(fn($t) => $t->user->name)->values();
        $topCraftRatings = $topCraft->map(fn($t) => $t->rating_skill)->values();


        return Inertia::render('Admin/Analytics/index', [
            'revenueSeries' => [[
                'name' => 'Komisi Rakit (10%)',
                'data' => $revenueData
            ]],
            'revenueCategories' => $revenueCategories,
            'projectStatusSeries' => $projectStatusSeries,
            'projectStatusLabels' => $projectStatusLabels,
            'topCraftSeries' => [[
                'name' => 'Rating Rata-rata',
                'data' => $topCraftRatings
            ]],
            'topCraftCategories' => $topCraftNames,
        ]);
    }
}
