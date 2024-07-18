<?php

namespace App\Models;

use App\Models\User;
use App\Models\Stage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Etudiant extends Model
{
    use HasFactory;
    public function stg(){
        return $this->hasOne(Stage::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function types()
    {
        return $this->hasMany(Type::class);
    }
    public function docs(){
        return $this->hasMany(Document::class);
    }
    protected $fillable=[
        'apogee',
        'user_id',
        'stage_id'
    ];
}

