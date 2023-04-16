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
Route::get('/create-tenant/{name}', [TenantController::class, 'createTenant']);
