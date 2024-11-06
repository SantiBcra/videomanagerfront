import React, { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {loading && <p>Cargando videos...</p>}

      {/* Vista en Tabla para pantallas grandes */}
      <div className="video-table large-screen">
        {videos.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Instagram</th>
                <th>Verisart</th>
                <th>Google Drive Link</th>
                <th>Subtítulos</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video.id}>
                  <td>
                    <a
                      href={`https://videomanagerfront-3nx6.vercel.app/video/${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {video.id}
                    </a>
                  </td>
                  <td>{video.instagram}</td>
                  <td>{video.verisart}</td>
                  <td>
                    <a href={video.drivelink} target="_blank" rel="noopener noreferrer">
                      Abrir
                    </a>
                  </td>
                  <td>
                    <ul>
                      {video.languages?.english && <li>English</li>}
                      {video.languages?.spanish && <li>Spanish</li>}
                      {video.languages?.chinese && <li>Chinese</li>}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No se encontraron videos.</p>
        )}
      </div>

      {/* Vista en Tarjetas (Cards) para pantallas pequeñas */}
      <div className="card-container small-screen">
        {videos.length > 0 ? (
          videos.map((video) => (
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
          ))
        ) : (
          !loading && <p>No se encontraron videos.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;



