import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './form.css';

const FormVideo = () => {
  const [formData, setFormData] = useState({
    instagram: '',
    verisart: '',
    addsense: false,
    drivelink: '',
    subtitles: null, // Archivo de subtítulos
    video: null, // Archivo de video
  });

  const [isUploading, setIsUploading] = useState(false); // Estado para controlar la carga
  const [uploadMessage, setUploadMessage] = useState(''); // Mensaje de carga

  const handleChange = (e) => {
    const { name, type, files } = e.target;

    if (type === 'file') {
      // Verificar si el archivo es de subtítulos o video
      setFormData({
        ...formData,
        [name]: files[0], // Guardamos el archivo .vtt o de video seleccionado
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        addsense: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: e.target.value,
      });
    }

    console.log(formData); // Verificar el estado actual en la consola
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.video) {
      Swal.fire({
        title: 'Error',
        text: 'Debe seleccionar un archivo de video.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    setIsUploading(true); // Establecer estado de carga
    setUploadMessage('Espere mientras el video se sube...'); // Mensaje de carga

    const formDataToSend = new FormData();

    // Añadir los campos de texto
    formDataToSend.append('instagram', formData.instagram);
    formDataToSend.append('verisart', formData.verisart);
    formDataToSend.append('addsense', formData.addsense);
    formDataToSend.append('drivelink', formData.drivelink);

    // Añadir el archivo de subtítulos si existe
    if (formData.subtitles) {
      formDataToSend.append('subtitles', formData.subtitles);
    }

    // Añadir el archivo de video si existe
    if (formData.video) {
      formDataToSend.append('video', formData.video);
    }

    try {
      const response = await fetch('https://lightgray-lobster-895274.hostingersite.com/public/videos', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Formulario enviado exitosamente:', result);

        Swal.fire({
          title: '¡Éxito!',
          text: `Agregado correctamente. Mediante este LINK podrá acceder a su video: https://videomanagerfront-3nx6.vercel.app/video/${result.message}`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      } else {
        console.error('Error al enviar el formulario:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    } finally {
      setIsUploading(false); // Finalizar carga
      setUploadMessage(''); // Limpiar mensaje de carga
    }
  };

  return (
    <form className="video-form" onSubmit={handleSubmit}>
      <label htmlFor="instagram">Instagram del Artista:</label>
      <input
        type="text"
        id="instagram"
        name="instagram"
        value={formData.instagram}
        onChange={handleChange}
        required
      />

      <label htmlFor="verisart">Link de Verisart:</label>
      <input
        type="text"
        id="verisart"
        name="verisart"
        value={formData.verisart}
        onChange={handleChange}
      />

      <label htmlFor="drivelink">ID de Google Drive:</label>
      <input
        type="text"
        id="drivelink"
        name="drivelink"
        value={formData.drivelink}
        onChange={handleChange}
      />

      <div className="file-group">
        <label>Subtítulos (archivo .vtt):</label>
        <input
          type="file"
          name="subtitles"
          accept=".vtt"
          onChange={handleChange}
        />
      </div>

      <div className="file-group">
        <label>Video (archivos .mp4, .mov, .avi, etc.):</label>
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleChange}
        />
      </div>

      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            id="addsense"
            name="addsense"
            checked={formData.addsense}
            onChange={handleChange}
          />
          Google AdSense
        </label>
      </div>

      <button type="submit" disabled={isUploading}>Agregar Video</button>
      {isUploading && <p>{uploadMessage}</p>} {/* Mostrar mensaje mientras se carga */}
    </form>
  );
};

export default FormVideo;
