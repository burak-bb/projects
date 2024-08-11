import React, { useState, useContext } from "react";

import UserContext from "../auth/UserContext";
import "./PlayLists.css"

import PlayCard from "./PlayCard";


/** Show page with list of companies.
 *
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * This is routed to at /companies
 *
 * Routes -> { CompanyCard, SearchForm }
 */

function PlayLists() {

  const { currentUser } = useContext(UserContext);
  const [playlists, setPlaylists] = useState(currentUser.playlists);
  

  let i = 0

  function addIndex(num){
    return num + 1
  }

  
  
  return (
      <div className="PlayList col-8 offset-md-2">

        {playlists
            ? (
                <div className="PlayList-list">
                  {playlists.map(c => (
                      <PlayCard
                          key={c.id}
                          title={c.title}
                          id={c.id}
                          order= {addIndex(i)}
                      />
                  ))}
                </div>
            ) : (
                <p className="lead">You don't have any playlists yet</p>
            )}
      </div>
  );
}

export default PlayLists;
