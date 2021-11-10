<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateCamerasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cameras', function (Blueprint $table) {
//            $table->id();
//            $table->string('name')->unique();
//            $table->integer('price');
//            $table->integer('resolution');
//            $table->integer('angle');
//            $table->integer('IK-far');
            $table->foreignId('Brand')->constrained('camerasMakers','id');
//            $table->boolean('AHD');
//            $table->boolean('TVI');
//            $table->boolean('CVI');
//            $table->boolean('CVBS');
//            $table->boolean('PAL');
//            $table->boolean('move-check');
//            $table->boolean('water-protect');
//            $table->boolean('low-temp');
//            $table->boolean('AV');
//            $table->boolean('remote-control');
//            $table->boolean('wireless');
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
        Schema::dropIfExists('cameras');
    }
}
