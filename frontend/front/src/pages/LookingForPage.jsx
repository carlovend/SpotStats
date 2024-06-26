import React, {useEffect, useState} from 'react';
import './LookingForPage.css';
import SongCard from "../components/SongCard";  // Assicurati che il percorso sia corretto

function LookingForPage() {
    const [genre, setGenre] = useState('');
    const [numberStreams, setNumberStreams] = useState(0);
    const [results, setResults] = useState([]);
    const [filter, setFilter] = useState('gt');

    useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = () => {
      fetch('http://127.0.0.1:5010/query/looking_for', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
          body:JSON.stringify({
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
      .then(data => {
          console.log(data)
        setResults(data);
      })
      .catch(error => {
        console.error('There was an error fetching the popular songs!', error);
      });
    }


    return (
        <div className="search-page">
            <div className="header">
                <h1>Song Stats Finder</h1>
            </div>
            <div className="container-search-bar">
                <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder="Artista"
                />
                <input
                    type="number"
                    value={numberStreams}
                    onChange={(e) => setNumberStreams(e.target.value)}
                    placeholder="Number of Streams"
                />
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="gt">Greater Than</option>
                    <option value="lt">Less Than</option>
                </select>
                <button onClick={fetchSongs} className="submit-button">Search</button>
            </div>
            <div className="results">

            </div>
        </div>
    );
}

export default LookingForPage;
