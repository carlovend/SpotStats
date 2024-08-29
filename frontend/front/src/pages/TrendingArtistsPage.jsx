import React, {useEffect, useState} from 'react';
import './SearchPage.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons";
import ArtistCard from "../components/ArtistCard";
import DettagliArtista from "../components/DettagliArtista";

const TrendingArtistsPage = () => {
const [results, setResults] = useState([]);
const [filtro, setFiltro] = useState("Artists");
const [selectedArtist, setSelectedArtist] = useState(null);

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

const handleArtistClick = (artist) => {
        setSelectedArtist(artist);
    }

    const handleCloseModal = () => {
        setSelectedArtist(null);
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
                        <ArtistCard key={r._id} artist={r} onClick={() => handleArtistClick(r)} />
                    ))}
                </div>
                )
            }
        </div>
        {selectedArtist && (
                <DettagliArtista
                    artist={selectedArtist}
                    onClose={handleCloseModal}
                />
            )}
    </div>
);
};

export default TrendingArtistsPage;
