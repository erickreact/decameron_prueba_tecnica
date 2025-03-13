<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model {
    use HasFactory;

    protected $fillable = ['nombre', 'direccion', 'ciudad', 'nit', 'num_habitaciones'];

    //Definir relación con Habitacion
    public function habitaciones() {
        return $this->hasMany(Habitacion::class, 'hotel_id');
    }
}


