import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'; // Asegúrate de crear este archivo

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        
        <li>
          <Link to="/">Agregar Video</Link>
        </li>
        <li>
          <Link to="/view">Dashboard</Link>
        </li>

       

        
      </ul>
    </nav>
  );
};

export default Navbar;
