<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Camera extends Model
{
    protected $table='cameras';
    protected $fillable= [
        'name',
        'price',
        'resolution',
        'angle',
        'IK_far',
        'Brand',
        'AHD',
        'TVI',
        'CVI',
        'CVBS',
        'PAL',
        'move_check',
        'water_protect',
        'low_temp',
        'AV',
        'remote_control',
        'wireless',
        'presence'
    ];

    public function cameraMaker(){
        return $this->belongsTo(camerasMaker::class,'Brand','id');
    }
}
