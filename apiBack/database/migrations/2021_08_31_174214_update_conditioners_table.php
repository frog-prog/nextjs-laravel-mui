<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateConditionersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('conditioners', function (Blueprint $table) {
//            $table->id();
//            $table->string('name',100)->unique();
//            $table->integer('power');
//            $table->integer('price');
            $table->foreignId('Brand')->constrained('conditionersMakers','id');
//            $table->boolean('presence');
//            $table->boolean('inverter');
//            $table->boolean('freezing');
//            $table->boolean('heating');
//            $table->boolean('winding');
//            $table->boolean('drying');
//            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('conditioners');
    }
}
