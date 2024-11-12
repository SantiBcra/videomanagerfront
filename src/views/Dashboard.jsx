import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'; 
import "./Dashboard.css";
import "./form.css"; 

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

  // Función para eliminar un video
  const deleteVideo = async (id) => {
    try {
      const response = await fetch(`https://lightgray-lobster-895274.hostingersite.com/public/videos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el video");
      }

      // Filtrar el video eliminado del estado actual
      setVideos(videos.filter((video) => video.id !== id));
      
        Swal.fire({
          title: '¡Éxito!',
          text: `Eliminado correctamente`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

    } catch (error) {
      console.error("Error al eliminar el video:", error);
    }
  };

  
  // Función para abrir el modal de actualización
  const handleUpdate = (video) => {
    Swal.fire({
      title: "Actualizar Video",
      html: `
        <form id="update-form" class="video-form">
          <label for="instagram">Instagram del Artista:</label>
          <input type="text" id="instagram" name="instagram" value="${video.instagram}" required />

          <label for="verisart">Link de Verisart:</label>
          <input type="text" id="verisart" name="verisart" value="${video.verisart}" />

          <label>
            <input type="checkbox" id="addsense" name="addsense" ${video.addsense ? "checked" : ""} />
            Google AdSense
          </label>

          <label>Subtítulos:</label>
          <label><input type="checkbox" name="english" ${video.languages.english ? "checked" : ""} /> English</label>
          <label><input type="checkbox" name="spanish" ${video.languages.spanish ? "checked" : ""} /> Español</label>
          <label><input type="checkbox" name="chinese" ${video.languages.chinese ? "checked" : ""} /> Chinese</label>

          <label for="drivelink">ID de Google Drive:</label>
          <input type="text" id="drivelink" name="drivelink" value="${video.drivelink}" />
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      preConfirm: async () => {
        const form = document.getElementById("update-form");
        const updatedVideo = {
          instagram: form.instagram.value,
          verisart: form.verisart.value,
          addsense: form.addsense.checked,
          languages: {
            english: form.querySelector("input[name='english']").checked,
            spanish: form.querySelector("input[name='spanish']").checked,
            chinese: form.querySelector("input[name='chinese']").checked,
          },
          drivelink: form.drivelink.value,
        };

        try {
          const response = await fetch(`https://lightgray-lobster-895274.hostingersite.com/public/videos/${video.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedVideo),
          });
          if (!response.ok) throw new Error("Error al actualizar el video");
          fetchVideos(); // Actualizar la lista de videos
          Swal.fire("Actualizado", "El video ha sido actualizado.", "success");
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      },
    });
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
                <th>Acciones</th> {/* Nueva columna para el botón de eliminar */}
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video.id}>
                  <td data-label="ID">
                    <a href={`https://videomanagerfront-kavk.vercel.app/video/${video.id}/${video.verisart}`} target="_blank" rel="noopener noreferrer">
                      {video.id}
                    </a>
                  </td>
                  <td data-label="Instagram">{video.instagram}</td>
                  <td data-label="Verisart">{video.verisart}</td>
                  <td data-label="Google Drive Link">{video.drivelink}</td>
                  <td data-label="Subtítulos">
                    <ul>
                      {video.languages?.english && <li>English</li>}
                      {video.languages?.spanish && <li>Spanish</li>}
                      {video.languages?.chinese && <li>Chinese</li>}
                    </ul>
                  </td>
                  <td data-label="Acciones">
                    <button
                      className="btn-delete"
                      onClick={() => deleteVideo(video.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn-update"
                      onClick={() => handleUpdate(video)}
                    >
                      Actualizar
                    </button>
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
