<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class camerasMaker extends Model
{
    protected $table='camerasMakers';
    public function cameras(){
        return $this->hasMany(Camera::class,'Brand','id');
    }
}
