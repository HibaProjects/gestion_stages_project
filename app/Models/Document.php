<?php

namespace App\Models;

use App\Models\Type;
use App\Models\Etudiant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Document extends Model
{
    use HasFactory;
    public function stg(){
        return $this->hasOne(Stage::class);
    }
    public function etd(){
        return $this->belongsTo(Etudiant::class);
    }
    public function types()
    {
        return $this->hasMany(Type::class);
    }
    protected $fillable=[
        'path',
        'type_id',
        'user_id',
        
    ];
}
