import React, {useEffect, useState} from 'react';
import './SearchPage.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons";
import ArtistCard from "../components/ArtistCard";

const TrendingArtistsPage = () => {
const [results, setResults] = useState([]);
    const [filtro, setFiltro] = useState("Artists")

    useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = () => {
      if(filtro === "Artists") {
        fetch('http://127.0.0.1:5010/query/find_most_followed_artists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then(data => {
        setResults( data)
      })
      .catch(error => {
        console.error('There was an error fetching the popular songs!', error);
      });
    }
  }

return (
    <div className="homepage">
        <div className="header">
            <h1><FontAwesomeIcon icon={faMusic}/> Trending Artists </h1>
        </div>
        <div className="results">
            {results.length === 0 ? (
                <p>No results found</p>
            ) : (
                <div className="song-list">
                    {results.map(r => (
                        <ArtistCard artist={r}/>
                    ))}
                </div>
                )
            }
        </div>
    </div>
);
};

export default TrendingArtistsPage;
