import React from "react";

class ArtistCard extends React.Component {
    render() {
        const { artist, onClick } = this.props;
        return <div className="song-card" onClick={onClick}>
            <img className="artist-image" src={this.props.artist.image_url} alt="Artist image"/>
            <div className="song-info">
                <h2 className="song-name">{this.props.artist.name}</h2>
                <p className="song-position">Followers Number: {this.props.artist.followers}</p>
            </div>
        </div>;
    }
}

export default ArtistCard;