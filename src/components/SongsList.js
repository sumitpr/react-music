import React from "react";

import SongItem from "./SongItem";
import "./SongsList.css";

class SongsList extends React.Component {
	songs = this.props.songs;

	renderSongs(songs) {
		if (songs.length) {
			return songs.map(song => {
				return (
					<SongItem
						song={song}
						onSongSelect={this.props.onSongSelect}
						key={song.id.videoId}
						classes={
							this.props.selectedSong == song
								? "current-song"
								: ""
						}
					/>
				);
			});
		} else {
			return (
				<div className="center large-text text-light position-top-abs transition-smooth">
					Search for your favourite tracks
				</div>
			);
		}
	}

	render() {
		return (
			<div className="songs-list">
				{this.renderSongs(this.props.songs)}
			</div>
		);
	}
}

export default SongsList;
