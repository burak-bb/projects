from flask import Flask, render_template, redirect, session
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, db
from api_functions import *
import requests
import pprint

app = Flask(__name__)

app.config['DEBUG'] = True
app.config['SECRET_KEY'] = "ADIKNCJKLANCOIWNE2NDSDJKNAL"
toolbar = DebugToolbarExtension(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///spotify'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
with app.app_context():
    db.create_all()

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



@app.route("/")
def homepage():
    tracks = track(session)
    playlists = []
    artists= artist(session)
    for playlist_id in def_playlists_ids:
        playlists.append(playlist(session, playlist_id))
    return render_template("base.html",tracks=tracks, playlists=playlists, artists=artists)
    

# @app.route("/track/<int:id>")
# def track_info(id):
#     track(session, id)
#     return render_template(track.html)



if __name__ == "__main__":
    app.run(debug=True)