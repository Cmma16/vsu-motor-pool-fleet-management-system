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
        Schema::create('service_inspections', function (Blueprint $table) {
            $table->id('inspection_id');
            $table->foreignId('request_id')->constrained('service_requests', 'request_id')->onDelete('cascade');
            $table->dateTime('started_at');
            $table->dateTime('completed_at')->nullable();
            $table->boolean('parts_available')->default(true);
            $table->boolean('personnel_available')->default(true);
            $table->string('estimated_duration');
            $table->foreignId('conducted_by')->nullable()->constrained('users', 'id')->onDelete('set null');
            $table->foreignId('confirmed_by')->nullable()->constrained('users', 'id')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_inspections');
    }
};
