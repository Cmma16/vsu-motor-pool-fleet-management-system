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
            $table->foreignId('request_id')->nullable()->constrained('service_requests', 'request_id')->onDelete('set null');
            $table->date('date_in')->nullable();
            $table->date('date_completed')->nullable();
            $table->foreignId('odometer_id')->nullable()->constrained('odometer_logs', 'odometer_id')->onDelete('set null');
            $table->foreignId('performed_by')->nullable()->constrained('users', 'id')->onDelete('set null');
            $table->foreignId('confirmed_by')->nullable()->constrained('users', 'id')->onDelete('set null');
            $table->dateTime('date_confirmed')->nullable();
            $table->text('maintenance_summary')->nullable();
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
