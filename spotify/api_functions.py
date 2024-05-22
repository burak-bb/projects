from flask import session, json
import requests

def_tracks_ids = [
    '5O2P9iiztwhomNh8xkR9lJ',
    '3yHyiUDJdz02FZ6jfUbsmY',
    '7DnAm9FOTWE3cUvso43HhI',
    '4e4fqjx0Izh4svvTef1z7e',
    '228BxWXUYQPJrJYHDLOHkj',
    '2DbV9TSdeGr5FobCFDRzvq',
    '3eh51r6rFWAlGQRlHx9QnQ',
    '0AjmK0Eai4zGrLaJwPvrDp',
    '2aPTvyE09vUCRwVvj0I8WK',
    '7bywjHOc0wSjGGbj04XbVi'
    ]

def_playlists_ids = [
    '37i9dQZF1DXcBWIGoYBM5M',
    '37i9dQZF1DX0XUsuxWHRQd',
    '37i9dQZF1DX10zKzsJ2jva',
    '37i9dQZF1DWTwnEm1IYyoj',
    '37i9dQZF1DWY4xHQp97fN6',
    '37i9dQZF1DWUVpAXiEPK8P',
    '37i9dQZF1DX4sWSpwq3LiO',
    '37i9dQZF1DXcRXFNfZr7Tp',
    '37i9dQZF1DX5hHfOi73rY3',
    '37i9dQZF1DWXRqgorJj26U'
]

def_artists_ids = [
    '06HL4z0CvFAxyc27GXpf02',
    '3TVXtAsR1Inumwj472S9r4',
    '4q3ewBCX7sLwd24euuV69X',
    '1Xyo4u8uXC1ZmMpatF05PJ',
    '6eUKZXaKkcviH0Ku9w2n3V',
    '66CXWjxzNUsdJxJ2JdwvnR',
    '1uNFoZAHBGtllmzznpCI3s',
    '7dGJo4pcD2V6oG8kP0tJRR',
    '246dkjvS1zLTtiykXe5h60',
    '6qqNVTkY8uBg9cP3Jd7DAH'
]
def track_info(id):
    url = f"https://open.spotify.com/track/{id}"
    oembed_url = f"https://open.spotify.com/oembed?url={url}"
    response = requests.get(oembed_url)
    data = response.json()
    return data['thumbnail_url']

def playlist_info(id):
    url = f"https://open.spotify.com/playlist/{id}"
    oembed_url = f"https://open.spotify.com/oembed?url={url}"
    response = requests.get(oembed_url)
    data = response.json()
    return data['thumbnail_url']

def artist_info(id):
    url = f"https://open.spotify.com/artist/{id}"
    oembed_url = f"https://open.spotify.com/oembed?url={url}"
    response = requests.get(oembed_url)
    data = response.json()
    return data['thumbnail_url']


class Tracks:
    def __init__(self, t_id, t_name, t_artist, t_image):
        self.t_id = t_id
        self.t_name = t_name
        self.t_artist = t_artist
        self.t_image = t_image
    def __str__(self):
        return f"Track ID: {self.t_id}\nTack Name: {self.t_name}\nTracks Artists: {', '.join(self.t_artist)}\nTrack Image: {self.t_image}"

class Playlists:
    def __init__(self, p_id, p_name, p_description, p_tracks, p_image):
        self.p_id = p_id
        self.p_name = p_name
        self.p_description = p_description
        self.p_tracks = p_tracks
        self.p_image = p_image
    def __str__(self):
        return f"Playlist ID: {self.p_id}\nPlaylist Name: {self.p_name}\nPlaylist Description: {self.p_description}\nPlaylist Tracks: {self.p_tracks}\nPlaylist Image: {self.p_image}"

class Artists:
    def __init__(self, a_id, a_name, a_tracks, a_image):
        self.a_id = a_id
        self.a_name = a_name
        self.a_tracks = a_tracks
        self.a_image = a_image
    def __str__(self):
        return f"Artist ID: {self.a_id}\nArtist Name: {self.a_name}\nArtist Tracks: {self.a_tracks}\nArtist Image: {self.a_image}"


def get_api_token(session):
    def new_token():
        token_url = "https://accounts.spotify.com/api/token"
        request_data = {
            "grant_type": "client_credentials",
            "client_id": "1a98dddb95a343b8bb43b109c752c484",
            "client_secret": "44da454d646a41d4a89b711f83571981"
        }
        headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        response = requests.post(token_url, data=request_data, headers=headers)
        session['api_token'] = response.json()['access_token']
        return (session['api_token'])

    if 'api_token' in session:
        api_url = "https://api.spotify.com/v1/browse/categories"

        headers = {
            'Authorization': f"Bearer {session['api_token']}"
        }
        response = requests.get(api_url, headers=headers)
        if response.status_code == 200:
            return session['api_token']
        else:
            return new_token()
        
    else:
        return new_token()


def track(session, ids=def_tracks_ids):
    api_token = get_api_token(session)

    api_url = f"https://api.spotify.com/v1/tracks?ids={','.join(ids)}"
    headers = {
        'Authorization': f"Bearer {api_token}"
    }
    response = requests.get(api_url, headers=headers)
    data = response.json()
    tracks = []
    for track_data in data['tracks']:
        artists = []
        t_id = track_data['id']
        t_name = track_data['name']
        t_image = track_info(t_id)
        print(t_image)
        for artist in track_data['artists']:
            t_artist = artist['name']
            artists.append(t_artist)
        track = Tracks(t_id=t_id, t_name=t_name, t_artist=", ".join(artists), t_image=t_image)
        tracks.append(track)

    # for track in tracks:
    #     print(track)
    return tracks


def playlist(session, id="0Hm1tCeFv45CJkNeIAtrfF"):
    api_token = get_api_token(session)

    api_url = f"https://api.spotify.com/v1/playlists/{id}"
    headers = {
        'Authorization': f"Bearer {api_token}"
    }
    response = requests.get(api_url, headers=headers)
    data = response.json()
    p_id = data['id']
    p_name = data['name']
    p_description = data['description']
    p_image = playlist_info(p_id)
    tracks = []
    for item in data['tracks']['items']:
        track =  item['track']
        t_id = track['id']
        tracks.append(t_id)
    tracks = list(set(tracks))[:10]
    playlist = Playlists(p_id, p_name, p_description, tracks, p_image)

    # print(playlist)
    return playlist

def artist(session, ids=def_artists_ids):
    api_token = get_api_token(session)
    artists = []

    for artist_id in ids:
        artist_api_url = f"https://api.spotify.com/v1/artists/{artist_id}"
        headers = {
            'Authorization': f"Bearer {api_token}"
        }
        artist_response = requests.get(artist_api_url, headers=headers)
        artist_data = artist_response.json()
                
        a_id = artist_data['id']
        a_name = artist_data['name']
        tracks_api_url = f"https://api.spotify.com/v1/artists/{a_id}/top-tracks"
        tracks_response = requests.get(tracks_api_url, headers=headers)
        tracks_data = tracks_response.json()
        tracks = []
        a_image = artist_info(artist_id)
        for track in tracks_data['tracks']:
            track_id = track['id']
            tracks.append(track_id)
        new_artist = Artists(a_id, a_name, tracks, a_image)
        artists.append(new_artist)
    
    # for artist in artists:
    #     print(artist)
    return artists




