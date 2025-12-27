<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\CrafterProfile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {

        // Buat Customer Dummy
        $customers = [
            ['name' => 'Alice Wonder', 'email' => 'alice@gmail.com'],
            ['name' => 'John Doe', 'email' => 'john@gmail.com'],
            ['name' => 'Michael Smith', 'email' => 'michael@gmail.com'],
        ];

        foreach ($customers as $cust) {
            User::create([
                'name' => $cust['name'],
                'email' => $cust['email'],
                'password' => Hash::make('password'),
                'role' => 'customer',
                'phone_number' => '081' . rand(10000000, 99999999),
            ]);
        }

        // Buat Crafter & Profilnya (Sesuai Dummy Data Controller)
        
        // Crafter 1: Budi Santoso (Ahli)
        $budi = User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi@woodworks.com',
            'password' => Hash::make('password'),
            'role' => 'crafter',
            'phone_number' => '0812-3333-4444',
        ]);
        
        CrafterProfile::create([
            'user_id' => $budi->id,
            'level' => 'ahli',
            'ktp_number' => '3201123456780001',
            'address' => 'Jl. Jati No. 5, Jepara, Jawa Tengah',
            'is_verified' => true,
            'rating_skill' => 4.8,
            // Simpan JSON badges (sesuai request Anda sebelumnya)
            // Pastikan kolom badges ada di migrasi, jika tidak hapus baris ini
            // 'badges' => json_encode(['Woodworking Master', 'Verified Pro', 'Top Rated']), 
        ]);

        // Crafter 2: Siti Aminah (Menengah)
        $siti = User::create([
            'name' => 'Siti Aminah',
            'email' => 'siti@craft.com',
            'password' => Hash::make('password'),
            'role' => 'crafter',
            'phone_number' => '0812-5555-6666',
        ]);

        CrafterProfile::create([
            'user_id' => $siti->id,
            'level' => 'menengah',
            'ktp_number' => '3204987654320002',
            'address' => 'Jl. Kulit No. 12, Garut, Jawa Barat',
            'is_verified' => true,
            'rating_skill' => 4.5,
        ]);

        // Crafter 3: Rudi Hartono (Pemula)
        $rudi = User::create([
            'name' => 'Rudi Hartono',
            'email' => 'rudi@welding.com',
            'password' => Hash::make('password'),
            'role' => 'crafter',
            'phone_number' => '0812-7777-8888',
        ]);

        CrafterProfile::create([
            'user_id' => $rudi->id,
            'level' => 'pemula',
            'ktp_number' => '3273123456780003',
            'address' => 'Jl. Besi No. 88, Surabaya',
            'is_verified' => true, // Set false jika ingin test fitur verification
            'rating_skill' => 3.8,
        ]);
    }
}