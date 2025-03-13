import React, { useState } from "react";
import { createHabitacion } from "../services/api";

const HabitacionForm = ({ hotelId, recargarHabitacionesRef }) => {
  const [habitacion, setHabitacion] = useState({ tipo: "", acomodacion: "", cantidad: "" });
  const [errors, setErrors] = useState({}); // Estado para manejar errores

  const handleChange = (e) => {
    setHabitacion({ ...habitacion, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    createHabitacion({ ...habitacion, hotel_id: hotelId })
      .then(() => {
        setErrors({});
        setHabitacion({ tipo: "", acomodacion: "", cantidad: "" });
        if (recargarHabitacionesRef?.current) {
			recargarHabitacionesRef.current();
		  }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrors(error.response.data); // Guardar errores en el estado
        }
      });
  };

  return (
	<div>
	<h3 className="text-center">➕ Agregar Habitación</h3>
	<form onSubmit={handleSubmit}>
	  <select name="tipo" value={habitacion.tipo} onChange={handleChange} required>
		<option value="">Seleccione Tipo</option>
		<option value="ESTANDAR">Estándar</option>
		<option value="JUNIOR">Junior</option>
		<option value="SUITE">Suite</option>
	  </select>
	  {errors.tipo && <p className="text-danger">{errors.tipo[0]}</p>}

	  <select name="acomodacion" value={habitacion.acomodacion} onChange={handleChange} required>
		<option value="">Seleccione Acomodación</option>
		<option value="SENCILLA">Sencilla</option>
		<option value="DOBLE">Doble</option>
		<option value="TRIPLE">Triple</option>
		<option value="CUADRUPLE">Cuádruple</option>
	  </select>
	  {errors.acomodacion && <p className="text-danger">{errors.acomodacion[0]}</p>}

	  <input type="number" name="cantidad" placeholder="Cantidad" value={habitacion.cantidad} onChange={handleChange} required />
	  {errors.cantidad && <p className="text-danger">{errors.cantidad[0]}</p>}

	  {errors.error && <p className="text-danger">{errors.error}</p>}

	  <button type="submit" className="btn btn-success w-100 mt-2">Guardar Habitación</button>
	</form>
  </div>
  );
};

export default HabitacionForm;
