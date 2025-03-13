<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('habitaciones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('hotel_id');
            $table->string('tipo');
            $table->string('acomodacion');
            $table->integer('cantidad');
            $table->timestamps();

            // Clave foránea: Relación con la tabla 'hotels'
            $table->foreign('hotel_id')->references('id')->on('hotels')->onDelete('cascade');
        });
    }

    public function down() {
        Schema::dropIfExists('habitaciones');
    }
};


