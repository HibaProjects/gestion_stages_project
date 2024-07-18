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
        Schema::create('stages', function (Blueprint $table) {
            $table->id(); 
            $table->timestamps();
            $table->string('nom_entreprise');
            $table->string('ville_entreprise');
            $table->string('nom_employe');
            $table->string('intitule');
            $table->text('description',500);
            $table->string('technologies');
            $table->float('note')->nullable();
            $table->string('etat')->default("non valide");
            


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stages');
    }
};
