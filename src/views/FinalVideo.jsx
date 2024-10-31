import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './css/perfect-scrollbar.css';
import './css/mvp.css';

const VideoPlayer = () => {
  const { id } = useParams();
  const [videoPath, setVideoPath] = useState('');

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`https://lightgray-lobster-895274.hostingersite.com/public/videos/${id}`);

        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        
        const data = await response.json(); // Aquí debes usar .json() para obtener el objeto completo

        const videoData = data.message; // Accedemos correctamente a message

        console.log(data.message.drivelink)

        const ready = await setVideoPath(videoData.drivelink); // Actualiza el estado con el valor de videoPath

        // Configura las opciones del reproductor usando videoData.videoPath
        const settings = {
          gDriveAppId: "AIzaSyDMCGHB4N2fix7tvzGLFyRJjUZ2gHlQCrk",
          useMobileNativePlayer: true,
          mobileSeekbarMinWidth: 500,
          embedSrc: "0",
          openFsOnPlay: true,
          mediaEndAction: 'rewind',
          playlistPosition: 'vb',
          // combinePlayerRatio: true,
          // playlistScrollType: 'perfect-scrollbar',
          playlistOpened: false,
          showControlsBeforeStart: true,
          verticalBottomSepearator: 768,
          playlistBottomHeight: 300,
          instanceName: "player1",
          activePlaylist: ".playlist-video:first-child",
          playerRatio: 1,
          aspectRatio: 1, // Relación 9:16
          activeItem: 0,
          volume: 0.5,
          autoPlay: false,
          randomPlay: false,
          showControlsBeforeStart: true,
          elementsVisibilityArr: [
            { width: 6000, elements: ['play', 'fullscreen', 'settings', 'cc', 'volume'] }
            
          ],
        };

        // Inicia el reproductor con los settings configurados
        new mvp(document.getElementById('wrapper').children[0], settings);
      } catch (error) {
        console.error('Error al cargar el video:', error);
      }
    };

    fetchVideoData();
  }, [id]);

  if(videoPath){
    
    return (
    <div id="wrapper">
      <div className="playlist-video">
        <div 
          className="mvp-playlist-item" 
          data-type="gdrive_folder" 
          data-path={videoPath} // Asigna videoPath aquí
          data-poster="media/videos/esp.png" 
          data-download="media/video/01.mp4" 
          data-share="http://www.google.com" 
          data-thumb="media/video/thumb/01.jpg" 
          data-title="Video title goes here" 
          data-description="Self hosted video. Commodo vitae, tempor eu, urna eu mi hendrerit. Maecenas eu erat condimentum."
        >
          <div className="mvp-subtitles">
            <div data-label="English" data-src="media/subtitles/sintel-en.vtt" data-default></div>
            <div data-label="Spanish" data-src="media/subtitles/sintel-es.vtt"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
}

export default VideoPlayer;
