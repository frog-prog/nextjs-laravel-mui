<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class conditionersMaker extends Model
{
    protected $table='conditionersMakers';
    public function conditioners(){
        return $this->hasMany(Conditioner::class,'Brand','id');
    }
}
