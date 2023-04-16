<?php

declare(strict_types=1);

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/

Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/api/user', function (Request $request) {
            return $request->user();
        });
        Route::get('/api/users', [UsersController::class, 'getAllUsers']);
        Route::get('/api/users/{user_id}', [UsersController::class, 'getUserById']);
        Route::get('/api/messages/{receiver_id}', [MessageController::class, 'showAllMessages']);
        Route::post('/api/messages', [MessageController::class, 'store']);
        Route::post('/api/logout', [AuthController::class, 'logout']);
    });
    Route::post('/api/signup', [AuthController::class, 'signup']);
    Route::post('/api/login', [AuthController::class, 'login']);
});
