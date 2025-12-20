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
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category');
            $table->string('specification')->nullable();
            $table->decimal('price', 15, 2);
            $table->string('unit');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('rab_templates', function (Blueprint $table) {
            $table->id();
            $table->string('furniture_type');
            $table->json('formula');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rab_templates');
        Schema::dropIfExists('materials');
    }
};
