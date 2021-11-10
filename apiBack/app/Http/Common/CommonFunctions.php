<?php
namespace App\Http\Common;
use Illuminate\Support\Facades\Hash;
class CommonFunctions{
    public static function sendNot($text){
        $token = "1748602304:AAE-M6dnKMHVnPtyOzxtCqFIFAwcdhuU6Ds";
        $chat_id = "-597859853";
        $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$text}","r");
        if ($sendToTelegram) {
            return 1;
        } else {
            return 0;
        }
    }
    public static function generateRandomString($length) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
    public static function findToken($tokenArray,$token){
        $found=false;
        foreach ($tokenArray as $i){
            if(Hash::check($token,$i)){
                $found=true;
            }
        }
        return $found;
    }
}

