import React, { useEffect, useState } from 'react';
import './HomePage.css';


const InsertPage = () => {
    const [songName, setSongName] = useState('');
    const [artist, setArtist] = useState('');
    const [streams, setStreams] = useState(0);
    const [genre, setGenre] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:5010/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": songName,
                "artist_id": artist,
                "genre": artist,
                "highest_position": 5,
                "weeks_on_chart": 12,
                "streams": streams,
                "release_date": "2023-08-01",
                "popularity": 85,
                "key": "C"
            })
        })
    };


    return(
        <div className="homepage">
            <div className="header">
                <h1>Add a new song</h1>
            </div>

            <div className="container-form-ins">
                <div className="insertForm">
                    <div className="container-nomi-form">
                        <input placeholder="Song name" type="text" name="songName" onChange={(e) => setSongName(e.target.value)}/>
                        <input placeholder="Artist name" type="text" name="artistName" onChange={(e) => setArtist(e.target.value)}/>
                    </div>

                    <div className="container-nomi-form">
                        <div>
                            <span>Number of Streams:</span>
                            <input type="number" id="streams" name="streams" className="select-ordinamento-looking-new" onChange={(e) => setStreams(e.target.value)}/>
                        </div>

                        <div>
                            <span>Genre:</span>
                            <select name="genre" className="select-ordinamento-looking-new" onChange={(e) => setGenre(e.target.value)}>
                                <option value="pop">Pop</option>
                                <option value="rock">Rock</option>
                                <option value="hiphop">Hip-Hop</option>
                                <option value="jazz">Jazz</option>
                                <option value="classical">Classical</option>
                            </select>
                        </div>
                    </div>

                    <div className="container-bottone">
                        <button className="submit-button" onClick={handleSubmit}>Invia</button>
                    </div>

                </div>

            </div>


        </div>
    );
}

export default InsertPage;