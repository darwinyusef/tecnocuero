<?php

/** @var \Laravel\Lumen\Routing\Router $router */

use \App\Http\Controllers\AttendeeController;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/api', function () use ($router) {
    return response()->json([
        "error" => "Bienvenido a nuestra API Dios Consejero",
        "authorization" => "Usted no tiene permisos",
        "code" => 404
    ], 404);
});

$router->get('/api/attendees', ['uses' => 'AttendeeController@index']);
$router->get('/api/materials', ['uses' => 'AttendeeController@materials']);
$router->get('/api/materials/{id}', ['uses' => 'AttendeeController@materialUpdateId']);
$router->post('/api/attendees', ['uses' => 'AttendeeController@store']);
$router->get('/api/attendees/{id}', ['uses' => 'AttendeeController@show']);
$router->put('/api/attendees/{id}', ['uses' => 'AttendeeController@update']);
$router->delete('/api/attendees/{id}', ['uses' => 'AttendeeController@destroy']);
