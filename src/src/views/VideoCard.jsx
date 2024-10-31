
import React from 'react';
import './VideoCard.css'; // Asegúrate de incluir los estilos en tu proyecto

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
     
      {/* {video.thumbnail && (
        <img src={video.thumbnail} alt={video.title || 'Video Thumbnail'} className="video-thumbnail" />
      )} */}

      {/* Video Info */}
      <div className="video-details">
      

        {/* Metadata */}
        <div className="video-metadata">
          <p><strong>Instagram:</strong> {video.instagram}</p>
          <p><strong>Verisart:</strong> {video.verisart}</p>
          <p><strong>Google Drive Link:</strong> <a href={video.drivelink} target="_blank" rel="noopener noreferrer">Abrir</a></p>
          
        </div>

        {/* Languages */}
        <div className="video-languages">
          <strong>Subtítulos:</strong>
          <ul>
            {video.languages.english && <li>English</li>}
            {video.languages.spanish && <li>Spanish</li>}
            {video.languages.chinese && <li>Chinese</li>}
          </ul>
        </div>

   
      </div>
    </div>
  );
};

export default VideoCard;



