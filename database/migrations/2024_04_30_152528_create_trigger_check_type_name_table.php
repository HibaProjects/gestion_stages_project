<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('
        CREATE TRIGGER check_type_name_before_insert BEFORE INSERT ON types
        FOR EACH ROW
        BEGIN
            IF NEW.nom NOT IN ("rapport", "convention", "presentation", "fiche_appreciation", "attestation") THEN
                SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "La valeur pour la colonne \'nom\' n\'est pas valide";
            END IF;
        END;
    ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS check_type_name_before_insert');
    }
};
