<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveNextServiceKmFromMaintenancePlanTable extends Migration
{
    public function up()
    {
        // Schema::table('maintenance_plans', function (Blueprint $table) {
        //     $table->dropColumn('next_service_km');
        // });
    }

    public function down()
    {
        Schema::table('maintenance_plans', function (Blueprint $table) {
            $table->integer('next_service_km')->nullable(); // Use the correct type and options as needed
        });
    }
}
