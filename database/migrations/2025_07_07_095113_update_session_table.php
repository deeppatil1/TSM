<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('sessions', function (Blueprint $table) {
            // Change user_id to string to accommodate UUIDs
            $table->string('user_id', 36)->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('sessions', function (Blueprint $table) {
            // Revert back to unsignedBigInteger if needed
            $table->unsignedBigInteger('user_id')->nullable()->change();
        });
    }
};