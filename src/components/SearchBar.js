import React from "react";

import "./SearchBar.css";

class SearchBar extends React.Component {
	state = { input: "" };

	onInputChange = event => {
		this.setState({ input: event.target.value });
	};

	onFormSubmit = event => {
		event.preventDefault();
		this.props.onSearchSubmit(this.state.input);
	};

	render() {
		return (
			<div className="search-bar">
				<form onSubmit={this.onFormSubmit}>
					<input
						type="text"
						placeholder="song, album or artist"
						value={this.state.input}
						onChange={this.onInputChange}
					/>
				</form>
			</div>
		);
	}
}

export default SearchBar;
