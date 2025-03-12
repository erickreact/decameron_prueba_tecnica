<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;

class HotelController extends Controller {
    public function index() {
        return response()->json(Hotel::all(), 200);
    }

    public function store(Request $request) {
        $request->validate([
            'nombre' => 'required|unique:hotels',
            'direccion' => 'required',
            'ciudad' => 'required',
            'nit' => 'required|unique:hotels',
            'num_habitaciones' => 'required|integer|min:1',
        ]);

        $hotel = Hotel::create($request->all());

        return response()->json($hotel, 201);
    }
}
