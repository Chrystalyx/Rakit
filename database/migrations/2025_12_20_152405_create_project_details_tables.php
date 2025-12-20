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
        Schema::create('project_configurations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->onDelete('cascade');
            $table->foreignId('rab_template_id')->constrained('rab_templates');
            $table->decimal('length_cm', 8, 2);
            $table->decimal('width_cm', 8, 2);
            $table->decimal('depth_cm', 8, 2);
            $table->decimal('height_cm', 8, 2);
            $table->foreignId('material_body_id')->constrained('materials');
            $table->foreignId('material_finish_id')->constrained('materials');
            $table->json('accessories_config')->nullable();
            $table->timestamps();
        });

        Schema::create('project_progress_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->onDelete('cascade');
            $table->text('description');
            $table->string('image_path');
            $table->integer('progress_percentage');
            $table->enum('validation_status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_progress_reports');
        Schema::dropIfExists('project_configurations');
    }
};
