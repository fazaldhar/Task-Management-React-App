import React, { Component } from "react";
import PropTypes from 'prop-types';

class AddList extends Component {
	constructor(args) {
		super(args);

		this._handleClick = this._handleClick.bind(this);
	}

	_handleClick() {
		this.props.addListClick();
	}

	render() {
		return (
		<div className="input-group mb-3">
			<input type="text" ref={(el) => this.props.addListInputRef(el)} className="form-control" placeholder="Add New List" aria-label="Recipient's username" aria-describedby="basic-addon2" />
			<div className="input-group-append">
				<button className="btn btn-outline-secondary" type="button" onClick={this._handleClick}>Add List</button>
			</div>
		</div>
		);
	}
};
	
AddList.propTypes = {
	addListClick: PropTypes.func,
	addListInputRef: PropTypes.func
};

export default AddList;