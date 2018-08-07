import React, { Component } from "react";
import PropTypes from 'prop-types';

class Button extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {name, handleClick} = this.props;

		return (
			<button type="button" className="btn btn-primary float-right" onClick={handleClick}>{name}</button>
		);
	}
};

Button.propTypes = {
	name: PropTypes.string,
	handleClick: PropTypes.func
};

export default Button;