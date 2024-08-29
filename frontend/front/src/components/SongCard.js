import React from "react";

class SongCard extends React.Component {

    render() {
        const { song, onClick } = this.props;
        return <div className="song-card" onClick={onClick}>
            <img className="artist-image" src={this.props.song.image_url} alt="Artist image"/>
            <div className="song-info">
                <h2 className="song-name">{this.props.song.name}</h2>
                <p className="song-artist">{this.props.song.artist}</p>
                <p className="song-position">Highest Position: {this.props.song.highest_position}</p>
                <p className="song-popularity">Popularity: {this.props.song.popularity}</p>
            </div>
        </div>;
    }
}

export default SongCard;