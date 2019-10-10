import React from "react";

import "./Player.css";
import play from "./images/play.svg";
import stop from "./images/stop.svg";

class Player extends React.Component {
	state = { player: null, playing: false };

	onYouTubePlayerAPIReady = () => {
		this.state.player = new YT.Player("player-container", {
			events: {
				"onReady": this.playerLoaded
			}
		});
	};

	playerLoaded = () => {
		console.log("loaded now");
	};

	renderControls = () => {
		if (!this.state.playing) {
			return (
				<img
					src={play}
					alt="Play"
					className="icon icon-play large-icon"
					onClick={this.playSong}
				/>
			);
		}
		return (
				<img
					src={stop}
					alt="Stop"
					className="icon icon-stop large-icon"
					onClick={this.stopSong}
				/>
			);
	};

	// When player is loaded completely
	playerLoaded = () => {};

	// Play button clicked
	playSong = () => {
		this.state.player.playVideo();
		setTimeout(() => {
			this.state.player.setPlaybackQuality("tiny");
		}, 8000);
		this.setState({ playing: true });
	};

	// Stop button clicked
	stopSong = () => {
		this.state.player.stopVideo();
		this.setState({ playing: false });
	};

	render() {

		if (this.props.song) {
			return (
				<div className="player">
					<div>{this.props.song.snippet.title}</div>

					<div className="player-controls">
						{this.renderControls()}
					</div>

					<iframe
						id="player-container"
						width="640"
						height="360"
						src={`https://www.youtube.com/embed/${this.props.song.id.videoId}?enablejsapi=1&origin=http://106.207.200.115`}
						onLoad={this.onYouTubePlayerAPIReady}
					></iframe>
				</div>
			);
		} else {
			return (
				<div className="player">
					<div>No song selected</div>
				</div>
			);
		}
	}
}

export default Player;
