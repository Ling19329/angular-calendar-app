<?php

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

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {

    $router->post('register', 'AuthController@register');
    $router->post('login', 'AuthController@login');

    $router->get('user',  ['uses' => 'UserController@showAllUsers']);
    $router->get('user/{id}', ['uses' => 'UserController@showOneUser']);
    $router->delete('user/{id}', ['uses' => 'UserController@delete']);
    $router->put('user/{id}', ['uses' => 'UserController@update']);

    $router->get('student',  ['uses' => 'StudentController@showAllStudents']);
    $router->get('student/{id}', ['uses' => 'StudentController@showOneStudent']);
    $router->post('student', ['uses' => 'StudentController@create']);
    $router->delete('student/{id}', ['uses' => 'StudentController@delete']);
    $router->put('student/{id}', ['uses' => 'StudentController@update']);

    $router->get('event',  ['uses' => 'EventController@showAllEvents']);
    $router->get('event/{id}', ['uses' => 'EventController@showOneEvent']);
    $router->post('event', ['uses' => 'EventController@create']);
    $router->delete('event/{id}', ['uses' => 'EventController@delete']);
    $router->put('event/{id}', ['uses' => 'EventController@update']);
});


