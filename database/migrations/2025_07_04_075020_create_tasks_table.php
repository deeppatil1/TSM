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
        Schema::create('tasks', function (Blueprint $table) {
            $table->uuid('id')->primary(); // Primary Key (UUID)
            $table->string('name');
            $table->text('description');
            $table->string('status');
            $table->foreignUuid('project_id')->constrained('projects');
            $table->foreignUuid('assigned_to')->constrained('users');
            $table->foreignUuid('created_by')->constrained('users');
            $table->foreignUuid('updated_by')->constrained('users');
            $table->date('start_date');
            $table->date('end_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
