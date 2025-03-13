import React, { useEffect, useState, useRef } from "react";
import { getHoteles, deleteHotel } from "../services/api";
import HabitacionForm from "./HabitacionForm";
import HabitacionList from "./HabitacionList";

const HotelList = () => {
  const [hoteles, setHoteles] = useState([]);
  const recargarHabitacionesRefs = useRef({}); 

  useEffect(() => {
    getHoteles()
      .then((response) => setHoteles(response.data))
      .catch((error) => console.error("Error al obtener hoteles:", error));
  }, []);

  const cargarHoteles = () => {
    getHoteles()
      .then((response) => setHoteles(response.data))
      .catch((error) => console.error("Error al obtener hoteles:", error));
  };

  const eliminarHotel = (id) => {
    deleteHotel(id)
      .then(() => cargarHoteles())
      .catch((error) => console.error("Error al eliminar hotel:", error));
  };

  return (
	<div>
	<h2 className="text-center mb-4">Lista de Hoteles</h2>
	<div className="row">
	  {hoteles.length === 0 ? (
		<p className="text-center text-muted">No hay hoteles registrados.</p>
	  ) : (
		hoteles.map((hotel) => {
		  if (!recargarHabitacionesRefs.current[hotel.id]) {
			recargarHabitacionesRefs.current[hotel.id] = React.createRef();
		  }

		  return (
			<div key={hotel.id} className="col-md-6 mb-10">
			  <div className="card shadow-sm">
				<div className="card-body text-center">
				  <h5 className="card-title">{hotel.nombre} - {hotel.ciudad}</h5>
				  <p className="card-text"><strong>Dirección:</strong> {hotel.direccion}</p>
				  <p className="card-text"><strong>NIT:</strong> {hotel.nit}</p>
				  <p><strong>Total Habitaciones:</strong> {hotel.num_habitaciones}</p>
				  <p><strong>Disponibles:</strong> {hotel.habitaciones_disponibles}</p> 
				  <HabitacionForm hotelId={hotel.id} recargarHabitacionesRef={recargarHabitacionesRefs.current[hotel.id]} />
				  <HabitacionList hotelId={hotel.id} recargarHabitacionesRef={recargarHabitacionesRefs.current[hotel.id]} />
				  <button className="btn btn-danger btn-sm" onClick={() => eliminarHotel(hotel.id)}>🗑 Eliminar</button>
				</div>
			  </div>
			</div>
		  );
		})
	  )}
	</div>
  </div>
  );
};

export default HotelList;
