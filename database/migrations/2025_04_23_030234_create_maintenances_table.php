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
        Schema::create('maintenance', function (Blueprint $table) {
            $table->id('maintenance_id');
            $table->foreignId('plan_id')->constrained('maintenance_plans', 'plan_id')->onDelete('set null');
            $table->foreignId('request_id')->nullable()->constrained('service_requests', 'request_id')->onDelete('set null');
            $table->foreignId('vehicle_id')->constrained('vehicles', 'vehicle_id')->onDelete('cascade');
            $table->dateTime('date_completed')->nullable();
            $table->foreignId('odometer_id')->nullable()->constrained('odometer_logs', 'odometer_id')->onDelete('set null');
            $table->foreignId('performed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('confirmed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->dateTime('date_confirmed')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenance');
    }
};
