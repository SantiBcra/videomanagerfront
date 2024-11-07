import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sub from "./media/subtitles/sintel-en.vtt";
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
          useMobileNativePlayer: false,
          // mobileSeekbarMinWidth: 500,
          embedSrc: "0",
          openFsOnPlay: false,
          mediaEndAction: 'rewind',
          playlistPosition: 'vb',
          combinePlayerRatio: false,
          // playlistScrollType: 'perfect-scrollbar',
          playlistOpened: false,
          showControlsBeforeStart: false,
          verticalBottomSepearator: 0,
          playlistBottomHeight: 0,
          instanceName: "player1",
          activePlaylist: ".playlist-video:first-child",
         playerRatio: 0.45,
          aspectRatio: 2, // Relación 9:16
          activeItem: 0,
          volume: 0.5,
          autoPlay: true,
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


    
    return (
  
     <>

       <div id="an1" class="mvp-annotation" data-show="3" data-hide="6">
          <a href={`https://www.instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer">
        <img src={ig} alt="Ver en Instagram" style={{ width: "50px", height: "50px", borderRadius: "13px" }} />
      </a>
      <a href={`https://verisart.com/works/${nombre}`} target="_blank" rel="noopener noreferrer">
        <img src={ver} alt="Verisart" style={{ width: "50px", height: "50px", borderRadius: "13px" }} />
      </a>
        </div>  


       
  <div className="playlist-video">
    
    <div id="wrapper">

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











<div class="mvp-annotation-section">
        
        <div id="an1" class="mvp-annotation" data-show data-hide>
            <span>This is a popup text visible through the whole video. Lorem ipsum dolor sit amet. Link <a href="http://www.google.com" target="_blank">here</a></span>
            
        </div> 

        <div id="an2" class="mvp-annotation" data-show="5" data-hide="15">
            <div class="an2-wrap">
                <a href="http://www.google.com" target="_blank"><img src="data/ad-placeholder.jpg" alt=""/></a>
                <div class="an2-title">Unlimited space</div>
                <div class="an2-desc">Your advertizing space goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div> 
            </div> 
            <div class="mvp-annotation-close" title="Close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>
            </div>
        </div>   

        <div id="an3" class="mvp-annotation" data-show="20" data-hide="30">
            <a href="http://www.google.com" target="_blank"><span>This popup is a link and cannot be closed.</span></a>
        </div>

    </div>






          
          <div className="mvp-subtitles">
            <div data-label="English" data-src={sub} data-default></div>
{/*             <div data-label="Spanish" data-src="/subtitles/sintel-es.vtt"></div> */}
          </div>
        </div>
      </div>
        

       
    </div>

 

      </>
  
  );
};


export default VideoPlayer;
