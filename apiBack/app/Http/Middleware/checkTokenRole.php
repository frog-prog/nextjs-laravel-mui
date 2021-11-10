<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use App\Http\Common\CommonFunctions;

class checkTokenRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if($request->token!==null){
            $utils=new CommonFunctions;
            $id = (int)explode('|', $request->token)[0];
            $user = User::where('id', $id)->first();
            if ($user) {
                $usersTokens = json_decode($user->api_token);
                if($usersTokens!==null) {
                    if ($utils->findToken($usersTokens, $request->token)) {
                        $request->role=$user->role;
                        return $next($request);
                    }
                    else {
                        return response()->json('Токен неверен '.json_encode($request->all()), 200);
                    }
                }
                else {
                    return response()->json('Токен неверен '.json_encode($request->all()), 200);
                }
            }
            else {
                return response()->json('Токен неверен '.json_encode($request->all()), 200);
            }
        }
        else {
            return response()->json('Токен неверен '.json_encode($request->all()), 200);
        }
    }
}
