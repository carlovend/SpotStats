import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';
import SongCard from "../components/SongCard";
import DettagliCanzone from "../components/DettagliCanzone";




const HomePage = () => {
    const [songs, setSongs] = useState([]);
    const [filtro, setFiltro] = useState("popularity")
    const [selectedSong, setSelectedSong] = useState(null);

    const handleFiltroChange = (event) => {
      setFiltro(event.target.value);
    }

    const fetchSongs = () => {
      fetch('http://127.0.0.1:5010/query/find_popular_songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "filtro_ordinamento": filtro
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
          console.log(data[0])
        setSongs(data);
      })
      .catch(error => {
        console.error('There was an error fetching the popular songs!', error);
      });
    }

  useEffect(() => {
    fetchSongs();
  }, []);

    const handleSongClick = (song) => {
        setSelectedSong(song); // Imposta la canzone selezionata per mostrare il modal
    };

    const closeDetails = () => {
        setSelectedSong(null); // Chiudi il modal
    };


  return (
      <div className="homepage">
          <div className="header">
              <h1>Top 100 Popular Songs</h1>
          </div>

          <div className="header">

              <h2>Filtro di Ordinamento: </h2>
              <select onChange={handleFiltroChange} className="select-ordinamento">
                  <option value="popularity">Popolarità</option>
                  <option value="name">Nome Canzone</option>
                  <option value="artist_id">Nome Artista</option>
                  <option value="highest_position">Posizione più alta</option>
              </select>
          </div>
          <div className="header">
              <button className="submit-button-home" onClick={fetchSongs}>Submit</button>
</div>
          {songs.length === 0 ? (
              <p className="loading">Loading songs...</p>
          ) : (
              <div className="song-list">
                  {songs.map(song => (
                      console.log(song),
                      <SongCard key={song._id}
                                song={song} onClick={() => handleSongClick(song) }/>
                  ))}
              </div>
          )}
          {selectedSong && <DettagliCanzone  artist={selectedSong.artist}
                                             song={selectedSong} onClose={closeDetails} />}
      </div>
  );
};

export default HomePage;
