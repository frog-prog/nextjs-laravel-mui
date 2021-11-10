<?php

namespace App\Http\Controllers;
use App\Models\Camera;
use App\Models\camerasMaker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class cameraController extends Controller
{
    public function throughID($id){
        $camera='';
        $page=1;
        $camPage=[];
        $sborka=false;
        $connect=new Camera();
        $maxprice=$connect::max('price');
        $minprice=$connect::min('price');
        $minangle=$connect::min('angle');
        $maxangle=$connect::max('angle');
        $minres=$connect::min('resolution');
        $maxres=$connect::max('resolution');
        $minfar=$connect::min('IK_far');
        $maxfar=$connect::max('IK_far');
        $connectBrands=new camerasMaker();
        $brands=$connectBrands::all()->toArray();
        $cameras=$connect::with('cameraMaker')->get()->sortBy('id')->values()->all();
        $name=$connect::find($id)['name'];
        $prevRand ='';
        $filesArr =Storage::files('public/pictures/cameras/' . $name);
        for ($j = 0; $j < sizeof($filesArr); $j++) {
            $filename = str_replace('public/pictures/cameras/' . $name . '/', '', $filesArr[$j]);
            if (str_ends_with($filename, 'avatar.jpeg')) {
                $prevRand = str_replace('avatar.jpeg', '',$filename);
            }
        }
        $edge=sizeof($cameras);
        if ($edge % 15 !== 0) {
            $pageCount = (int)($edge / 15) + 1;
        }
        else {
            $pageCount = $edge / 15;
        }
        for ($i=0;$i<$edge;$i++) {
            if($sborka){
                if(is_file('../public/pictures/cameras/'.$cameras[$i]["name"].'/'.$prevRand.'avatar.jpeg')){
                    $pic='http://apiback/pictures/cameras/'.$cameras[$i]["name"].'/'.$prevRand.'avatar.jpeg';
                }
                else{
                    $pic='https://via.placeholder.com/300x200.png';
                }
                $camPage[]=['id'=>$cameras[$i]["id"],
                    'name'=>$cameras[$i]["name"],
                    'pic'=>$pic,'price'=>$cameras[$i]["price"],
                    'Brand'=>$cameras[$i]["cameraMaker"],
                    'presence'=>$cameras[$i]["presence"]];
            }
            if (!$sborka && $cameras[$i]['id'] == $id) {
                $page=intdiv($i,15)+1;
                $camera= $cameras[$i];
                $sborka=true;
                $i=($page-1)*15-1;
                if($page!==$pageCount) {
                    $edge = $page * 15;
                }
            }
        }
        $picList=Storage::files('public/pictures/cameras/' .$camera['name']);
        $pics=[];
        foreach($picList as $key=>$value){
            if ($value!=='public/pictures/cameras/' .$camera['name'].'/'.$prevRand.'avatar.jpeg'){
                $pics[]='http://apiback/'.str_replace('public','storage',$value);
            }
        }
        if(sizeof($pics)===0){
            $pics[]='https://via.placeholder.com/1000x600.jpeg';
        }
        if(is_file('../public/storage/pictures/cameras/'.$camera["name"].'/'.$prevRand.'avatar.jpeg')){
            $pic='http://apiback/storage/pictures/cameras/'.$camera["name"].'/'.$prevRand.'avatar.jpeg';
        }
        else{
            $pic='https://via.placeholder.com/300x200.png';
        }
        $littleCard=['id'=>$camera["id"],
            'name'=>$camera["name"],
            'pic'=>$pic,
            'price'=>$camera["price"],
            'Brand'=>$camera["cameraMaker"],
            'presence'=>$camera["presence"]];
        $camera['littleCard']=$littleCard;
        $camera['section']='cameras';
        $camera['pics']=$pics;
        return response()->json([
            $camera,
            $camPage,
            $pageCount,
            $page,
            ['digits'=>['maxprice'=>$maxprice,
            'minprice'=>$minprice,
            'maxangle'=>$maxangle,
            'minangle'=>$minangle,
            'maxres'=>$maxres,
            'minres'=>$minres,
            'maxfar'=>$maxfar,
            'minfar'=>$minfar],
            'Brands'=>$brands]
        ]);
    }

    public function SimpleThroughID($id){
        $camera=Camera::with('cameraMaker')->find($id);
        $prevRand ='';
        $filesArr =Storage::files('public/pictures/cameras/' . $camera['name']);
        for ($j = 0; $j < sizeof($filesArr); $j++) {
            $filename = str_replace('public/pictures/cameras/' . $camera['name'] . '/', '', $filesArr[$j]);
            if (str_ends_with($filename, 'avatar.jpeg')) {
                $prevRand = str_replace('avatar.jpeg', '',$filename);
            }
        }
        $picList=Storage::files('public/pictures/cameras/' .$camera['name']);
        $pics=[];
        if($picList!==null) {
            foreach ($picList as $key => $value) {
                if ($value !== 'public/pictures/cameras/' . $camera['name'] . '/'.$prevRand.'avatar.jpeg') {
                    $pics[] = 'http://apiback/' . str_replace('public', 'storage', $value);
                }
            }
        }
        if(sizeof($pics)===0){
            $pics[]='https://via.placeholder.com/1000x600.jpeg';
        }
        if(is_file('../public/storage/pictures/cameras/'.$camera["name"].'/'.$prevRand.'avatar.jpeg')){
            $pic='http://apiback/storage/pictures/cameras/'.$camera["name"].'/'.$prevRand.'avatar.jpeg';
        }
        else{
            $pic='https://via.placeholder.com/300x200.png';
        }
        $littleCard=['id'=>$camera["id"],
            'name'=>$camera["name"],
            'pic'=>$pic,
            'price'=>$camera["price"],
            'Brand'=>$camera["cameraMaker"],
            'presence'=>$camera["presence"]];
        $camera['littleCard']=$littleCard;
        $camera['section']='cameras';
        $camera['pics']=$pics;
        return response()->json($camera);
    }

    public function pagination($page){
        $connect=new Camera();
        $maxprice=$connect::max('price');
        $minprice=$connect::min('price');
        $minangle=$connect::min('angle');
        $maxangle=$connect::max('angle');
        $minres=$connect::min('resolution');
        $maxres=$connect::max('resolution');
        $minfar=$connect::min('IK_far');
        $maxfar=$connect::max('IK_far');
        $connectBrands=new camerasMaker();
        $brands=$connectBrands::all()->toArray();
        $camArray=$connect::with('cameraMaker')->skip(($page-1)*15)->take(15)->get()->sortBy('id')->values()->all();
        $camPage=[];
        foreach ($camArray as $i){
            $prevRand ='';
            $filesArr =Storage::files('public/pictures/cameras/' . $i["name"]);
            for ($j = 0; $j < sizeof($filesArr); $j++) {
                $filename = str_replace('public/pictures/cameras/' . $i["name"] . '/', '', $filesArr[$j]);
                if (str_ends_with($filename, 'avatar.jpeg')) {
                    $prevRand = str_replace('avatar.jpeg', '',$filename);
                }
            }
            if(is_file('../public/storage/pictures/cameras/'.$i["name"].'/'.$prevRand.'avatar.jpeg')){
                $pic='http://apiback/storage/pictures/cameras/'.$i["name"].'/'.$prevRand.'avatar.jpeg';
            }
            else{
                $pic='https://via.placeholder.com/300x200.png';
            }
            $camPage[]=['id'=>$i["id"],'name'=>$i["name"],'pic'=>$pic,'price'=>$i["price"],'Brand'=>$i["cameraMaker"],'presence'=>$i["presence"]];
        };
        return response()->json([$camPage,
            ['digits'=>
                ['maxprice'=>$maxprice,
                'minprice'=>$minprice,
                'maxangle'=>$maxangle,
                'minangle'=>$minangle,
                'maxres'=>$maxres,
                'minres'=>$minres,
                'maxfar'=>$maxfar,
                'minfar'=>$minfar],
                'Brands'=>$brands]
        ]);
    }
    public function filteredPagination(Request $request){
        $requestData=$request->all();
        $page=$requestData[1];
        $maxangle=$requestData[0]['digits']['maxangle'];
        $minangle=$requestData[0]['digits']['minangle'];
        $maxres=$requestData[0]['digits']['maxres'];
        $minres=$requestData[0]['digits']['minres'];
        $maxfar=$requestData[0]['digits']['maxfar'];
        $minfar=$requestData[0]['digits']['minfar'];
        $maxprice=$requestData[0]['digits']['maxprice'];
        $minprice=$requestData[0]['digits']['minprice'];
        $connect=new Camera();
        $connectCount=new Camera();
        $camCount=$connectCount::all();
        $camArr=$connect::with('cameraMaker');
        $Brands=collect($requestData[0]['Brands'])->map(function($item){
            return (string)$item;
        });
        foreach($requestData[0] as $key=>$meaning){
            if($meaning===true){
                $bufer = $camArr->where($key,'=',true);
                $camArr=$bufer;
                if($page===1) {
                    $bufer1 = $camCount->where($key, '=', true);
                    $camCount = $bufer1;
                }
            }
        };
        if(sizeof($Brands)===0){
            $bufer = $camArr
                ->whereBetween('price',[$minprice,$maxprice])
                ->whereBetween('angle',[$minangle,$maxangle])
                ->whereBetween('resolution',[$minres,$maxres])
                ->whereBetween('IK_far',[$minfar,$maxfar])
                ->skip(($page-1)*15)
                ->take(15)->get()->sortBy('id')->values()->all();
            if($page===1) {
                $bufer1 = $camArr
                    ->whereBetween('price',[$minprice,$maxprice])
                    ->whereBetween('angle',[$minangle,$maxangle])
                    ->whereBetween('resolution',[$minres,$maxres])
                    ->whereBetween('IK_far',[$minfar,$maxfar])
                    ->count();
            }
        }
        else{
            $bufer = $camArr
                ->whereBetween('price',[$minprice,$maxprice])
                ->whereBetween('angle',[$minangle,$maxangle])
                ->whereBetween('resolution',[$minres,$maxres])
                ->whereBetween('IK_far',[$minfar,$maxfar])
                ->whereIn('Brand',$Brands)
                ->skip(($page-1)*15)
                ->take(15)->get()->sortBy('id')->values()->all();
            if($page===1) {
                $bufer1 = $camArr
                    ->whereBetween('price',[$minprice,$maxprice])
                    ->whereBetween('angle',[$minangle,$maxangle])
                    ->whereBetween('resolution',[$minres,$maxres])
                    ->whereBetween('IK_far',[$minfar,$maxfar])
                    ->count();
            }
        }
        $camPage=[];
        if($page===1) {
            if ($bufer1 % 15 !== 0) {
                $bufer1 = (int)($bufer1 / 15) + 1;
            } else {
                $bufer1 = $bufer1 / 15;
            }
        }
        foreach ($bufer as $i){
            $prevRand ='';
            $filesArr =Storage::files('public/pictures/cameras/' . $i["name"]);
            for ($j = 0; $j < sizeof($filesArr); $j++) {
                $filename = str_replace('public/pictures/cameras/' . $i["name"] . '/', '', $filesArr[$j]);
                if (str_ends_with($filename, 'avatar.jpeg')) {
                    $prevRand = str_replace('avatar.jpeg', '',$filename);
                }
            }
            if(is_file('../public/storage/pictures/cameras/'.$i["name"].'/'.$prevRand.'avatar.jpeg')){
                $pic='http://apiback/storage/pictures/cameras/'.$i["name"].'/'.$prevRand.'avatar.jpeg';
            }
            else{
                $pic='https://via.placeholder.com/300x200.png';
            }
            $camPage[]=['id'=>$i["id"],'name'=>$i["name"],'pic'=>$pic,'price'=>$i["price"],'Brand'=>$i["cameraMaker"],'presence'=>$i["presence"]];
        };
        if($page===1) {
            return response()->json([$bufer1,$camPage]);
        }
        else{
            return response()->json($camPage);
        }
    }
}
