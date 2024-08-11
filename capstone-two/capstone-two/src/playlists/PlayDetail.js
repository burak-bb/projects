import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import VioletApi from "../api/api";
import SongCardList from "../songs/SongCardList"
import SearchForm from "../common/SearchForm"
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PlayDetail.css"


/** Company Playlist Details page.
 *
 * Renders a playlist
 * 
 * Functionality: Add / Search/ Remove Songs and Remove /Edit Playlists
 *
 * Routed at /playlists/:id
 *
 * Routes -> PlayDetail -> SongCardList
 */

function PlayDetail() {
  const { id } = useParams();

  const [searchSongs, setSearchSongs] = useState(null);
  const [playlist, setPlaylist] = useState(null);

// Api call to get playlist and song data

  useEffect(function getPlaylistandSongs() {
    async function getPlaylist() {
      setPlaylist(await VioletApi.getPlaylist(id));
    }

    getPlaylist();
  }, [id]);

  // Function to search songs and load them

  async function search(q) {

  let search = await VioletApi.getSongs(q);
  console.log(search)
  setSearchSongs(search);
  }


 // Playlist doesn't exist if user types in html code or just deleted the playlist and goes back to it

  if (!playlist) return (<><p className="PlayDetail"> Playlist Loading... or Playlist Deleted By User: Refresh Page </p><p><Link to="/" >Go Home</Link></p></>)





  return (
    <div className="container">
    <div className="row align-items-start">
      <div className="PlayDetail col-6">
        <h4 className="PlayDetail title">{playlist.title}</h4>
        <p className="icons">

        {/* Edit the playlist with below functions */}
          
          <Link to={`/playlist/${id}/edit`} className="font-awesome"> <FontAwesomeIcon icon={faEdit}/> </Link>
          
          <Link to={`/playlist/${id}/delete`} className="font-awesome mx-5"><FontAwesomeIcon icon={faTrash}/> </Link>
        
        </p>

        {/* Renders Songs in playlist */}
        
        <p className="PlayDetail description">{playlist.description}</p>
        
        <Link to= {`/playlist/${id}/addsong`}> Add Custom Song </Link>

        <SongCardList songs={playlist.songs.rows} added={true} playlist_id={id} />
  
      </div>


        {/* Search for songs to add on playlist */}
      
      <div className="SearchList col-5">
      <p className="add-songs">Add Songs To Playlist:</p>
      <SearchForm searchFor={search} />
        {searchSongs
            ? (
                <div className="PlayList-list">

                <SongCardList songs={searchSongs.songs} added={false} playlist_id={id}/>
    
                </div>
            ) : (
                <></>
            )}
    </div>
    
    </div>
    </div>
  );
}

export default PlayDetail;
