import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';

const HomePage = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5010/query/find_popular_songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSongs(data);
      })
      .catch(error => {
        console.error('There was an error fetching the popular songs!', error);
      });
  }, []);

  return (
    <div className="homepage">
      <div className="header">
        <h1><FontAwesomeIcon icon={faMusic} /> Top 100 Popular Songs</h1>
      </div>
      {songs.length === 0 ? (
        <p className="loading">Loading songs...</p>
      ) : (
        <div className="song-list">
          {songs.map(song => (
            <div key={song._id.$oid} className="song-card">
              <div className="song-info">
                <h2 className="song-name">{song.name}</h2>
                <p className="song-artist">{song.artist}</p>
                <p className="song-position">Highest Position: {song.highest_position}</p>
                <p className="song-popularity">Popularity: {song.popularity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
