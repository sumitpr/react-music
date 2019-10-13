import React from "react";

import "./SearchBar.css";

class SearchBar extends React.Component {
	state = { input: "" };
	inputRef = React.createRef();

	onInputChange = event => {
		this.setState({ input: event.target.value });
	};

	onFormSubmit = event => {
		event.preventDefault();
		this.props.onSearchSubmit(this.state.input);
		document.activeElement.blur();
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
						ref={this.inputRef}
					/>
				</form>
			</div>
		);
	}
}

export default SearchBar;
