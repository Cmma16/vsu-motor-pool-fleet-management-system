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
        Schema::create('trip_logs', function (Blueprint $table) {
            $table->id('trip_log_id');
            $table->foreignId('trip_id')->constrained('trips', 'trip_id')->onDelete('cascade');
            $table->date('received_at')->nullable();
            $table->string('pre_trip_condition')->nullable();
            $table->date('fuel_lubricant_issued_at')->nullable();
            $table->time('departure_time_actual')->nullable();
            $table->foreignId('odometer_out')->nullable()->constrained('odometer_logs', 'odometer_id')->onDelete('set null');
            $table->date('date_returned')->nullable();
            $table->string('post_trip_condition')->nullable();
            $table->date('fuel_lubricant_balanced_at')->nullable();
            $table->time('arrival_time')->nullable();
            $table->foreignId('odometer_in')->nullable()->constrained('odometer_logs', 'odometer_id')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trip_logs');
    }
};
