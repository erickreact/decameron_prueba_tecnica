<?php

namespace App\Http\Controllers;

use App\Models\Habitacion;
use App\Models\Hotel;
use Illuminate\Http\Request;

class HabitacionController extends Controller {
    public function index(Request $request) {
		 // Verificar si se pasó un hotel_id en la URL
		 if ($request->has('hotel_id')) {
			$habitaciones = Habitacion::where('hotel_id', $request->hotel_id)->get();
			return response()->json($habitaciones, 200);
		}
        return response()->json(Habitacion::all(), 200);
    }

    public function store(Request $request) {
        $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'tipo' => 'required|in:ESTANDAR,JUNIOR,SUITE',
            'acomodacion' => 'required',
            'cantidad' => 'required|integer|min:1',
        ]);

        // Validar reglas de acomodación
		$reglas = [
            'ESTANDAR' => ['SENCILLA', 'DOBLE'],
            'JUNIOR' => ['TRIPLE', 'CUADRUPLE'],
            'SUITE' => ['SENCILLA', 'DOBLE', 'TRIPLE']
        ];
        if (!in_array($request->acomodacion, $reglas[$request->tipo])) {
            return response()->json(["error" => "Acomodación inválida para este tipo de habitación."], 400);
        }

		$hotel = Hotel::find($request->hotel_id);
		$totalHabitaciones = Habitacion::where('hotel_id', $request->hotel_id)->sum('cantidad') + $request->cantidad;
	
		if ($totalHabitaciones > $hotel->num_habitaciones) {
			return response()->json(["error" => "No se pueden asignar más habitaciones que el máximo permitido por el hotel."], 400);
		}
	
		if (Habitacion::where('hotel_id', $request->hotel_id)->where('tipo', $request->tipo)->where('acomodacion', $request->acomodacion)->exists()) {
			return response()->json(["error" => "Ya existe este tipo de habitación con esta acomodación en este hotel."], 400);
		}
	
		return response()->json(Habitacion::create($request->all()), 201);
    }
	public function destroy($id) {
        Habitacion::destroy($id);
        return response()->json(["mensaje" => "Habitación eliminada"]);
    }
}
