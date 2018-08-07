import React, { Component } from "react";
import { Draggable } from 'react-drag-and-drop';
import PropTypes from 'prop-types';

class Item extends Component {
	constructor(args) {
		super(args);

		this._removeItem = this._removeItem.bind(this);
		this._editItem = this._editItem.bind(this);
	}

	_removeItem(e) {
		this.props.removeItem(e, this.props);
	}

	_editItem() {
		let { itemIndex, item } = this.props;
		let selectedItem = {
			itemIndex,
			title: item.title,
			description: item.description
		}
		this.props.editItem("Edit", selectedItem);
	}

	render() {
		let { title, description } = this.props.item;
		let { listIndex, itemIndex } = this.props;
		let dragObject = {
			draggedItem : this.props.item,
			draggedFromIndex: listIndex,
			draggedItemIndex: itemIndex
		};

		return (
			<Draggable enabled="true" type="yolo" data={JSON.stringify(dragObject)}>
				<div className="item" onClick={this._editItem}>
					<header className="clearfix">
						<h6 className="float-left">{title}</h6>
						<button type="button" className="close float-right" onClick={this._removeItem} aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</header>
					<p>{description}</p>
				</div>
			</Draggable>
		);
	}
};

Item.propTypes = {
	title : PropTypes.string,
	description : PropTypes.string,
	listName : PropTypes.string,
	removeItem: PropTypes.func,
	editItem: PropTypes.func
};

export default Item;