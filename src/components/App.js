import React from "react";

import Loader from "./Loader";
import youtube from "../apis/youtube";
import SearchBar from "./SearchBar";
import SongsList from "./SongsList";
import Player from "./Player";

class App extends React.Component {
	state = { loading: "false", songs: [], selectedSong: null };

	onSearchSubmit = async searchterm => {
		this.setState({ loading: "true" });
		try {
			const response = await youtube.get("/search", {
				params: {
					q: searchterm,
					maxResults: 5,
					type: "video"
				}
			});

			console.log(response.data.items);
			this.setState({ loading: "false", songs: response.data.items });
		} catch (e) {
			console.log(e);
		}
	};

	onSongSelect = song => {
		this.setState({ selectedSong: null });
		this.setState({ selectedSong: song });
	};

	render() {
		return (
			<div className="container">
				<SearchBar onSearchSubmit={this.onSearchSubmit} />
				<div className="top-margin"><Loader loading={this.state.loading} /></div>
				<SongsList
					selectedSong={this.state.selectedSong}
					songs={this.state.songs}
					onSongSelect={this.onSongSelect}
					onSongStop={this.onSongStop}
				/>
				<Player song={this.state.selectedSong} />
			</div>
		);
	}
}

export default App;
