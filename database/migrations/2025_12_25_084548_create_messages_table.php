<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('messages', function (Blueprint $table) {
        $table->id();
        
        // Siapa yang mengirim
        $table->foreignId('sender_id')->constrained('users')->onDelete('cascade');
        
        // Siapa yang menerima
        $table->foreignId('receiver_id')->constrained('users')->onDelete('cascade');
        
        // (Opsional) Pesan ini terkait proyek apa? Biar tidak bingung
        // Kita buat nullable dulu jaga-jaga kalau chat umum
        $table->foreignId('project_id')->nullable()->constrained('projects')->onDelete('cascade'); 
        
        // Isi pesan
        $table->text('message');
        
        // Tipe pesan: 'text' atau 'image'
        $table->string('type')->default('text');
        
        // Status dibaca
        $table->timestamp('read_at')->nullable();
        
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
