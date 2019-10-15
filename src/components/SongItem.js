import React from "react";

import "./SongItem.css";
import play from "./images/play.svg";

class SongItem extends React.Component{
	render() {
		return (
			<div
				className={`song-item ${this.props.classes}`}
				onClick={event => {
					this.setState();
					this.props.onSongSelect(this.props.song);
				}}
			>
				<img src={play} alt="Play" className="light-icon icon-play" />
				<div className="song-details-container">
					<div className="song-title">
						{(this.props.song.snippet.title).toLowerCase()}
					</div>
					<div className="song-channel">
						{this.props.song.snippet.channelTitle}
					</div>
				</div>
			</div>
		);
	}
}

export default SongItem;
