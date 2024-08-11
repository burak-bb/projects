import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import VioletApi from "../api/api";
import UserContext from "../auth/UserContext";
import { useHistory } from "react-router-dom";


import "./PlaylistForm.css"


/** Playlist adding form.  */

function PlaylistForm() {
    const { currentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
    title: "",
    user_username: currentUser.username,
    });
    const [formErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
    const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

let history = useHistory()

    async function handleSubmit(evt) {
    evt.preventDefault();

    let profileData = {
        title: formData.title,
        user_username: currentUser.username,
        description: formData.description,

    };




    try {
        await VioletApi.createPlaylist(profileData);

        history.push("/");
    } catch (errors) {
        debugger;
        setFormErrors(errors);
        return;
    }

    setFormErrors([]);
    setSaveConfirmed(true);
    window.location.reload()

    // trigger reloading of user information throughout the site
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
        <h3>New Playlist</h3>
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

export default PlaylistForm;