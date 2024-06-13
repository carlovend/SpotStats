import pandas as pd

dataset = pd.read_csv("/Users/carlovenditto/Desktop/BD2PROGETTO/SpotStats/dataset/spotify_dataset.csv")
print(f"INITIAL SHAPE: {dataset.shape}")
dataset.reset_index(drop=True, inplace=True)
dataset.dropna() # drop null values

pd.DataFrame(dataset).to_csv("/Users/carlovenditto/Desktop/BD2PROGETTO/SpotStats/dataset/clean_dataset.csv")


