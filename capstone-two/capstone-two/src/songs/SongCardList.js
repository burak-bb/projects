import React, {useState, useEffect} from "react";
import SongCard from "./SongCard";

/** Show list of Song cards.
 *
 * Used by both SongList and PlayDetail to list songs. Receives an apply
 * func prop which will be called by SongCard on apply.
 *
 * SongList -> SongCardList -> SongCard
 * PlayDetail -> SongCardList -> SongCard
 *
 */

function SongCardList({ songs, added, playlist_id, limit = songs.length }) {

  let segment = songs.slice(0,limit)


  return (
      <div className="SongCardList">
        {segment.map(song => (
            <SongCard
                key={song.id}
                id={song.id}
                title={song.title}
                artist={song.artist.name || song.artist}
                url ={song.preview || song.url}
                album={song.album.title || song.album || 417}
                added = {added}
                playlist_id = {playlist_id}

            />
          )
        )}
      </div>
  );
}

export default SongCardList;
