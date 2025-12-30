<?php

namespace Database\Seeders;

use App\Models\PlatformReview;
use App\Models\User;
use Illuminate\Database\Seeder;

class PlatformReviewSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first() ?? User::factory()->create();

        $reviews = [
            [
                'comment' => 'Awalnya ragu bikin kitchen set custom karena takut di-markup. Tapi di Rakit, RAB-nya detail banget. Puas!',
                'rating' => 5,
            ],
            [
                'comment' => 'Platform ini sangat membantu saya mencari vendor kayu yang spesifikasinya jelas. Kualitas pengerjaan grade A.',
                'rating' => 5,
            ],
            [
                'comment' => 'Sangat transparan. Saya bisa pantau progress tukang tanpa harus datang ke lokasi setiap hari. Hemat waktu!',
                'rating' => 4,
            ],
            [
                'comment' => 'Lemari custom anak saya jadi tepat waktu. Finishing halusnya juara, tidak ada bagian tajam yang bahaya.',
                'rating' => 5,
            ],
        ];

        foreach ($reviews as $review) {
            PlatformReview::create([
                'user_id' => $user->id,
                'comment' => $review['comment'],
                'rating' => $review['rating'],
                'is_visible' => true,
            ]);
        }
    }
}
