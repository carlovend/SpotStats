import React, { useState } from 'react';
import './SearchPage.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    fetch('http://127.0.0.1:5010/query/find_song_by_name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ song_name: query })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setResults(data);
      })
      .catch(error => {
        console.error('There was an error fetching the search results!', error);
      });
  };

  return (
    <div className="search-page">
      <div className="header">
        <h1>Search for a Song</h1>
      </div>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter song name..."
        />
        <button className="submit-button" onClick={handleSearch}>Search</button>
      </div>
      <div className="results">
        {results.length === 0 ? (
          <p>No results found</p>
        ) : (
          results.map(song => (
            <div key={song._id} className="song-card">
              <div className="song-info">
                <h2 className="song-name">{song.name}</h2>
                <p className="song-artist">Artist: {song.artist_id}</p>
                <p className="song-position">Highest Position: {song.highest_position}</p>
                <p className="song-weeks">Weeks on Chart: {song.weeks_on_chart}</p>
                <p className="song-streams">Streams: {song.streams}</p>
                <p className="song-release">Release Date: {new Date(song.release_date).toLocaleDateString()}</p>
                <p className="song-popularity">Popularity: {song.popularity}</p>
                <p className="song-key">Key: {song.key}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
