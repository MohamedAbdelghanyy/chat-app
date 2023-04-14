<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    //
    public function getAllUsers(){
        $messages = DB::table('users')
            ->select(['id', 'name'])
            ->get();
        return response($messages, 200);
    }

    public function getUserById(int $userID)
    {
        //
        $messages = DB::table('users')
            ->select('*')
            ->where('id', $userID)
            ->get();
        return response($messages, 200);
    }
}
