import React, { useEffect, useState } from 'react';
import './LookingForPage.css';
import SongCard from "../components/SongCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons";  // Assicurati che il percorso sia corretto

function LookingForPage() {
    const [genre, setGenre] = useState('');
    const [numberStreams, setNumberStreams] = useState(0);
    const [results, setResults] = useState([]);
    const [filter, setFilter] = useState('gt');

    const fetchSongs = () => {
        fetch('http://127.0.0.1:5010/query/looking_for', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome_artista: genre,
                num_streams: numberStreams,
                filtro: filter
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
      .then(d => {
          console.log(d)
        setResults(d);
      })
      .catch(error => {
          alert("errore in d")
        console.error('There was an error fetching the popular songs!', error);
      });
    }

    return (
        <div className="homepage">
            <div className="lf-search-page">
                <div className="header">
                    <h1><FontAwesomeIcon icon={faMusic}/> Looking For Page </h1>
                </div>
                <div className="lf-container-search-bar">
                    <input
                        className="barra-ricerca"
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        placeholder="Artista"
                    />

                        <select className="select-ordinamento-looking" value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="gt">Greater Than</option>
                            <option value="lt">Less Than</option>
                        </select>
                        <input
                            className="barra-ricerca"
                            type="number"
                            value={numberStreams}
                            onChange={(e) => setNumberStreams(e.target.value)}
                            placeholder="Number of Streams"
                        />

                    <button onClick={fetchSongs} className="submit-button-home">Search</button>
                </div>
                <div className="results">
                    {results.length === 0 ? (
                        <p>No results found</p>
                    ) : (
                        <div className="song-list">
                            {results.map(r => (
                                <div className="song-card">
                                <div className="song-info">
                                    <img className="artist-image" src={r.image_url} alt="Artist image"/>
                                    <h2 className="song-name">{r.name}</h2>
                                    <p className="song-artist">{r.artist_id}</p>
                                    <p className="song-position">Highest
                                        Position: {r.highest_position}</p>
                                </div>
                                </div>
                            ))}
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
}

export default LookingForPage;