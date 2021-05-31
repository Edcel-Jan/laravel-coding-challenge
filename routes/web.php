<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmailListController;
use App\Http\Middleware\Authenticate;
use App\Http\Middleware\CheckIfAdmin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//login
Route::get('/', function () {
    return view('login');
})->name('is_login');


//registration
Route::get('/register/{id}/{code}', function() {
        return view('registration');
})->middleware('is_login');


Route::post('/sign-up',[AuthController::class, 'register']);


//login post
Route::post('/login', [AuthController::class, 'login']);

//registration details for the email who's invited
Route::post('/get-registration', [AuthController::class, 'getRegistrationDetail']);

Route::get('/register', function() {
    return view('registration_noreferal');
})->middleware('is_login');

Route::middleware([Authenticate::class])->group(function() {
    Route::post('/add-email-to-list', [EmailListController::class,'addEmail']);
    Route::post('/add-email', [EmailListController::class, 'inviteEmail']);
    //logoutemail
    Route::get('/user/invite', function() {
        return view('user.invite');
    });
    Route::post('/logout',[AuthController::class,'logout'])->name('logout');
});


Route::middleware([CheckIfAdmin::class])->group(function() {
    Route::get('/admin/referals', function(){
        return view('admin.index');
    });
    Route::get('/get-details',[ EmailListController::class, 'getDetails']);
});




// Route::middleware('is_admin', function() {
//     Route::get('/admin/referals', [EmailListController::class, 'index']);
// });



