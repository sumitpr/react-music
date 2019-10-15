import React from "react";

import "./Player.css";
import play from "./images/play.svg";
import stop from "./images/stop.svg";
import pause from "./images/pause.svg";
import rewind from "./images/rewind.svg";
import forward from "./images/forward.svg";

import Loader from "./Loader";

class Player extends React.Component {
	state = { player: null, playing: false, song: null, paused: false };
	interval = null;

	// INITIALIZE PLAYER - REGISTER IFRAME WITH YOUTUBE API
	onYouTubeIframeAPIReady = () => {
		const player = new YT.Player("player-container", {
			events: {
				onReady: () => {
					console.log("onready called");
					this.setState({ player });
					this.onPlayerReady();
				}
			}
		});
	};

	// PLAYER ACTIONS
	onPlayerReady = () => {
		if (this.state.song === null) {
			this.setState({ playing: false });
		}
		console.log("player ready");
		this.state.player.setPlaybackQuality("tiny");
	};

	playSong = () => {
		this.state.player.playVideo();
		this.setState({ playing: true, paused: false });
	};

	pauseSong = () => {
		this.state.player.pauseVideo();
		this.setState({ paused: true });
	};

	stopSong = () => {
		this.state.player.stopVideo();
		this.setState({ playing: false });
		clearInterval(this.interval);
	};

	rewindSong = () => {
		const currentTime = this.state.player.getCurrentTime();
		this.state.player.seekTo(currentTime - 10, true);
	};

	forwardSong = () => {
		const currentTime = this.state.player.getCurrentTime();
		this.state.player.seekTo(currentTime + 10, true);
	}

	// RENDER PLAYER CONTROLS
	renderPlayerControls = () => {
		clearInterval(this.interval);

		// Loading
		if (!this.state.player) {
			return (
				<div className="player-controls">
					<Loader loading="true" theme="dark" />
				</div>
			);
		}

		// Play button only
		if (!this.state.playing) {
			return (
				<div className="player-controls">
					<img
						src={play}
						className="icon large-icon"
						onClick={this.playSong}
					/>
				</div>
			);
		}

		// Pause and stop buttons
		if (this.state.playing) {

			// IF PAUSED RETURN PLAY AND STOP BUTTONS ONLY
			if (this.state.paused) {
				return (
					<div className="player-controls">
						<img
							src={play}
							className="icon large-icon"
							onClick={this.playSong}
						/>
						<img
							src={stop}
							className="icon large-icon"
							onClick={this.stopSong}
						/>
					</div>
				);
			}

			// IF NOT PAUSED RETURN PAUSE, STOP AND REWIND FORWARD BUTTONS
			return (
				<div className="player-controls">
					<img
						src={rewind}
						className="icon medium-icon"
						onClick={this.rewindSong}
					/>
					<img
						src={pause}
						className="icon large-icon"
						onClick={this.pauseSong}
					/>
					<img
						src={stop}
						className="icon large-icon"
						onClick={this.stopSong}
					/>
					<img
						src={forward}
						className="icon medium-icon"
						onClick={this.forwardSong}
					/>
				</div>
			);
		}

		return <div className="player-controls">loading</div>;
	};

	componentDidUpdate() {
		if (this.state.playing) {
			this.interval = setInterval(() => {
				this.state.player.setPlaybackQuality("tiny");
				console.log(this.state.player.getPlaybackQuality());
			}, 10000);
		}
	}

	render() {
		if (this.props.song) {
			return (
				<div className="player">
					{this.renderPlayerControls()}
					<iframe
						id="player-container"
						height="300"
						width="600"
						src={`https://www.youtube.com/embed/${this.props.song.id.videoId}?enablejsapi=1`}
						allow="autoplay"
						onLoad={() => {
							this.onYouTubeIframeAPIReady();
						}}
					></iframe>
				</div>
			);
		}
		return (
			<div className="player">
				<div className="player-controls">empty playlist</div>
			</div>
		);
	}
}

export default Player;
