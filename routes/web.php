<?php

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

Route::group(['prefix' => 'api/v1/todos'], function () {
    Route::get('/','TodoItemController@fetchAllItems');
    Route::post('/','TodoItemController@createItem');
    Route::delete('/{id}', 'TodoItemController@deleteItem');
    Route::put('/{id}', 'TodoItemController@updateItem');
});

Route::get('/', function () {
    return view('index');
});