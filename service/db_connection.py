import pandas as pd
from pymongo import MongoClient
import os


# find correct dataset path
package_path = os.path.dirname(__file__)
root_path = os.path.dirname(package_path)
clean_dataset_path = os.path.join(root_path, 'dataset/clean_dataset.csv')

df = pd.read_csv(clean_dataset_path)

# Connetti al server MongoDB
client = MongoClient('mongodb://localhost:27017/')

# Seleziona il database e la collezione
db = client['SpotyStats']
songs_collection = db['Songs']
artists_collection = db['Artists']

# Funzione per convertire i dati in documenti per MongoDB
def create_documents(df):
    songs = []
    artists = {}

    for _, row in df.iterrows():
        # Creazione del documento per la canzone
        song = {
            "song_id": row["Song ID"],
            "name": row["Song Name"],
            "artist_id": row["Artist"],
            "highest_position": row["Highest Charting Position"],
            "weeks_on_chart": row["Number of Times Charted"],
            "streams": int(row["Streams"].replace(',', '')),
            "release_date": row["Release Date"],
            "popularity": row["Popularity"],
            "key": row["Chord"],
        }
        songs.append(song)

        # Creazione del documento per l'artista se non già presente
        if row["Artist"] not in artists:
            artists[row["Artist"]] = {
                "artist_id": row["Artist"],
                "name": row["Artist"],
                "followers": row["Artist Followers"],
                "genres": row["Genre"]  # Convertire la stringa di generi in una lista
            }

    return songs, list(artists.values())


# Creare i documenti per le collezioni
songs, artists = create_documents(df)

# Inserire i documenti nelle collezioni
songs_collection.insert_many(songs)
artists_collection.insert_many(artists)

print("Documenti inseriti con successo!")
