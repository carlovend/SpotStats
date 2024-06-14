import pandas as pd
import os

package_path = os.path.dirname(__file__)
root_path = os.path.dirname(package_path)
original_dataset_path = os.path.join(root_path, 'dataset/spotify_dataset.csv')

dataset = pd.read_csv(original_dataset_path)
print(f"INITIAL SHAPE: {dataset.shape}")
dataset.reset_index(drop=True, inplace=True)
dataset.dropna() # drop null values

pd.DataFrame(dataset).to_csv(os.path.join(root_path, 'dataset/clean_dataset.csv'))


