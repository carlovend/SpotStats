import React from 'react';
import './DettagliArtista.css';

const DettagliArtista = ({ artist, onClose }) => {
    if (!artist) return null;
    let genres = artist.genres.replace(/[\[\]']+/g,'').replace(/, /g, ',');

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <img src={artist.image_url} alt="Artist image" className="modal-image"/>
                <div className="modal-details">
                    <h2 className="modal-title">{artist.name}</h2>
                    <div className="modal-info">
                        <p><span>Followers:</span> {artist.followers}</p>
                        <p><span>Genres:</span> {genres}</p>
                        <p><span>Popularity:</span> {artist.popularity}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DettagliArtista;