from pymongo import MongoClient
import pymongo
import data_engineering.utils as utils
import datetime

client = MongoClient('mongodb://localhost:27017/')
db = client['SpotyStats']
songs_collection = db['Songs']
artists_collection = db['Artists']


# query ricerca canzone per nome
def find_song_by_name(search):
    query = songs_collection.find({"name": {'$regex': ".*" + search + ".*"}})
    return list(query)


# query ricerca per artista
def find_song_by_artist(artista: str):
    query = artists_collection.find({"name": {'$regex': ".*" + artista + ".*"}})
    return list(query)


# query per mosto followed artist
def find_top_50_artists():
    pipeline = [
        {
            "$sort": {
                "Followers": -1
            }
        },
        {
            "$limit": 50
        }
    ]

    results = list(artists_collection.aggregate(pipeline))

    return results


def find_most_streamed_song():
    results = (songs_collection.find().sort("Streams", direction=1).limit(50))

    return list(results)


# query della home
def find_popular_songs(filtro_ordinamento="popularity"):
    """

    :param filtro_ordinamento: se non viene passato vale già popularity
    :return: lista delle canzoni con popularity > 75
    """
    direction = pymongo.DESCENDING
    if filtro_ordinamento in ["name", "artist_id", "highest_position"]:
        direction = pymongo.ASCENDING

    filtro_popularity = {"popularity": {"$gt": 75}}
    songs = (songs_collection.find(filtro_popularity).sort(filtro_ordinamento, direction=direction).limit(100))

    return list(songs)


def looking_for_query(filtro, nome_artista, numero_stream):
    regex_pattern = ".*" + nome_artista + ".*"
    comparison_operator = "$gt" if filtro == "gt" else "$lt"

    filtro_streams = {
        "$and": [
            {"artist_id": {"$regex": regex_pattern, "$options": "i"}},  # 'i' per case-insensitive
            {"streams": {comparison_operator: numero_stream}},
        ]
    }

    songs = songs_collection.find(filtro_streams).limit(100)
    results = list(songs)
    print(results)
    return results


def add_to_db(song):
    artist_name = song["artist_id"]

    artist_image = utils.get_artist_image_by_name(artist_name)
    print("OST inserito")

    nuova_canzone = {
        "name": song["name"],
        "artist_id": artist_name,
        "genre": song["genre"],
        "highest_position": song["highest_position"],
        "weeks_on_chart": 12,
        "streams": song["streams"],
        "release_date": "2023-08-01",
        "popularity": 85,
        "key": "C",
        "image_url": artist_image,
    }
    result = songs_collection.insert_one(nuova_canzone)
    print("inserito")

    return result


def remove_song(song_name):
    result = songs_collection.delete_one({"name": song_name})
    return result





