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
        Schema::create('vehicles', function (Blueprint $table) {
            
            $table->id('vehicle_id');
            $table->string('asset_tag', 25);
            $table->string('vehicle_name');
            $table->string('brand');
            $table->string('model');
            $table->enum('vehicle_type', ['sedan', 'truck', 'motorcycle', 'bus', 'other']);
            $table->integer('capacity');
            $table->string('location');
            $table->year('year_acquired');
            $table->enum('category', ['light vehicle', 'heavy vehicle']);
            $table->string('plate_number', 25);
            // $table->integer('odometer_reading');
            $table->enum('fuel_type', ['gasoline', 'diesel']);
            $table->enum('status', ['available', 'in use', 'under maintenance', 'retired']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
