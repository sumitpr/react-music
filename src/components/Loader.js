import React from "react";

import "./Loader.css";

const Loader = props => {
	if (props.loading == "true") {
		return (
			<div className="center">
				<span className={`loader ${props.theme ? props.theme : ""}`}></span>
			</div>
		);
	}
	return <div></div>;
};

export default Loader;
