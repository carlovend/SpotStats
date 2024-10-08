import React, {useEffect, useState} from 'react';
import './SearchPage.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons";
import ArtistCard from "../components/ArtistCard";
import SongCard from "../components/SongCard";
import DettagliCanzone from "../components/DettagliCanzone";

const TrendingArtistsPage = () => {

const [filtro, setFiltro] = useState("Artists")
const [songs, setSongs] = useState([]);
const [selectedSong, setSelectedSong] = useState(null);

useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = () => {
      fetch('http://127.0.0.1:5010/query/find_popular_songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
          body:JSON.stringify({
            "filtro_ordinamento": "popularity"
          })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
          console.log(data)
        setSongs(data);
      })
      .catch(error => {
        console.error('There was an error fetching the popular songs!', error);
      });
    }
const handleSongClick = (song) => {
        setSelectedSong(song); // Imposta la canzone selezionata per mostrare il modal
    };

    const closeDetails = () => {
        setSelectedSong(null); // Chiudi il modal
    };

return (
    <div className="homepage">
        <div className="header">
            <h1><FontAwesomeIcon icon={faMusic}/> Most Streamed Songs </h1>
        </div>
        <div className="results">
            {songs.length === 0 ? (
                <p>No results found</p>
            ) : (
                <div className="song-list">
                    {songs.map(r => (
                         <SongCard key={r._id} song={r} onClick={() => handleSongClick(r)}/>
                    ))}
                </div>
                )
            }
        </div>
        {selectedSong && <DettagliCanzone song={selectedSong} onClose={closeDetails} />}
    </div>
);
};

export default TrendingArtistsPage;
