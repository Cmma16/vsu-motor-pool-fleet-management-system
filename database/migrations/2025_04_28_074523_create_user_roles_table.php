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
        Schema::create('user_roles', function (Blueprint $table) {
            $table->id('role_id');
            $table->string('name')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_accomplishments');
        Schema::dropIfExists('maintenance');
        Schema::dropIfExists('odometer_logs');
        Schema::dropIfExists('service_requests');
        Schema::dropIfExists('maintenance_plans');
        Schema::dropIfExists('users');
        Schema::dropIfExists('user_roles');
    }
};
