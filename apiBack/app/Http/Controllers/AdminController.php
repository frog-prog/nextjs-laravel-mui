<?php

namespace App\Http\Controllers;

use App\Http\Common\CommonFunctions;
use App\Models\mainText;
use App\Models\User;
use App\Models\Camera;
use App\Models\Conditioner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class AdminController extends Controller
{
    public function getUsers(Request $request){
        if($request->role===2) {
            $userModel = new User;
            $users = $userModel::all()->toArray();
            $resArr = [];
            foreach ($users as $key => $value) {
                $resArr[] = ['login' => $value['login'], 'id' => $value['id'], 'role' => $value['role']];
            }
            return response()->json($resArr);
        }
        else{
                return response()->json(['error' =>"Ваш ранг недостаточен"], 200);
        }
    }
    public function changeRang(Request $request){
        $utils = new CommonFunctions;
        if($request->role===2){
            $newRang = $request->rang;
            $user = User::find($request->id);
            $prevRang = $user->role;
            $user->update(['role' => $newRang, 'api_token' => null]);
            if ($prevRang < $newRang) {
                $utils->sendNot("Пользователь " . $user->login . " повышен");
                return response()->json("Пользователь " . $user->login . " повышен", 200);
            }
            if ($prevRang > $newRang) {
                $utils->sendNot("Пользователь " . $user->login . " понижен");
                return response()->json("Пользователь " . $user->login . " понижен", 200);
            }
        }
        else{
            $utils->sendNot("Попытка понижения");
            return response()->json(['error' =>"Ваш ранг недостаточен"], 200);
        }
    }
    public function deleteCard(Request $request){
        $utils = new CommonFunctions;
        if($request->role===2){
            if($request->section==='cameras'){
                foreach ($request->ids as $key=>$value){
                    $item=Camera::find((int)$value);
                    Storage::deleteDirectory('public/pictures/cams/'.$item->name);
                    $item->delete();
                }
                $utils->sendNot("Удалена запись с id: ".implode(',',$request->ids)." из таблицы 'Cameras'");
                $count=Camera::all()->count();
                if($count%15!==0){
                    return response()->json([(int)($count/15)+1],200);
                }
                else{
                    return response()->json([$count/15],200);
                }
            }
            if($request->section==='conditioners'){
                foreach ($request->ids as $key=>$value) {
                    $item = Conditioner::find((int)$value);
                    Storage::deleteDirectory('public/pictures/conds/' . $item->name);
                    $item->delete();
                }
                $utils->sendNot("Удалена запись с id: ".implode(',',$request->ids)." из таблицы 'Conditioners'");
                $count=Conditioner::all()->count();
                if($count%15!==0){
                    return response()->json([(int)($count/15)+1],200);
                }
                else{
                    return response()->json([$count/15],200);
                }
            }
        }
        else{
            $utils->sendNot("Попытка удаления записи");
            return response()->json(["Ваш ранг недостаточен"], 200);
        }
    }
    public function editCard(Request $request){
        $utils = new CommonFunctions;
        if($request->role===2) {
            $section=$request->section;
                $newName = json_decode($request->data, true)['newData']['cardData']['name'];
                $prevName = json_decode($request->data, true)['prevData']['name'];
                if($newName!==$prevName) {
                    if ($section === 'cameras') {
                        if (sizeof(Camera::all()->where('name', $newName)->all()) > 0) {
                            return response()->json(["Такое имя уже присутствует"], 200);
                        }
                    }
                    if ($section === 'conditioners') {
                        if (sizeof(Conditioner::all()->where('name', $newName)->all()) > 0) {
                            return response()->json(["Такое имя уже присутствует"], 200);
                        }
                    }
                }
                $randomString=$utils->generateRandomString(8);
                $filesArr =Storage::files('public/pictures/'.$section.'/' . $prevName);
                if(sizeof($filesArr)>0){
                    $prevRand ='';
                    for ($j = 0; $j < sizeof($filesArr); $j++) {
                        $filename = str_replace('public/pictures/'.$section.'/' . $prevName . '/', '', $filesArr[$j]);
                        if (str_ends_with($filename, 'avatar.jpeg')) {
                            $prevRand = str_replace('avatar.jpeg', '',$filename);
                        }
                    }
                }
                $deletedFiles = json_decode($request->data, true)['prevData']['deletedPics'];
                if (sizeof($deletedFiles) > 0) {
                    for ($j = 0; $j < sizeof($deletedFiles); $j++) {
                        $filename = str_replace('http://apiback/storage/pictures/'.$section.'/' . $prevName . '/', '', $deletedFiles[$j]);
                        Storage::delete('public/pictures/'.$section.'/' . $prevName . '/' .$filename);
                    }
                    $filesArr =Storage::files('public/pictures/'.$section.'/' . $newName);
                    for ($j = 0; $j < sizeof($filesArr); $j++) {
                        $filename = str_replace('public/pictures/'.$section.'/' . $prevName . '/', '', $filesArr[$j]);
                        if(!str_ends_with($filename,'avatar.jpeg')) {
                            Storage::move('public/pictures/' . $section . '/' . $prevName . '/' . $filename, 'public/pictures/' . $section . '/' . $prevName . '/'.$randomString. $j . '.jpeg');
                        }
                    }
                }

                if ($prevName !== $newName) {
                    Storage::move('public/pictures/'.$section.'/' . $prevName, 'public/pictures/'.$section.'/' . $newName);
                }
                $j = sizeof(Storage::files('public/pictures/'.$section.'/' . $newName));
                if ($j !== 0) {
                    $j--;
                }
                $i = 0;
                if ($request->hasFile('file' . $i)) {
                    while ($request->hasFile('file' . $i)) {
                        $file = $request->file('file' . $i);
                        $file->storeAs('public/pictures/'.$section.'/' . json_decode($request->data, true)['newData']['cardData']['name'], $randomString.$j . '.jpeg');
                        $i++;
                        $j++;
                    }
                    if (sizeof(Storage::files('public/pictures/'.$section.'/' . $newName))>=1) {
                        Storage::delete('public/pictures/' . $section . '/' . $newName . '/' . $prevRand . 'avatar.jpeg');
                    }
                    $avatar = Image::make(file_get_contents(public_path('storage/pictures/'.$section.'/') . json_decode($request->data, true)['newData']['cardData']['name'] . '/'.$randomString.'0.jpeg'));
                    $avatar->fit(240, 150);
                    $avatar->save(public_path('storage/pictures/'.$section.'/') . json_decode($request->data, true)['newData']['cardData']['name'] . '/'.$randomString.'avatar.jpeg');
                }

                if (sizeof(Storage::files('public/pictures/'.$section.'/' . $newName))===1){
                    Storage::delete('public/pictures/'.$section.'/' . $newName . '/'.$prevRand.'avatar.jpeg');
                }
            if ($section === 'cameras') {
                $edited = Camera::find(json_decode($request->data, true)['prevData']['id']);
            }
            if ($section === 'conditioners') {
                $edited = Conditioner::find(json_decode($request->data, true)['prevData']['id']);
            }
                $edited->update(json_decode($request->data, true)['newData']['cardData']);
                return response()->json(['запись изменена'], 200);
            }
        else{
            $utils->sendNot("Попытка редактирования записи");
            return response()->json(["Ваш ранг недостаточен"], 200);
        }
    }
    public function createCard(Request $request){
        $utils = new CommonFunctions;
        if($request->role===2){
            $section=$request->section;
            if($section==='cameras') {
                if (sizeof(Camera::all()->where('name', json_decode($request->data, true)['name'])->all()) > 0) {
                    return response()->json(["Такое имя уже присутствует"], 200);
                }
            }
            if($section==='conditioners') {
                if (sizeof(Camera::all()->where('name', json_decode($request->data, true)['name'])->all()) > 0) {
                    return response()->json(["Такое имя уже присутствует"], 200);
                }
            }
            $i=0;
            $randomString=$utils->generateRandomString(8);
            if($request->hasFile('file'.$i)) {
                while ($request->hasFile('file' . $i)) {
                    $file = $request->file('file' . $i);
                    $file->storeAs('public/pictures/'.$section.'/' . json_decode($request->data, true)['name'], $randomString.$i . '.jpeg');
                    $i++;
                }
                $avatar = Image::make(file_get_contents(public_path('storage/pictures/'.$section.'/') . json_decode($request->data, true)['name'] . '/'.$randomString.'0.jpeg'));
                $avatar->fit(240, 150);
                $avatar->save(public_path('storage/pictures/'.$section.'/') . json_decode($request->data, true)['name'] . '/'.$randomString.'avatar.jpeg');
            }
            else{
                Storage::makeDirectory('public/pictures/'.$section.'/' . json_decode($request->data, true)['name']);
            }
            if($request->section==='cameras') {
                Camera::create(json_decode($request->data, true));
            }
            if($request->section==='conditioners') {
                Conditioner::create(json_decode($request->data,true));
            }
                return response()->json(["Запись добавлена"], 200);
        }
        else{
            $utils->sendNot("Попытка добавления записи");
            return response()->json(["Ваш ранг недостаточен"], 200);
        }
    }
    public function addMainPicture(Request $request)
    {
        $j = sizeof(Storage::files('public/pictures/main'));
        $i = 0;
        while ($request->hasFile('file' . $i)) {
            $file = $request->file('file' . $i);
            $file->storeAs('public/pictures/main/', $j.'.jpeg');
            $i++;
            $j++;
        }
        return response()->json(["Успешно добавлено"], 200);
    }
    public function getMainPageData(Request $request)
    {
        $item=mainText::find(1);
        $files=Storage::files('public/pictures/main');
        $links=[];
        foreach ($files as $key=>$value){
            $value=mb_substr($value, 6);
            $links[]='http://apiback/storage'.$value;
        }
        return response()->json([$links,$item['text']], 200);
    }
    public function editMainPage(Request $request){
        $utils = new CommonFunctions;
        $newText=$request->text;
        $item=mainText::find(1);
        $item->update(['text'=>$newText]);
        $utils->sendNot("текст изменён");
        return response()->json('текст изменён');
    }
}
