import spotipy
from spotipy import SpotifyOAuth
import dotenv
import os

dotenv.load_dotenv()

SPOTIPY_CLIENT_ID = os.environ.get('SPOTIPY_CLIENT_ID', "")
SPOTIPY_CLIENT_SECRET = os.environ.get('SPOTIPY_CLIENT_SECRET', "")
SPOTIPY_REDIRECT_URI = os.environ.get('SPOTIPY_REDIRECT_URI', "")
SCOPE = "user-read-playback-state,user-modify-playback-state, user-library-read"
CACHE = '.spotipyoauthcache'
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=SPOTIPY_CLIENT_ID, client_secret=SPOTIPY_CLIENT_SECRET,
                                               redirect_uri=SPOTIPY_REDIRECT_URI, scope=SCOPE))


def split_name(name):
    return name.split(',')[0]

def get_artist_image_by_name(name):
    name = split_name(name)
    results = sp.search(q='artist:' + name, type='artist')

    items = results['artists']['items']
    if len(items) > 0:
        artist = items[0]
        if artist['images'] is None or len(artist['images']) == 0:
            return ""

        link = artist['images'][0]['url']

        return link

