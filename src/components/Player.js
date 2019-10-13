import React from "react";

import "./Player.css";
import play from "./images/play.svg";
import stop from "./images/stop.svg";
import Loader from "./Loader";

class Player extends React.Component {
	state = { player: null, playing: false, song: null };
	interval = null;

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

	onPlayerReady = () => {
		if (this.state.song === null) {
			this.setState({ playing: false });
		}
		console.log("player ready");
		this.state.player.setPlaybackQuality("tiny");
		//console.log(this.state.player);
	};

	playSong = () => {
		this.state.player.mute();
		this.state.player.playVideo();
		this.setState({ playing: true });
		
	};

	stopSong = () => {
		this.state.player.stopVideo();
		this.setState({ playing: false });
		clearInterval(this.interval);
	};

	pauseSong = () => {
		this.state.player.pauseVideo();
	};

	renderPlayerControls = () => {
		clearInterval(this.interval);

		if (!this.state.player) {
			return (
				<div className="player-controls">
					<Loader loading="true" theme="dark" />
				</div>
			);
		}

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

		if (this.state.playing) {
			return (
				<div className="player-controls">
					<img
						src={stop}
						className="icon large-icon"
						onClick={this.stopSong}
					/>
				</div>
			);
		}

		return <div className="player-controls">loading</div>;
	};

	componentDidUpdate() {
		if(this.state.playing) {
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
						height="30"
						width="60"
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
