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
        Schema::create('service_accomplishments', function (Blueprint $table) {
            $table->id('accomplishment_id');
            $table->foreignId('request_id')->constrained('service_requests', 'request_id')->onDelete('cascade');
            $table->timestamp('started_at');
            $table->timestamp('completed_at')->nullable();
            $table->foreignId('conducted_by')->nullable()->constrained('users', 'id')->onDelete('set null');
            $table->foreignId('verified_by')->nullable()->constrained('users', 'id')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_accomplishments');
    }
};
