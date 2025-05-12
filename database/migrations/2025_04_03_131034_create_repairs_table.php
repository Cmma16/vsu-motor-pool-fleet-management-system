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
        Schema::create('repairs', function (Blueprint $table) {
            $table->id('repair_id');
            $table->foreignId('vehicle_id')->constrained('vehicles', 'vehicle_id')->onDelete('set null');
            $table->foreignId('request_id')->nullable()->constrained('service_requests', 'request_id')->onDelete('set null');
            $table->foreignId('performed_by')->nullable()->constrained('users', 'id')->onDelete('set null');
            $table->foreignId('confirmed_by')->nullable()->constrained('users', 'id')->onDelete('set null');
            $table->string('repair_summary', 255);
            $table->foreignId('odometer_id')->nullable()->constrained('odometer_logs', 'odometer_id')->onDelete('set null');
            $table->timestamps();

            // Foreign key constraints
            // $table->foreign('vehicle_id')->references('vehicle_id')->on('vehicles')->onDelete('cascade');
            // $table->foreign('assigned_personnel')->references('id')->on('users')->onDelete('set null');
            // $table->foreign('requested_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repairs');
    }
};
