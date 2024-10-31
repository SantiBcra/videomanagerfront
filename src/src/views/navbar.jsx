import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'; // Asegúrate de crear este archivo

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-video">Agregar Video</Link>
        </li>
        <li>
          <Link to="/view">Dashboard</Link>
        </li>

        <li>
          {/* Enlace dinámico hacia un video específico */}
          <Link to={`/video/`}>Ver Video</Link>
        </li>

        
      </ul>
    </nav>
  );
};

export default Navbar;
