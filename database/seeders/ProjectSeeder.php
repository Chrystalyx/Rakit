<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        // Ambil User ID
        $customers = User::where('role', 'customer')->pluck('id')->toArray();
        $crafters = User::where('role', 'crafter')->pluck('id')->toArray();

        if (empty($customers) || empty($crafters)) {
            return;
        }

        // 1. Generate Data untuk ANALYTICS (Revenue 6 Bulan Terakhir)
        // Kita buat loop mundur 6 bulan
        for ($i = 0; $i < 6; $i++) {
            $monthDate = Carbon::now()->subMonths($i);
            
            // Buat 3-5 project per bulan
            $count = rand(3, 5); 
            
            for ($j = 0; $j < $count; $j++) {
                $amount = rand(1000000, 5000000); // 1jt - 5jt
                
                Project::create([
                    'title' => 'Project Custom Furniture #' . rand(1000, 9999),
                    'customer_id' => $customers[array_rand($customers)],
                    'crafter_id' => $crafters[array_rand($crafters)],
                    'total_amount' => $amount,
                    'platform_fee' => $amount * 0.1, // 10% fee
                    'status' => 'completed',
                    'start_date' => $monthDate->copy()->subDays(10),
                    'end_date' => $monthDate, // Selesai di bulan tersebut
                    'created_at' => $monthDate,
                    'updated_at' => $monthDate,
                ]);
            }
        }

        // 2. Generate Data untuk ORDER LIST (Active Orders)
        
        // Status: On Progress
        Project::create([
            'title' => 'Custom Teak Dining Table',
            'customer_id' => $customers[0],
            'crafter_id' => $crafters[0], // Budi
            'total_amount' => 4500000,
            'platform_fee' => 450000,
            'status' => 'on_progress',
            'start_date' => Carbon::now()->subDays(5),
            'end_date' => Carbon::now()->addDays(10),
        ]);

        // Status: Pending Review (Menunggu Crafter)
        Project::create([
            'title' => 'Kitchen Set Minimalis',
            'customer_id' => $customers[1],
            'crafter_id' => null, // Belum diambil crafter
            'total_amount' => 12000000,
            'platform_fee' => 1200000,
            'status' => 'pending',
            'start_date' => Carbon::now()->addDays(1),
            'end_date' => Carbon::now()->addDays(30),
        ]);

        // Status: Payment Pending
        Project::create([
            'title' => 'Rak Buku Gantung',
            'customer_id' => $customers[2],
            'crafter_id' => $crafters[1], // Siti
            'total_amount' => 750000,
            'platform_fee' => 75000,
            'status' => 'pending',
            'start_date' => Carbon::now(),
            'end_date' => Carbon::now()->addDays(5),
        ]);
    }
}