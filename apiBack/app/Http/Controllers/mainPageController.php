<?php

namespace App\Http\Controllers;
use App\Models\mainText;
use Illuminate\Http\Request;

class mainPageController extends Controller
{
    public function giveText(){
        $item=mainText::find(1);
        return response()->json($item['text'],200);
    }
}
