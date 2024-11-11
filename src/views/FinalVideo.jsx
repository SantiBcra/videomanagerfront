import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sub from "./media/subtitles/sintel-en.vtt";
import subdos from "./media/subtitles/sintel-es.vtt";
import subtres from "./media/subtitles/sintel-pr.vtt";
import ig from "../../public/ig.png"
import ver from "../../public/ver.jpg"
import './js/new'
import './js/share_manager'
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
          preload: 'auto',
          useMobileNativePlayer: false,
          // skin: "aviva",
          useBlob:true,
          mobileSeekbarMinWidth: 500,
          embedSrc: "0",
          openFsOnPlay: true,
          mediaEndAction: 'rewind',
          playlistPosition: 'vb',
          combinePlayerRatio: false,
          playlistScrollType: 'perfect-scrollbar',
          playlistOpened: false,
          showControlsBeforeStart: false,
          verticalBottomSepearator: 0,
          playlistBottomHeight: 0,
          instanceName: "player1",
          activePlaylist: ".playlist-video:first-child",
         playerRatio: 0.5,
          aspectRatio: 2, // Relación 9:16
          activeItem: 0,
          volume: 0.5,
          autoPlay: false,
          randomPlay: false,
          showControlsBeforeStart: true,
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
    <a href="https://google.com" target="_blank" data-tooltip="I am a custom button" class="mvp-contr-btn mvp-btn-reset my-custom-button"><svg viewBox="0 0 512 512"><path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/></svg></a>

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
