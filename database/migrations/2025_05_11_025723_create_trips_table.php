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
        Schema::create('trips', function (Blueprint $table) {
           $table->id('trip_id');
           $table->integer('trip_number')->nullable();
           $table->date('date_filed');
           $table->date('start_date');
           $table->date('end_date');
           $table->string('destination');
           $table->string('purpose');
           $table->time('departure_time');
           $table->string('requesting_party');
           $table->foreignId('vehicle_id')->nullable()->constrained('vehicles', 'vehicle_id')->onDelete('set null');
           $table->foreignId('driver_id')->nullable()->constrained('users', 'id')->onDelete('set null');
           $table->foreignId('dispatcher_id')->nullable()->constrained('users', 'id')->onDelete('set null');
           $table->enum('status', ['pending', 'rejected', 'assigned', 'ongoing', 'completed', 'cancelled']);
           $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};
