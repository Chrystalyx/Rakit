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
            if (!Schema::hasColumn('crafter_profiles', 'cover_image')) {
                $table->string('cover_image')->nullable()->after('bio');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('crafter_profiles', function (Blueprint $table) {
            $table->dropColumn('cover_image');
        });
    }
};
