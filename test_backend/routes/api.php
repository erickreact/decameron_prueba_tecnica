<?php

use App\Http\Controllers\HotelController;
use App\Http\Controllers\HabitacionController;
use Illuminate\Support\Facades\Route;

Route::apiResource('/hoteles', HotelController::class);
Route::apiResource('/habitaciones', HabitacionController::class);