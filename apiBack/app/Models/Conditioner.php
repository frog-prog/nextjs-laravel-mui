<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conditioner extends Model
{
    protected $table='conditioners';
    protected $fillable= [
        'name',
        'price',
        'power',
        'inverter',
        'freezing',
        'Brand',
        'heating',
        'winding',
        'drying',
        'presence'
    ];
    public function conditionerMaker(){
        return $this->belongsTo(conditionersMaker::class,'Brand','id');
    }
}
