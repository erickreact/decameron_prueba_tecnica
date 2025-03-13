import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHotel } from "../services/api";

const HotelForm = () => {
  const navigate = useNavigate();
  const [hotel, setHotel] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    nit: "",
    num_habitaciones: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createHotel(hotel)
      .then(() => {
        setErrors({});
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      });
  };

  return (
    <div className="card p-4 shadow-sm">
      <h2 className="text-center mb-4">Registrar Nuevo Hotel</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" name="nombre" onChange={handleChange} required />
          {errors.nombre && <p className="text-danger">{errors.nombre[0]}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input type="text" className="form-control" name="direccion" onChange={handleChange} required />
          {errors.direccion && <p className="text-danger">{errors.direccion[0]}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Ciudad</label>
          <input type="text" className="form-control" name="ciudad" onChange={handleChange} required />
          {errors.ciudad && <p className="text-danger">{errors.ciudad[0]}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">NIT</label>
          <input type="text" className="form-control" name="nit" onChange={handleChange} required />
          {errors.nit && <p className="text-danger">{errors.nit[0]}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Número de Habitaciones</label>
          <input type="number" className="form-control" name="num_habitaciones" onChange={handleChange} required />
          {errors.num_habitaciones && <p className="text-danger">{errors.num_habitaciones[0]}</p>}
        </div>

        {errors.error && <p className="text-danger">{errors.error}</p>}

        <button type="submit" className="btn btn-success w-100">Guardar Hotel</button>
      </form>
    </div>
  );
};

export default HotelForm;
