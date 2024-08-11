import React from "react";
import { Switch, Route} from "react-router-dom";
import Homepage from "../homepage/Homepage";


import PlayDetail from "../playlists/PlayDetail";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";
import PlaylistForm from "../playlists/PlaylistForm";
import DeletePlaylist from "../playlists/DeletePlaylist";
import SongForm from "../songs/SongForm";
import PlaylistFormEdit from "../playlists/PlaylistFormEdit";
import Explore from "../explore/Explore";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup }) {
  console.debug(
      "Routes",
      `login=${typeof login}`,
      `register=${typeof register}`,
  );

  return (
      <div className="pt-5">
        <Switch>

          <Route exact path="/">
            <Homepage />
          </Route>

          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>

          <Route exact path="/signup">
            <SignupForm signup={signup} />
          </Route>

          <Route exact path="/explore">
            <Explore/>
          </Route>

          <PrivateRoute exact path="/playlists/new">
            <PlaylistForm />
          </PrivateRoute>

          <PrivateRoute exact path="/playlists/:id">
            <PlayDetail />
          </PrivateRoute>

          <PrivateRoute exact path="/playlist/:id/delete">
            <DeletePlaylist/>
          </PrivateRoute>

          <PrivateRoute exact path="/playlist/:id/addsong">
            <SongForm/>
          </PrivateRoute>

          <PrivateRoute path="/profile">
            <ProfileForm />
          </PrivateRoute>

          <PrivateRoute exact path="/playlist/:id/edit">
          <PlaylistFormEdit/>
          </PrivateRoute>

          <Route path="/*">
            <h1 className="text-warning">404: Page not found please go back</h1> 
          </Route>
        </Switch>
      </div>
  );
}

export default Routes;
