import pandas as pd
from pymongo import MongoClient

# Leggi il file CSV
df = pd.read_csv('/Users/carlovenditto/Desktop/BD2PROGETTO/SpotStats/dataset/clean_dataset.csv')

# Crea una connessione al tuo database MongoDB
client = MongoClient('mongodb://localhost:27017/')

# Seleziona il database e la collezione
db = client['SpotyStats']
collection = db['Stats']

# Converte il DataFrame in un dizionario
data = df.to_dict('records')

# Inserisci il dizionario nel database MongoDB
collection.insert_many(data)