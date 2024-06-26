from pymongo import MongoClient
import pymongo

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
    results = list(artists_collection.find().sort("Followers", pymongo.DESCENDING).limit(50))
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
    print(results)  # Stampa i risultati per debug o verifica
    return results



