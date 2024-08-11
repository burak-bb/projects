import React, { useState, useEffect, useRef } from "react";
import "./SongCard.css";
import { faCircleInfo, faSquareMinus, faSquarePlus, faCirclePlay, faCirclePause} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VioletApi from "../api/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import ReactAudioPlayer from 'react-audio-player'




/** Show information about playlist - songs and has playablilty.
 * Song card can add song / remove song from a playlist
 */

function SongCard({ id, title, artist, album, url, added, playlist_id}) {

  let history = useHistory()
  const [info, setInfo] = useState(false)
  const [play, setPlay] = useState(true)

  function toggle(){

    if (info){
      setInfo(false)
    }
    else (setInfo(true))

  }


  async function addNewSong(){
    let data = {

      title: title,
      artist: artist,
      album: album,
      url: url,
      playlist_id: parseInt(playlist_id)

    }
    try{
    let res = await VioletApi.addSong(data)
    window.location.reload();
    history.push(`/playlists/${playlist_id}`)
    } catch(e){

      console.log(e)

    }

  }

  async function removeSong(){
    try{
      let result = await VioletApi.removeSong(id)
      window.location.reload();
    }catch(e){
      console.log(e)
    }
  }


  // pass the event to the handler
  const handlePlay = e =>{

      // get all audio elements and stop them all
      const allAudios = document.querySelectorAll('audio');
      const allPauses = document.querySelectorAll('.pause-circle');

      allPauses.forEach(pause => pause.click())

      allAudios.forEach(audioEl => {
          audioEl.pause()
          audioEl.currentTime=0;
      })

      // get the clicked audio element and play
      const thisAudio = e.target.closest('div').querySelector('audio');
  
      thisAudio.play()
      setPlay(false)
  }

  const handlePause = e => {
    const thisAudio = e.target.closest('div').querySelector('audio');
    thisAudio.pause()
    setPlay(true)
  }

  return (
      <div className="SongCard card">
        <div className="card-body">
          <h6 className="card-title">{title} {play ? <button className="play-circle" onClick={handlePlay}><FontAwesomeIcon icon={faCirclePlay}/></button> : <button className="pause-circle" onClick={handlePause}><FontAwesomeIcon icon={faCirclePause}/></button>} <button className="play-circle" onClick={toggle}><FontAwesomeIcon icon={faCircleInfo}/></button> {added ? <button onClick={removeSong}><FontAwesomeIcon className="delete-icon" icon={faSquareMinus}/></button> : <button onClick={addNewSong}><FontAwesomeIcon className="add-icon" icon={faSquarePlus}/></button>}</h6>
          <ReactAudioPlayer id={url} src={url} name="media"/>
          {info ?
            <p><small>Artist: {artist} &nbsp; &nbsp; Album: {album || null}</small></p>: null
          }

        </div>
      </div>
  );
}




export default SongCard;
