import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import VioletApi from "../api/api";
import UserContext from "../auth/UserContext";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";



// eslint-disable-next-line


/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally a simple <Alert>, but
 * you can opt-in to our fancy limited-time-display message hook,
 * `useTimedMessage`, but switching the lines below.
 *
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */

function PlaylistFormEdit() {

    let history = useHistory()

    const { currentUser } = useContext(UserContext);

    const {id} = useParams()

    let currindex = 0


    /** Id search on playlists object using for loop */

    for(let i = 0; i < currentUser.playlists.length; i++){


        if (currentUser.playlists[i].id == id ){

            currindex = i
        }

    }


    const [playlists, setPlaylists] = useState(currentUser.playlists[currindex]);


    const [formData, setFormData] = useState({
        title: playlists.title,
        description: playlists.description
    });


    const [formErrors, setFormErrors] = useState([]);

    // switch to use our fancy limited-time-display message hook
    const [saveConfirmed, setSaveConfirmed] = useState(false);
    // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()



    /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

    async function handleSubmit(evt) {
    evt.preventDefault();

    let playlistData = {
        title: formData.title,
        description: formData.description,
    };

    try {
        await VioletApi.savePlaylist(id, playlistData);
    } catch (errors) {
        debugger;
        setFormErrors(errors);
        return;
    }

    setSaveConfirmed(true);
    history.push(`/playlists/${id}`)

    }

  /** Handle form data changing */
    function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
      <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4 ProfileForm">
        <h3>Update Playlist</h3>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Title</label>
                <input
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <input
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                {saveConfirmed
                    ?
                    <Alert type="success" messages={["Updated successfully."]} />
                    : null}

                <button
                    className="btn btn-primary btn-block mt-4"
                    onClick={handleSubmit}
                >
                Save Changes
                </button>
            </form>
            </div>
            </div>
        </div>
    );
}

export default PlaylistFormEdit;
