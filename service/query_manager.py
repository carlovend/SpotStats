from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['SpotyStats']
songs_collection = db['Songs']
artists_collection = db['Artists']


# query ricerca canzone per nome
def find_song_by_name(search):
        query = songs_collection.find({"name": {'$regex': ".*" + search + ".*"}})
        return list(query)


#query ricerca per artista
def find_song_by_artist(artista: str):
    query = artists_collection.find({"name": {'$regex': ".*" + artista + ".*"}})
    return list(query)


#query per mosto followed artist

def find_top_50_artists():
    results = list(artists_collection.find().sort("Followers", -1).limit(50))
    return results


def find_most_streamed_song():
    results = list(songs_collection.find().sort("Streams", -1).limit(50))
    return results

# query della home
def find_popular_songs():
    songs = songs_collection.find()
    popular_songs = [song for song in songs if song[("popularity")] > 75]
    return popular_songs


songs = find_popular_songs()
print(songs)