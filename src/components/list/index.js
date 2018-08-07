import React, { Component } from "react";
import Button from "../button";
import Item from "../item";
import { Droppable } from 'react-drag-and-drop';
import PropTypes from 'prop-types';

class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: true
		}

		this._openItemModal = this._openItemModal.bind(this);
		this._removeItem = this._removeItem.bind(this);
		this._onDrop = this._onDrop.bind(this);
		this._editItem = this._editItem.bind(this);
	}

	_openItemModal() {
		this.props.openItemModal("Add", this.props, undefined);
	}

	_removeItem(e, item) {
		let list = this.props;
		this.props.removeItem(e, item, list);
	}

	_onDrop(e) {
		let draggedObj = JSON.parse(e.yolo);
		let draggedToIndex = this.props.listIndex;
		this.props.handleDragAndDrop(draggedObj, draggedToIndex);
	}

	_editItem(action, selectedItem) {
		this.props.openItemModal(action, this.props, selectedItem);
	}

	render() {
		let { title, items, listIndex } = this.props;

		return (
			<Droppable 
                types={['yolo']} 
                onDrop={this._onDrop}>
                 
                <div className="list-wrapper">   
					<div className="list">
						<div className="list-header">
							<h5 className="float-left">{title}</h5>
							<Button name="+" handleClick={this._openItemModal}/>
							<div className="clearfix"></div>
						</div>
						<div className="list-content">
						{
							items.map((item, index) => (
								<Item key={index} itemIndex={index} item={item} removeItem={this._removeItem} listIndex={listIndex} editItem={this._editItem}/>
							))
						}
						</div>
					</div>
				</div>
			</Droppable>
		);
	}
};

Item.propTypes = {
	openItemModal: PropTypes.func,
	removeItem: PropTypes.func,
	handleDragAndDrop: PropTypes.func,
	editItem: PropTypes.func
};

export default List;