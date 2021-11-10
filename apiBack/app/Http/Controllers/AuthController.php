<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Common\CommonFunctions;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    //
    public function registration(Request $request){
        $utils=new CommonFunctions;
        // 1
        $user = User::where('login', $request->login)->first();
        if($user){
            return response()->json(['error' =>['Такой пользователь уже есть']],200);
        }
        if (strlen($request->login)<8 || strlen($request->password)<8){
            return response()->json(['error' =>['И логин и пароль должны быть длиннее 8ми символов']], 200);
        }
        // 2
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $token=$utils->generateRandomString(40);
        $newUser=User::create($input);
        $token=$newUser->id.'|'.$token;
        $newUser->update(['api_token'=>json_encode([bcrypt($token)])]);
        // 3
        $utils->sendNot("Зарегестрирован новый пользователь ".$input['login']);
        return response()->json(['token' => $token,'role'=>1], 200);
    }
    public function login(Request $request){
        $utils=new CommonFunctions;
        // 1
        $user = User::where('login', $request->login)->first();
        // 2
        if (!$user || !Hash::check($request->password, $user->password)){
            $utils->sendNot("Попытка входа");
            return response()->json(['error' => ['Неверный логин или пароль']], 200);
        }
        $oldTokens=json_decode($user->api_token);
        $token=$user->id.'|'.$utils->generateRandomString(40);
        $oldTokens[]=bcrypt($token);
        $utils->sendNot("Пользователь ".$user['login']." вошел в систему");
        $user->update(['api_token'=>json_encode($oldTokens)]);
        return response()->json(['token' => $token,'role'=>$user->role], 200);
    }
    public function logout(Request $request) {
        $utils = new CommonFunctions;
        $id = (int)explode('|', $request->token)[0];
        $user = User::where('id', $id)->first();
        if ($user) {
            $usersTokens = json_decode($user->api_token);
            if($usersTokens!==null) {
                if ($utils->findToken($usersTokens, $request->token)) {
                    $user->update(['api_token' => null]);
                    $utils->sendNot("Пользователь " . $user->login . " вышел из системы");
                    return response()->json(['Вы вышли'], 200);
                }
                else {
                    return response()->json(['error' =>['Токен неверен']], 200);
                }
            }
            else {
                return response()->json(['error' =>['Токен неверен']], 200);
            }
        }
        else {
            return response()->json(['error' =>['Токен неверен']], 200);
        }
    }
    public function reset(Request $request) {
        $utils=new CommonFunctions;
        $newPass=$utils->generateRandomString(8);
        User::where('login',$request->login)->update(['password'=>bcrypt($newPass),'api_token'=>null]);
        $utils->sendNot("Пароль пользователя ".$request->login." изменен на ".$newPass);
        return response()->json('Пароль изменен',200);
    }
    public function checkToken(Request $request){
        $utils=new CommonFunctions;
        $id = (int)explode('|', $request->token)[0];
        $user = User::where('id', $id)->first();
        if ($user) {
            $usersTokens = json_decode($user->api_token);
            if($usersTokens!==null) {
                if ($utils->findToken($usersTokens, $request->token)) {
                    return response()->json(['role' => $user->role], 200);
                }
                else {
                    return response()->json(['error' =>['Токен неверен']], 200);
                }
            }
            else {
                return response()->json(['error' =>['Токен неверен']], 200);
            }
        }
        else {
            return response()->json(['error' =>['Токен неверен']], 200);
        }
    }
}
