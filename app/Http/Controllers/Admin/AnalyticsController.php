<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AnalyticsController extends Controller
{
public function index()
    {
        // --- CONTOH DATA DARI DATABASE (NANTINYA) ---
        // $revenue = Transaction::sum('amount') * 0.1;
        // $projects = Project::groupBy('status')->count();
        
        return Inertia::render('Admin/Analytics/index', [
            // Kirim data ke Props React di sini
            // 'revenueSeries' => [[
            //     'name' => 'Komisi Rakit (10%)',
            //     'data' => [1500000, 2100000, 1800000, 3500000, 4200000, 5500000]
            // ]],
            // 'projectStatusSeries' => [12, 8, 5, 24], // [Menunggu, Workshop, Instalasi, Selesai]
            // 'topTechSeries' => [[
            //     'name' => 'Rating Rata-rata',
            //     'data' => [4.9, 4.8, 4.8, 4.7, 4.5]
            // ]]
        ]);
    }}
