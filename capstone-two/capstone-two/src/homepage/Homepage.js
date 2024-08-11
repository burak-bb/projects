import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";
import logo from "../static/logo.png"
import homepageLogo from "../static/Logo-Homepage.png"
import PlayLists from "../playlists/PlayLists"



/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);
  
  
  return (
      <div className="Homepage">
        <div className="container text-center">
          {currentUser

              ? 
              <div className="loggedin">
              <h2>
                Welcome! {currentUser.username}

              </h2>


              <div className="playlists">
                <h2>Playlists</h2>
                <PlayLists />


                <img src={homepageLogo} className="homepage-logo" alt="Violet"></img>
              </div>

              </div>
              : (
                  <>
                    <img src={logo} alt="Violet"></img>
                    <p className="lead"> A Better Listening Experience. Join Today! </p>

                    <Link className="btn btn-primary font-weight-bold mr-3"
                          to="/login">
                      Log in
                    </Link>
                    <Link className="btn btn-primary font-weight-bold"
                          to="/signup">
                      Sign up
                    </Link>
                  </>
              )}
        </div>
      </div>
  );
}

export default Homepage;
