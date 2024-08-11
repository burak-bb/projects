import React, { useState} from "react";
import Alert from "../common/Alert";
import VioletApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";

import { useHistory, useParams } from "react-router-dom";


/** Playlist adding form.  */

function SongForm() {

    
    const { id } = useParams();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
      title: "",
      artist: "",
      album: "",
      url: "",
      playlist_id: id
    });
    const [formErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
    const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

let history = useHistory()


    async function converttomp3(url){


      let convertedUrl = await VioletApi.convertUrl({url})

      

      console.log( convertedUrl, "This is the converted url")

      return convertedUrl

    }

    async function handleSubmit(evt) {

    setLoading(true)
    evt.preventDefault();

    let songData = {
        title: formData.title,
        artist: formData.artist || "Unknown",
        album: formData.album || 314,
        url: await converttomp3(formData.url),
        playlist_id: parseInt(formData.playlist_id),

    };




    try {
        let result = await VioletApi.addSong(songData);
        setLoading(false)

        console.log(result, "This is the song added result")

        history.push(`/playlists/${id}`);
    } catch (errors) {
        debugger;
        setFormErrors(errors);
        return;
    }

    setFormErrors([]);
    setSaveConfirmed(true);

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

  if(!loading){
  return (
    
      <div className="col-md-8 col-lg-5 offset-md-3 offset-lg-4 ProfileForm">
        <h3>New Song</h3>
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
                    placeholder="Required"
                />
              </div>

              <div className="form-group">
                <label>Artist</label>
                <input
                    name="artist"
                    className="form-control"
                    value={formData.artist}
                    onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Album:</label>
                <input
                    name="album"
                    className="form-control"
                    value={formData.album}
                    onChange={handleChange}
                    
                />
              </div>

              <div className="form-group">
                <label>Url:</label>
                <input
                    name="url"
                    className="form-control"
                    value={formData.url}
                    onChange={handleChange}
                    placeholder="(Required) Youtube Link"
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
} else return (<LoadingSpinner></LoadingSpinner>)
}

export default SongForm;