<?php

namespace App\Models;

use App\Models\Document;
use App\Models\Etudiant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Stage extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom_entreprise',
        'adresse_entreprise',
        'ville_entreprise',
        'nom_employe',
        'intitule',
        'description',
        'technologies',
        'note',
        'etat',
        'binome'

    ];
    public function etds(){
        return $this->hasMany(Etudiant::class);

    }
    public function docs(){
        return $this->hasMany(Document::class);

    }
}
