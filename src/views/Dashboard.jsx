import React, { useEffect, useState } from "react";
import "./Dashboard.css"; // Asegúrate de agregar estilos para el Dashboard si es necesario

function Dashboard() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos de video
  const fetchVideos = async () => {
    try {
      const response = await fetch("https://lightgray-lobster-895274.hostingersite.com/public/all");
      if (!response.ok) {
        throw new Error("Error al cargar los datos");
      }
      const data = await response.json();

      const parsedData = data.message.map(video => ({
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

  // Llamar a la API cuando el componente se monta
  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      {/* Mensaje de carga */}
      {loading && <p>Cargando videos...</p>}
      
      {/* Mostrar videos en tabla */}
      <div className="video-table">
        {videos.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th className="red">ID</th>
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
                  <a href={`https://videomanagerfront-3nx6.vercel.app/video/${video.id}`} target="_blank" rel="noopener noreferrer">
                    {video.id}
                  </a>
                </td>
                  <td>{video.instagram}</td>
                  <td>{video.verisart}</td>
                  <td>{video.drivelink}</td>
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
    </div>
  );
}

export default Dashboard;

