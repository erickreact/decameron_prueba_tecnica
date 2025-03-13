<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;

class HotelController extends Controller {
    public function index() {
		$hoteles = Hotel::with('habitaciones')->get(); //Traer hoteles con sus habitaciones

		//Calcular habitaciones disponibles para cada hotel
		$hoteles->map(function ($hotel) {
			$habitacionesOcupadas = $hotel->habitaciones->sum('cantidad'); // Total habitaciones ocupadas
			$hotel->habitaciones_disponibles = $hotel->num_habitaciones - $habitacionesOcupadas;
			return $hotel;
		});
	
		return response()->json($hoteles, 200);
    }

    public function store(Request $request) {
        //  Validaciones antes de crear un hotel
        $request->validate([
            'nombre' => 'required|unique:hotels',
            'direccion' => 'required',
            'ciudad' => 'required',
            'nit' => 'required|unique:hotels',
            'num_habitaciones' => 'required|integer|min:1',
        ]);

		if (Hotel::where('nombre', $request->nombre)->orWhere('nit', $request->nit)->exists()) {
			return response()->json(["error" => "El hotel con este nombre o NIT ya existe."], 400);
		}
	
		return response()->json(Hotel::create($request->all()), 201);
    }
}


