<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
class Controller extends BaseController
{
    //
    protected function respondWithToken($token, $user_id, $user_role)
    {
        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 3600,
            'id' => $user_id,
            'role' => $user_role
        ], 200);
    }
}
