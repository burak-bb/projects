import axios from "axios";

const BASE_URL = "https://violet-backend.onrender.com";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class VioletApi {

  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${VioletApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  // USER ROUTES //
  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }


 /** Get token for login from username, password. */

  static async login(data) {
  let res = await this.request(`auth/token`, data, "post");
  return res.token;
}

/** Signup for site. */

static async signup(data) {
  let res = await this.request(`auth/register`, data, "post");
  return res.token;
}

/** Save user profile page. */

static async saveProfile(username, data) {
  let res = await this.request(`users/${username}`, data, "patch");
  return res.user;
}



// PLAYLIST ROUTES //

  /** Get playlists (filtered by name if not undefined) */

  static async getPlaylists(name) {
    let res = await this.request("playlists", { name });
    return res;
  }

  /** Create a playlist (filtered by name if not undefined) */

  static async createPlaylist(data) {
    await this.request(`playlists`, data, "post");
  }


  /** Delete a playlist */

    static async deletePlaylist(id) {
      let res = await this.request(`playlists/${id}`, null ,"delete")
      return res;
    }

  /** Get details on one playlist by id. */

  static async getPlaylist(id) {
    let res = await this.request(`playlists/${id}`);
    return res;
  }

  /** Update existing playlist */

  static async savePlaylist(id, data) {
    console.log(DataTransferItemList)
    let res = await this.request(`playlists/${id}`, data, "patch");
    return res;
  }


  // SONG ROUTES //

  /** Get list of songs (filtered by q if not undefined for searches) */

  static async getSongs(q) {
    let res = await this.request(`songs/search/${q}`);
    return res;
  }

    /** Get one song by id */

    static async getsong(id) {
      let res = await this.request(`songs/${id}`);
      return res;
    }

    /** Create a song */

    
    static async addSong(data) {
      let res = await this.request("songs", data, "post");
      return res;
    }

    // ** Remove a song from a playlist */


    static async removeSong(id) {
      let res = await this.request(`songs/${id}`, null, "delete");
      return res;
    }
    
    /** Convert a youtube link to an mp3 song */

    
    static async convertUrl(data) {
      console.log (data, "This is the data going to the request")
      let res = await this.request("convert/", data );
      return res ;
    }


    // EXPLORE ROUTE //

    static async getSimilarArtist() {

      let res = await this.request("explore/" );
      return res ;
    }


}




export default VioletApi
