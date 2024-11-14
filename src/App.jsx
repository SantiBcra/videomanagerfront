import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './views/Home'
import Navbar from './views/navbar';
import FormVideo from './views/form';
import Dashboard from './views/Dashboard';
import VideoPlayer from './views/FinalVideo';
import VideoNull from './views/VideoNull';

function App() {
  const location = useLocation();

  // Mostrar Navbar en todas las rutas excepto en /video/:id
  const showNavbar = !location.pathname.startsWith('/video');

  return (
    <div className="App">
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/video/:id/:nombre" element={<VideoPlayer />} />
        <Route path="/video" element={<VideoNull />} />
        <Route path="/" element={<FormVideo />} />
        <Route path="/view" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}


export default AppWrapper;

