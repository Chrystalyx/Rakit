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
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone_number')->nullable()->after('email');
        });

        Schema::table('crafter_profiles', function (Blueprint $table) {
            $table->dropColumn(['phone_number', 'team_status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('crafter_profiles', function (Blueprint $table) {
            $table->string('phone_number')->nullable();
            $table->enum('team_status', ['individual', 'group'])->default('individual');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('phone_number');
        });
    }
};
