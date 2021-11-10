<?php
use Illuminate\Http\Request;
use App\Http\Common\CommonFunctions;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('cors')->post('/conditioners','App\Http\Controllers\conditionerController@filteredPagination');
Route::middleware('cors')->post('/cameras','App\Http\Controllers\cameraController@filteredPagination');
Route::middleware('cors')->get('/products/conditioners/ids',function (){
    $all=App\Models\Conditioner::all()->sortBy('id')->values()->all();
    $ids=[];
    foreach ($all as $item){
        $ids[]=$item['id'];
    }
    return response()->json($ids);
});
Route::middleware('cors')->get('/products/cameras/ids',function (){
    $all=App\Models\Camera::all()->sortBy('id')->values()->all();
    $ids=[];
    foreach ($all as $item){
        $ids[]=$item['id'];
    }
        return response()->json($ids);
});
Route::middleware('cors')->get('/conditioners/count',function (){
    $count=App\Models\Conditioner::all()->count();
    if($count%15!==0){
    return (int)($count/15)+1;
}
else{
    return $count/15;
}
});
Route::middleware('cors')->get('/cameras/count',function (){
    $count=App\Models\Camera::all()->count();
    if($count%15!==0){
    return (int)($count/15)+1;
}
else{
    return $count/15;
}
});

Route::middleware('cors')->get('/products/conditioner/{id}','App\Http\Controllers\conditionerController@throughID');
Route::middleware('cors')->get('/products/camera/{id}','App\Http\Controllers\cameraController@throughID');
Route::middleware('cors')->get('/products/conditioners/{id}','App\Http\Controllers\conditionerController@SimpleThroughID');
Route::middleware('cors')->get('/products/cameras/{id}','App\Http\Controllers\cameraController@SimpleThroughID');
Route::middleware('cors')->get('/cameras/{page}','App\Http\Controllers\cameraController@pagination');
Route::middleware('cors')->get('/conditioners/{page}','App\Http\Controllers\conditionerController@pagination');
Route::middleware('cors')->get('/main','App\Http\Controllers\mainPageController@giveText');

Route::prefix('authentication')->group(function() {
    Route::post('/registration', 'App\Http\Controllers\AuthController@registration');
    Route::post('/login', 'App\Http\Controllers\AuthController@login');
    Route::post('/logout', 'App\Http\Controllers\AuthController@logout');
    Route::post('/reset', 'App\Http\Controllers\AuthController@reset');
    Route::post('/checktoken', 'App\Http\Controllers\AuthController@checkToken');
});
Route::prefix('administration')->group(function() {
    Route::middleware('checkToken')->post('/changerang', 'App\Http\Controllers\AdminController@changeRang');
    Route::middleware('checkToken')->post('/deletecard', 'App\Http\Controllers\AdminController@deleteCard');
    Route::middleware('checkToken')->post('/createcard', 'App\Http\Controllers\AdminController@createCard');
    Route::middleware('checkToken')->post('/editcard', 'App\Http\Controllers\AdminController@editCard');
    Route::middleware('checkToken')->post('/editmainpage', 'App\Http\Controllers\AdminController@editMainPage');
    Route::middleware('checkToken')->post('/users', 'App\Http\Controllers\AdminController@getUsers');
    Route::middleware('checkToken')->post('/addPicture', 'App\Http\Controllers\AdminController@addMainPicture');
    Route::middleware('checkToken')->post('/getMainPageData', 'App\Http\Controllers\AdminController@getMainPageData');
});


