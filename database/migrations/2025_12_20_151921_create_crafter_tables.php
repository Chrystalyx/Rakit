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
        Schema::create('crafter_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('level', ['pemula', 'menengah', 'ahli'])->default('pemula');
            $table->enum('team_status', ['individual', 'group'])->default('individual');
            $table->string('ktp_number')->nullable();
            $table->string('phone_number');
            $table->text('address')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->decimal('rating_skill', 3, 2)->default(0);
            $table->json('badges')->nullable();
            $table->timestamps();
        });


        Schema::create('portfolios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('crafter_profile_id')->constrained('crafter_profiles')->onDelete('cascade');
            $table->string('title');
            $table->decimal('project_value', 15, 2)->nullable();
            $table->string('image_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolios');
        Schema::dropIfExists('crafter_profiles');
    }
};
