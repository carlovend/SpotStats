# SpotStats
SpotifyStats is built with the core idea of enabling users to perform detailed inquiries into a rich dataset of Spotify’s top tracks. Our platform is tailored to meet the needs of music enthusiasts, data analysts, and industry professionals who seek insights into musical trends and artist popularity.

This project is part of our exam **Databases 2** in our Ms.C. in Computer Science at University of Salerno.

## Features
SpotifyStats offers a comprehensive set of features to enhance user experience and data interaction:

- Track Search: Users can search for songs by name to find specific tracks in the dataset.
- Artist Search: This feature allows users to look up songs by artist names.
- Most Followed Artists: Discover the top 50 most followed artists on Spotify, showcasing the artists’ popularity and fan base.
- Most Streamed Songs: Get insights into the most streamed songs on Spotify, highlighting which tracks are resonating the most with global audiences.
- Looking for Queries: Execute parametric queries to delve deeper into the dataset, allowing for customized searches and data exploration.

Our platform also integrates a robust **data engineering pipeline** alongside advanced data visualization tools. These enhancements are designed to improve the usability of the dataset, providing clear and actionable insights through graphical representations of data trends and metrics.

## Dataset

The SpotifyStats database includes all tracks that have appeared in the Spotify Global Top 200 Weekly charts during the years 2020 and 2021. This comprehensive dataset serves as the backbone of our application, offering a snapshot of musical preferences and streaming trends over these years.

For more details on the dataset, visit the following link: [Spotify Top 200 Charts 2020-2021](https://www.kaggle.com/datasets/sashankpillai/spotify-top-200-charts-20202021).



## Installation and Usage
1. Create a virtual environment (optional but recommended)
```bash 
    python -m venv env

    source env/bin/asctivate # macOS/Linux
    .\env\Scripts\activate    # Windows
```
2. Install the required packages
```bash 
    pip install -r requirements.txt
```
3. Run our runner
```bash 
    python runner.py
```

## Authors
- Leopoldo Todisco 
- Carlo Venditto