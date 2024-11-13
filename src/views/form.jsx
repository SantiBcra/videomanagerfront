import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import './form.css'; // Asegúrate de tener este archivo CSS importado

const FormVideo = () => {
  const [formData, setFormData] = useState({
    instagram: '',
    verisart: '',
    addsense: false,
    languages: {
      english: false,
      spanish: false,
      chinese: false
    },
    drivelink: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'addsense') {
        setFormData({
          ...formData,
          addsense: checked,
        });
      } else {
        setFormData({
          ...formData,
          languages: {
            ...formData.languages,
            [name]: checked,
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    console.log(formData); // Verificar el estado actual en la consola
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://lightgray-lobster-895274.hostingersite.com/public/videos', {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Usamos formData aquí
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Formulario enviado exitosamente:', result);
        
        // Muestra la alerta de éxito
        Swal.fire({
          title: '¡Éxito!',
          text: `Agregado correctamente. Mediante este LINK podra acceder a su video: https://videomanagerfront-3nx6.vercel.app/video/${result.message}`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      } else {
        console.error('Error al enviar el formulario:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
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

      <div className="checkbox-group">
        <label>Subtítulos:</label>
        <label>
          <input
            type="checkbox"
            name="english"
            checked={formData.languages.english}
            onChange={handleChange}
          />
          English
        </label>
        <label>
          <input
            type="checkbox"
            name="spanish"
            checked={formData.languages.spanish}
            onChange={handleChange}
          />
          Español
        </label>
        <label>
          <input
            type="checkbox"
            name="chinese"
            checked={formData.languages.chinese}
            onChange={handleChange}
          />
          中文
        </label>
      </div>

      <label htmlFor="drivelink">ID de Google Drive:</label>
      <input
        type="text"
        id="drivelink"
        name="drivelink"
        value={formData.drivelink}
        onChange={handleChange}
      />

      <button type="submit">Agregar Video</button>
    </form>
  );
};

export default FormVideo;
