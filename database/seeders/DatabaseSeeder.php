<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\CrafterProfile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {   
        User::factory()->create([
            'name' => 'Admin Rakit',
            'email' => 'admin@rakit.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        $clientSarah = User::factory()->create([
            'name' => 'Ibu Sarah',
            'email' => 'sarah@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
        ]);

        $clientHendra = User::factory()->create([
            'name' => 'Pak Hendra',
            'email' => 'hendra@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
        ]);

        $clientRuangGuru = User::factory()->create([
            'name' => 'Kantor RuangGuru',
            'email' => 'rg@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
        ]);

        $crafterBudi = User::factory()->create([
            'name' => 'Budi Santoso',
            'email' => 'budi@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'crafter',
        ]);

        CrafterProfile::create([
            'user_id' => $crafterBudi->id,
            'level' => 'ahli',
            'ktp_number' => '3273000000000001',
            'address' => 'Jl. Pengrajin Kayu No. 1, Jepara',
            'is_verified' => true,
            'rating_skill' => 4.8,
        ]);

        $crafterDaffa = User::factory()->create([
            'name' => 'Daffa',
            'email' => 'daffa@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'crafter',
        ]);

        CrafterProfile::create([
            'user_id' => $crafterDaffa->id,
            'level' => 'menengah',
            'ktp_number' => '3273000000000002',
            'address' => 'Jl. Dago Atas No. 99, Bandung',
            'is_verified' => true,
            'rating_skill' => 4.5,
        ]);

        Project::create([
            'title' => 'Kitchen Set Minimalis',
            'customer_id' => $clientSarah->id,
            'crafter_id' => $crafterBudi->id,
            'status' => 'on_progress',
            'total_amount' => 5000000,
            'platform_fee' => 4500000,
            'progress' => 75,
            'start_date' => Carbon::now()->subDays(10),
            'end_date' => Carbon::now()->addDays(5),
            'address' => 'Jl. Dago Asri No. 42, Bandung',
        ]);

        Project::create([
            'title' => 'Lemari Pakaian 3 Pintu',
            'customer_id' => $clientHendra->id,
            'crafter_id' => $crafterBudi->id,
            'status' => 'on_progress',
            'total_amount' => 3500000,
            'platform_fee' => 3000000,
            'progress' => 30,
            'start_date' => Carbon::now()->subDays(5),
            'end_date' => Carbon::now()->addDays(12),
            'address' => 'Komp. Setiabudi Regency, Bandung',
        ]);

        Project::create([
            'title' => 'Meja Kerja Industrial',
            'customer_id' => $clientRuangGuru->id,
            'crafter_id' => $crafterBudi->id,
            'status' => 'on_progress',
            'total_amount' => 2000000,
            'platform_fee' => 1800000,
            'progress' => 10,
            'start_date' => Carbon::now()->subDays(2),
            'end_date' => Carbon::now()->addDays(20),
            'address' => 'Kantor RuangGuru Cab. Bandung',
        ]);

        Project::create([
            'title' => 'Rak Buku Jati',
            'customer_id' => $clientSarah->id,
            'crafter_id' => $crafterBudi->id,
            'status' => 'completed',
            'total_amount' => 9000000,
            'platform_fee' => 8500000,
            'progress' => 100,
            'start_date' => Carbon::now()->subMonth(),
            'end_date' => Carbon::now()->subDays(2),
            'updated_at' => Carbon::now(),
            'address' => 'Jl. Dago Asri No. 42',
        ]);

        Project::create([
            'title' => 'Dipan Tempat Tidur King Size',
            'customer_id' => $clientHendra->id,
            'crafter_id' => $crafterDaffa->id,
            'status' => 'on_progress',
            'total_amount' => 4500000,
            'platform_fee' => 4000000,
            'progress' => 50,
            'start_date' => Carbon::now()->subDays(7),
            'end_date' => Carbon::now()->addDays(7),
            'address' => 'Apartemen Gateway Cicadas',
        ]);

        Project::create([
            'title' => 'Rak TV Gantung',
            'customer_id' => $clientSarah->id,
            'crafter_id' => null,
            'status' => 'pending',
            'total_amount' => 2500000,
            'platform_fee' => 2500000,
            'progress' => 0,
            'address' => 'Bandung Kota',
        ]);

        Project::create([
            'title' => 'Dipan Tempat Tidur Custom',
            'customer_id' => $clientHendra->id,
            'crafter_id' => null,
            'status' => 'pending',
            'total_amount' => 4000000,
            'platform_fee' => 4000000,
            'progress' => 0,
            'address' => 'Cimahi',
        ]);
    }
}
