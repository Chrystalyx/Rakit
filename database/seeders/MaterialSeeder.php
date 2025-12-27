<?php

namespace Database\Seeders;

use App\Models\Material;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    public function run(): void
    {
        $materials = [
            [
                'name' => 'Multiplek Meranti 18mm',
                'category' => 'plywood',
                'specification' => 'Grade A, Face mulus, back sanding',
                'price' => 245000,
                'unit' => 'Lembar',
                'is_active' => true,
                // Image path dikosongkan atau isi path dummy jika ada
                'image_path' => null, 
            ],
            [
                'name' => 'HPL Taco TH-123 AA',
                'category' => 'hpl',
                'specification' => 'Solid Color, White Glossy, 0.7mm',
                'price' => 185000,
                'unit' => 'Lembar',
                'is_active' => true,
                'image_path' => null,
            ],
            [
                'name' => 'Cat Duco Nippe 2000',
                'category' => 'finishing',
                'specification' => 'Warna Super White, Kaleng 1kg',
                'price' => 85000,
                'unit' => 'Kaleng',
                'is_active' => false,
                'image_path' => null,
            ],
            [
                'name' => 'Engsel Sendok Slow Motion',
                'category' => 'plywood', // Atau hardware jika ada di enum
                'specification' => 'Full bungkuk, soft close',
                'price' => 15000,
                'unit' => 'Pcs',
                'is_active' => true,
                'image_path' => null,
            ],
        ];

        foreach ($materials as $item) {
            Material::create($item);
        }
    }
}