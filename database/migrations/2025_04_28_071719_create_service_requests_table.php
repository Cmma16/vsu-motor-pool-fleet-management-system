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
        Schema::create('service_requests', function (Blueprint $table) {
            $table->id('request_id');
            $table->foreignId('vehicle_id')->constrained('vehicles', 'vehicle_id')->onDelete('cascade');
            $table->foreignId('plan_id')->nullable()->constrained('maintenance_plans', 'plan_id')->onDelete('cascade');
            $table->foreignId('requested_by')->nullable()->constrained('users', 'id')->onDelete('set null');
            $table->date('date_filed');
            $table->enum ('service_type', ['maintenance', 'repair']);
            $table->string('work_description');
            $table->dateTime('date_received')->nullable(); 
            $table->foreignId('received_by')->nullable()->constrained('users', 'id')->onDelete('set null');
            $table->enum('status', ['pending', 'received', 'inspected', 'approved', 'cancelled', 'conducted', 'completed']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_requests');
    }
};
