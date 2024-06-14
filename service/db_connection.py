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
collection = db['Stats']

# Converte il DataFrame in un dizionario
data = df.to_dict('records')

# Inserisci il dizionario nel database MongoDB
collection.insert_many(data)