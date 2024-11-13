import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sub from "./media/subtitles/sintel-en.vtt";
import subdos from "./media/subtitles/sintel-es.vtt";
import subtres from "./media/subtitles/sintel-pr.vtt";
import './js/new';
import './js/share_manager';
import './css/perfect-scrollbar.css';
import './css/mvp.css';

const VideoPlayer = () => {
  const { id, nombre } = useParams();
  const [videoPath, setVideoPath] = useState('');
  const [instagram, setInstagram] = useState('');
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
        const ready2 = await setInstagram(videoData.instagram); // Actualiza el estado con el valor de videoPath
        // Configura las opciones del reproductor usando videoData.videoPath
        const settings = {
          gDriveAppId: "AIzaSyDMCGHB4N2fix7tvzGLFyRJjUZ2gHlQCrk",
          useMobileNativePlayer: false,
          mobileSeekbarMinWidth: 500,
          openFsOnPlay: true,
          mediaEndAction: 'rewind',
          playlistPosition: 'vb',
          combinePlayerRatio: false,
          playlistScrollType: 'perfect-scrollbar',
          playlistOpened: false,
          showControlsBeforeStart: false,
          verticalBottomSepearator: 0,
          playlistBottomHeight: 0,
          mediaEndAction:'rewind',
          instanceName: "player1",
          
         playerRatio: 0.5,
          aspectRatio: 2, // Relación 9:16
          activeItem: 0,
          volume: 0.5,
          autoPlay: false,
          randomPlay: false,
          showControlsBeforeStart: true,
        buttonsTop:[
          {
  full: `<a href="https://verisart.com/works/${nombre}" target="_blank" data-tooltip="Certificate" class="mvp-contr-btn mvp-btn-reset my-custom-button">
            <svg viewBox="0 0 512 512">
              <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="400" font-family="Arial" font-weight="bold">V</text>
            </svg>
          </a>`,    
}
,
        {
  full: `<a href="https://www.instagram.com/${videoData.instagram}" target="_blank" data-tooltip="Artist's Instagram" class="mvp-contr-btn mvp-btn-reset my-other-button">
            <svg viewBox="0 0 448 512">
              <path d="M224,202.66A53.34,53.34,0,1,0,277.34,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.39-30.39C278.58,117,224.45,117,199.68,117h-1.36c-24.77,0-78.9,0-118.66,14.3A54,54,0,0,0,49.26,161.29C35,201.05,35,255.18,35,279.95v1.36c0,24.77,0,78.9,14.3,118.66a54,54,0,0,0,30.39,30.39c39.76,14.3,93.89,14.3,118.66,14.3h1.36c24.77,0,78.9,0,118.66-14.3a54,54,0,0,0,30.39-30.39C413,359.21,413,305.08,413,280.31v-1.36C413,255.18,413,201.05,348.71,161.29ZM224,338a82,82,0,1,1,82-82A82,82,0,0,1,224,338Zm85.6-134.4a19.2,19.2,0,1,1,19.2-19.2A19.21,19.21,0,0,1,309.6,203.6ZM398.8,314.61c-11.58,39.08-40.74,68.24-79.82,79.82-36.61,12.5-105.19,12.5-141.8,0-39.08-11.58-68.24-40.74-79.82-79.82-12.5-36.61-12.5-105.19,0-141.8C128.75,133.73,157.91,104.57,197,93c36.61-12.5,105.19-12.5,141.8,0,39.08,11.58,68.24,40.74,79.82,79.82,12.5,36.61,12.5,105.19,0,141.8Z" />
            </svg>
          </a>`,
}

],
          elementsVisibilityArr: [
            { width: 6000, elements: ['play', 'fullscreen', 'settings', 'volume'] }
            
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


    
    return (
  
  

      


       
  <div className="playlist-video">

{/* <div style={{ display: "flex", justifyContent: "center"}}>
          <a href={`https://www.instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer">
                <img src={ig} alt="Ver en Instagram" style={{ width: "50px", height: "50px", borderRadius: "13px" }} />
          </a>
           <a href={`https://verisart.com/works/${nombre}`} target="_blank" rel="noopener noreferrer">
                <img src={ver} alt="Verisart" style={{ width: "50px", height: "50px", borderRadius: "13px" }} />
           </a>
</div>  */}
    
    <div id="wrapper">


        <div 
          className="mvp-playlist-item" 
          data-type="gdrive_folder" 
          data-path={videoPath} // Asigna videoPath aquí 
          data-download="media/video/01.mp4" 
          data-share="http://www.google.com" 
          data-thumb="media/video/thumb/01.jpg" 
          data-title="Video title goes here" 
          data-description="Self hosted video. Commodo vitae, tempor eu, urna eu mi hendrerit. Maecenas eu erat condimentum."
        >

          

          <div className="mvp-subtitles">
            <div data-label="English" data-src={sub} data-default></div>
            <div data-label="Spanish" data-src={subdos}></div>
            <div data-label="Portuguese" data-src={subtres}></div>
          </div>
        </div>



        </div>
     

       
    </div>

 

      
  
  );
};


export default VideoPlayer;
