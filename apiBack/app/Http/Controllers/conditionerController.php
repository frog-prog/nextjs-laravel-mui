<?php

namespace App\Http\Controllers;

use App\Models\Conditioner;
use App\Models\conditionersMaker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use function GuzzleHttp\Promise\all;

class conditionerController extends Controller
{

    public function throughID($id){
        $conditioner='';
        $page=1;
        $condPage=[];
        $sborka=false;
        $connect=new Conditioner();
        $maxprice=$connect::max('price');
        $minprice=$connect::min('price');
        $minpower=$connect::min('power');
        $maxpower=$connect::max('power');
        $connectBrands=new conditionersMaker();
        $brands=$connectBrands::all()->toArray();
        $conditioners=$connect::with('conditionerMaker')->get()->sortBy('id')->values()->all();
        $name=$connect::find($id)['name'];
        $prevRand ='';
        $filesArr =Storage::files('public/pictures/conditioners/' . $name);
        for ($j = 0; $j < sizeof($filesArr); $j++) {
            $filename = str_replace('public/pictures/conditioners/' . $name . '/', '', $filesArr[$j]);
            if (str_ends_with($filename, 'avatar.jpeg')) {
                $prevRand = str_replace('avatar.jpeg', '',$filename);
            }
        }
        $edge=sizeof($conditioners);
        if ($edge % 15 !== 0) {
            $pageCount = (int)($edge / 15) + 1;
        }
        else {
            $pageCount = $edge / 15;
        }
        for ($i=0;$i<$edge;$i++) {
            if($sborka){
                if(is_file('../public/storage/pictures/conditioners/'.$conditioners[$i]["name"].'/'.$prevRand.'avatar.jpeg')){
                    $pic='http://apiback/storage/pictures/conditioners/'.$conditioners[$i]["name"].'/'.$prevRand.'avatar.jpeg';
                }
                else{
                    $pic='https://via.placeholder.com/300x200.png';
                }
                $condPage[]=['id'=>$conditioners[$i]["id"],
                            'name'=>$conditioners[$i]["name"],
                            'pic'=>$pic,'price'=>$conditioners[$i]["price"],
                            'Brand'=>$conditioners[$i]["conditionerMaker"],
                            'presence'=>$conditioners[$i]["presence"]];
            }
            if (!$sborka && $conditioners[$i]['id'] == $id) {
                $page=intdiv($i,15)+1;
                $conditioner= $conditioners[$i];
                $sborka=true;
                $i=($page-1)*15-1;
                if($page!==$pageCount){
                    $edge=$page*15;
                }
            }
        }
        $picList=Storage::files('public/pictures/conditioners/' .$conditioner['name']);
        $pics=[];
        if($picList!==null) {
            foreach ($picList as $key => $value) {
                if ($value !== 'public/pictures/conditioners/' . $conditioner['name'] . '/'.$prevRand.'avatar.jpeg') {
                    $pics[] = 'http://apiback/' . str_replace('public', 'storage', $value);
                }
            }
        }
        if(sizeof($pics)===0){
            $pics[]='https://via.placeholder.com/1000x600.jpeg';
        }
        if(is_file('../public/storage/pictures/conditioners/'.$conditioner["name"].'/'.$prevRand.'avatar.jpeg')){
            $pic='http://apiback/storage/pictures/conditioners/'.$conditioner["name"].'/'.$prevRand.'avatar.jpeg';
        }
        else{
            $pic='https://via.placeholder.com/300x200.png';
        }
        $littleCard=['id'=>$conditioner["id"],
            'name'=>$conditioner["name"],
            'pic'=>$pic,
            'price'=>$conditioner["price"],
            'Brand'=>$conditioner["conditionerMaker"],
            'presence'=>$conditioner["presence"]];
        $conditioner['pics']=$pics;
        $conditioner['littleCard']=$littleCard;
        $conditioner['section']='conditioners';
        $conditioner['pics']=$pics;
        return response()->json([$conditioner,
            $condPage,
            $pageCount,
            $page,
            ['digits'=>
                ['maxprice'=>$maxprice,
                'minprice'=>$minprice,
                'maxpower'=>$maxpower,
                'minpower'=>$minpower],
            'Brands'=>$brands]
        ]);
    }

    public function SimpleThroughID($id){
        $conditioner=Conditioner::with('conditionerMaker')->find($id);
        $prevRand ='';
        $filesArr =Storage::files('public/pictures/conditioners/' . $conditioner['name']);
        for ($j = 0; $j < sizeof($filesArr); $j++) {
            $filename = str_replace('public/pictures/conditioners/' . $conditioner['name'] . '/', '', $filesArr[$j]);
            if (str_ends_with($filename, 'avatar.jpeg')) {
                $prevRand = str_replace('avatar.jpeg', '',$filename);
            }
        }
        $picList=Storage::files('public/pictures/conditioners/' .$conditioner['name']);
        $pics=[];
        foreach($picList as $key=>$value){
            if ($value!=='public/pictures/conditioners/' .$conditioner['name'].'/'.$prevRand.'avatar.jpeg'){
                $pics[]='http://apiback/'.str_replace('public','storage',$value);
            }
        }
        if(sizeof($pics)===0){
            $pics[]='https://via.placeholder.com/1000x600.jpeg';
        }
        if(is_file('../public/storage/pictures/conditioners/'.$conditioner["name"].'/'.$prevRand.'avatar.jpeg')){
            $pic='http://apiback/storage/pictures/conditioners/'.$conditioner["name"].'/'.$prevRand.'avatar.jpeg';
        }
        else{
            $pic='https://via.placeholder.com/300x200.png';
        }
        $littleCard=['id'=>$conditioner["id"],
            'name'=>$conditioner["name"],
            'pic'=>$pic,
            'price'=>$conditioner["price"],
            'Brand'=>$conditioner["conditionerMaker"],
            'presence'=>$conditioner["presence"]];
        $conditioner['pics']=$pics;
        $conditioner['littleCard']=$littleCard;
        $conditioner['section']='conditioners';
        return response()->json($conditioner);
    }


    public function pagination($page){
        $connect=new Conditioner();
        $maxprice=$connect::max('price');
        $minprice=$connect::min('price');
        $minpower=$connect::min('power');
        $maxpower=$connect::max('power');
        $connectBrands=new conditionersMaker();
        $brands=$connectBrands::all()->toArray();
        $condArray=$connect::with('conditionerMaker')->skip(($page-1)*15)->take(15)->get()->sortBy('id')->values()->all();
        $condPage=[];
        foreach ($condArray as $i){
            $prevRand ='';
            $filesArr =Storage::files('public/pictures/conditioners/' . $i["name"]);
            for ($j = 0; $j < sizeof($filesArr); $j++) {
                $filename = str_replace('public/pictures/conditioners/' . $i["name"] . '/', '', $filesArr[$j]);
                if (str_ends_with($filename, 'avatar.jpeg')) {
                    $prevRand = str_replace('avatar.jpeg', '',$filename);
                }
            }
            if(is_file('../public/storage/pictures/conditioners/'.$i["name"].'/'.$prevRand.'avatar.jpeg')){
                $pic='http://apiback/storage/pictures/conditioners/'.$i["name"].'/'.$prevRand.'avatar.jpeg';
            }
            else{
                $pic='https://via.placeholder.com/300x200.png';
            }
            $condPage[]=['id'=>$i["id"],'name'=>$i["name"],'pic'=>$pic,'price'=>$i["price"],'Brand'=>$i["conditionerMaker"],'presence'=>$i["presence"]];
        };
        return response()->json([$condPage,
            ['digits'=>
                ['maxprice'=>$maxprice,
                'minprice'=>$minprice,
                'maxpower'=>$maxpower,
                'minpower'=>$minpower],
                'Brands'=>$brands]]);
    }

    public function filteredPagination(Request $request){
        $requestData=$request->all();
        $page=$requestData[1];
        $maxpower=$requestData[0]['digits']['maxpower'];
        $minpower=$requestData[0]['digits']['minpower'];
        $maxprice=$requestData[0]['digits']['maxprice'];
        $minprice=$requestData[0]['digits']['minprice'];
        $connect=new Conditioner();
        $connectCount=new Conditioner();
        $condCount=$connectCount::all();
        $condArr=$connect::with('conditionerMaker');
        $Brands=collect($requestData[0]['Brands'])->map(function($item){
            return (string)$item;
        });
        foreach($requestData[0] as $key=>$meaning){
            if($meaning===true){
                $bufer = $condArr->where($key,'=',true);
                $condArr=$bufer;
                if($page===1) {
                    $bufer1 = $condCount->where($key, '=', true);
                    $condCount = $bufer1;
                }
            }
        };
        if(sizeof($Brands)===0){
            $bufer = $condArr->whereBetween('price',[$minprice,$maxprice])
                             ->whereBetween('power',[$minpower,$maxpower])
                             ->skip(($page-1)*15)
                             ->take(15)->get()->sortBy('id')->values()->all();
            if($page===1) {
                $bufer1 = $condArr->whereBetween('price', [$minprice, $maxprice])
                    ->whereBetween('power', [$minpower, $maxpower])->count();
            }
        }
        else{
            $bufer = $condArr->whereBetween('price',[$minprice,$maxprice])
                ->whereBetween('power',[$minpower,$maxpower])
                ->whereIn('Brand',$Brands)
                ->skip(($page-1)*15)
                ->take(15)->get()->sortBy('id')->values()->all();
            if($page===1) {
                $bufer1 = $condArr->whereBetween('price', [$minprice, $maxprice])
                    ->whereBetween('power', [$minpower, $maxpower])->count();
            }
        }
        $condPage=[];
        if($page===1) {
            if ($bufer1 % 15 !== 0) {
                $bufer1 = (int)($bufer1 / 15) + 1;
            } else {
                $bufer1 = $bufer1 / 15;
            }
        }
        foreach ($bufer as $i){
            $prevRand ='';
            $filesArr =Storage::files('public/pictures/conditioners/' . $i["name"]);
            for ($j = 0; $j < sizeof($filesArr); $j++) {
                $filename = str_replace('public/pictures/conditioners/' . $i["name"] . '/', '', $filesArr[$j]);
                if (str_ends_with($filename, 'avatar.jpeg')) {
                    $prevRand = str_replace('avatar.jpeg', '',$filename);
                }
            }
            if(is_file('../public/storage/pictures/conditioners/'.$i["name"].'/'.$prevRand.'avatar.jpeg')){
                $pic='http://apiback/storage/pictures/conditioners/'.$i["name"].'/'.$prevRand.'avatar.jpeg';
            }
            else{
                $pic='https://via.placeholder.com/300x200.png';
            }
            $condPage[]=['id'=>$i["id"],'name'=>$i["name"],'pic'=>$pic,'price'=>$i["price"],'Brand'=>$i["conditionerMaker"],'presence'=>$i["presence"]];
        };
        if($page===1) {
        return response()->json([$bufer1,$condPage]);
        }
        else{
            return response()->json($condPage);
        }
    }
}
