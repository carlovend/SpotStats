import React from 'react';
import './DettagliCanzone.css'; // Assicurati di avere il CSS aggiornato

const DettagliCanzone = ({ song, onClose }) => {
    if (!song) return null; // Se non c'è una canzone, non mostrare nulla

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <img src={song.image_url} alt="Artist image" className="modal-image"/>
                <div className="modal-details">
                    <h2 className="modal-title">{song.name}</h2>
                    <div className="modal-info">
                        <p><span>Artist:</span> {song.artist}</p>
                        <p><span>Highest Position:</span> {song.highest_position}</p>
                        <p><span>Popularity:</span> {song.popularity}</p>
                        <p><span>Release Date:</span> {song.release_date}</p>
                        <p><span>Streams:</span> {song.streams}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DettagliCanzone;