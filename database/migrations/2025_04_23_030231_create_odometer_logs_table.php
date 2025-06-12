<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 2025_05_05_033230_create_odometer_logs_table
     */
    public function up(): void
    {
        Schema::create('odometer_logs', function (Blueprint $table) {
            $table->id('odometer_id');
            $table->foreignId('vehicle_id')->constrained('vehicles', 'vehicle_id')->onDelete('cascade');
            $table->integer('reading');
            $table->datetime('logged_at');
            $table->foreignId('recorded_by')->nullable()->constrained('users', 'id')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('odometer_logs');
    }
};
