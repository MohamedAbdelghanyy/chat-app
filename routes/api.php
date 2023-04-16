<?php

use App\Http\Controllers\Admin\TenantController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UsersController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
/*
Route::middleware('auth:sanctum')->group(function (){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/users', [UsersController::class, 'getAllUsers']);
    Route::get('/users/{user_id}', [UsersController::class, 'getUserById']);
    Route::get('/messages/{receiver_id}', [MessageController::class, 'showAllMessages']);
    Route::post('/messages', [MessageController::class, 'store']);
    Route::post('/logout', [AuthController::class, 'logout']);
});



Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
*/


Route::get('/create-tenant/{name}', [TenantController::class, 'createTenant']);
