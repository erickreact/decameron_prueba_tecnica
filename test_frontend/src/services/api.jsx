import axios from "axios";

const API_URL = "http://localhost:8000/api"; // URL del backend Laravel

export const getHoteles = () => axios.get(`${API_URL}/hoteles`);
export const createHotel = (hotelData) => axios.post(`${API_URL}/hoteles`, hotelData);
export const getHotel = (id) => axios.get(`${API_URL}/hoteles/${id}`);
export const deleteHotel = (id) => axios.delete(`${API_URL}/hoteles/${id}`);

export const getHabitaciones = (hotelId) => axios.get(`${API_URL}/habitaciones?hotel_id=${hotelId}`);
export const createHabitacion = (habitacionData) => axios.post(`${API_URL}/habitaciones`, habitacionData);
export const deleteHabitacion = (id) => axios.delete(`${API_URL}/habitaciones/${id}`);
