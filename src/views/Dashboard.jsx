import React, { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para índice actual del carrusel

  const fetchVideos = async () => {
    try {
      const response = await fetch("https://lightgray-lobster-895274.hostingersite.com/public/all");
      if (!response.ok) {
        throw new Error("Error al cargar los datos");
      }
      const data = await response.json();

      const parsedData = data.message.map((video) => ({
        ...video,
        languages: JSON.parse(video.languages),
      }));

      setVideos(parsedData);
    } catch (error) {
      console.error("Error al obtener videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Funciones para el carrusel
  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {loading && <p>Cargando videos...</p>}

      <div className="video-table">
        {videos.length > 0 ? (
          <div className="carousel-container">
            <div className="carousel" style={{ transform: `translateY(-${currentIndex * 100}%)` }}>
              {videos.map((video) => (
                <div className="video-card" key={video.id}>
                  <div className="video-card-header">
                    <h3>ID: {video.id}</h3>
                    <a
                      href={`https://videomanagerfront-3nx6.vercel.app/video/${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver Video
                    </a>
                  </div>
                  <div className="video-card-content">
                    <p>
                      <strong>Instagram:</strong> {video.instagram}
                    </p>
                    <p>
                      <strong>Verisart:</strong> {video.verisart}
                    </p>
                    <p>
                      <strong>Google Drive Link:</strong>{" "}
                      <a href={video.drivelink} target="_blank" rel="noopener noreferrer">
                        Abrir
                      </a>
                    </p>
                    <p>
                      <strong>Subtítulos:</strong>
                    </p>
                    <ul className="languages">
                      {video.languages?.english && <li>English</li>}
                      {video.languages?.spanish && <li>Spanish</li>}
                      {video.languages?.chinese && <li>Chinese</li>}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Botones de navegación solo visibles en móvil */}
            <div className="carousel-controls">
              <button onClick={handlePrevious} disabled={currentIndex === 0}>
                ⬆️
              </button>
              <button onClick={handleNext} disabled={currentIndex === videos.length - 1}>
                ⬇️
              </button>
            </div>
          </div>
        ) : (
          !loading && <p>No se encontraron videos.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

