import React, { useEffect, useState } from "react";
import { getHabitaciones, deleteHabitacion } from "../services/api";

const HabitacionList = ({ hotelId, recargarHabitacionesRef }) => {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    cargarHabitaciones();
    if (recargarHabitacionesRef) {
      recargarHabitacionesRef.current = cargarHabitaciones;
    }
  }, []);

  const cargarHabitaciones = () => {
    getHabitaciones(hotelId)
      .then((response) => setHabitaciones(response.data))
      .catch((error) => console.error("Error al obtener habitaciones:", error));
  };

  const eliminarHabitacion = (id) => {
    deleteHabitacion(id)
      .then(() => cargarHabitaciones())
      .catch((error) => console.error("Error al eliminar habitación:", error));
  };

  return (
	<div className="mt-3">
	<h5 className="text-center">🛏 Habitaciones</h5>
	{habitaciones.length === 0 ? (
	  <p className="text-center text-muted">No hay habitaciones registradas.</p>
	) : (
	  <table className="table table-bordered">
		<thead className="table-dark">
		  <tr>
			<th>Tipo</th>
			<th>Acomodación</th>
			<th>Cantidad</th>
			<th>Acción</th>
		  </tr>
		</thead>
		<tbody>
		  {habitaciones.map((hab) => (
			<tr key={hab.id}>
			  <td>{hab.tipo}</td>
			  <td>{hab.acomodacion}</td>
			  <td>{hab.cantidad}</td>
			  <td>
				<button className="btn btn-danger btn-sm" onClick={() => eliminarHabitacion(hab.id)}>
				  🗑 Eliminar
				</button>
			  </td>
			</tr>
		  ))}
		</tbody>
	  </table>
	)}
  </div>
  );
};

export default HabitacionList;
