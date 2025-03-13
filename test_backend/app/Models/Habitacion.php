<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Habitacion extends Model {
    use HasFactory;

	protected $table = 'habitaciones';
    protected $fillable = ['hotel_id', 'tipo', 'acomodacion', 'cantidad'];

    // Relación inversa con Hotel
    public function hotel() {
        return $this->belongsTo(Hotel::class, 'hotel_id');
    }
}


