<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('crafter_profiles', function (Blueprint $table) {
            $table->text('bio')->nullable();
            $table->json('skills')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('crafter_profiles', function (Blueprint $table) {
            $table->dropColumn(['bio', 'skills']);
        });
    }
};
