import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HotelForm from "./components/HotelForm";
import HotelList from "./components/HotelList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-dark bg-dark p-3">
        <div className="container d-flex justify-content-between">
          <Link to="/" className="navbar-brand">
            🏨 Sistema de Hoteles
          </Link>
          <div>
            <Link to="/" className="btn btn-outline-light me-2">🏠 Inicio</Link>
            <Link to="/nuevo" className="btn btn-success">➕ Agregar Hotel</Link>
          </div>
        </div>
      </nav>

      <div className="container d-flex justify-content-center align-items-center flex-column mt-4">
        <Routes>
          <Route path="/" element={<HotelList />} />
          <Route path="/nuevo" element={<HotelForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
