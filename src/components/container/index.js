import React, { Component } from "react";
import List from "../list";
import AddList from '../addList';
import Remove from 'lodash/remove';
import AppModal from '../appModal';
import PropTypes from 'prop-types';

class Container extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lists: [
			{
				title: "Progress",
				items: [
					{
						title: 'Progress task 1',
						description: "description description"
					}
				]
			},
			{
				title: 'On Hold',
				items: [
					{
						title: 'On Hold task 1',
						description: "description description"
					},
					{
						title: 'On Hold task 2',
						description: "description description"
					}
				]
			}
			],
			modalIsOpen: false,
			modalTitle: "",
			itemName: "",
			itemDesc: "",
			buttonName: ""
		};

		this.modalOpenedForListIndex = null;
		this.modalOpenedForItemIndex = null;
		this._addListClick = this._addListClick.bind(this);
		this._getInputRef = this._getInputRef.bind(this);
		this._openItemModal = this._openItemModal.bind(this);
		this._closeModal = this._closeModal.bind(this);
		this._addEditItem = this._addEditItem.bind(this);
		this._removeItem = this._removeItem.bind(this);
		this._handleDragAndDrop = this._handleDragAndDrop.bind(this);
		this._setItemNameRef = this._setItemNameRef.bind(this);
		this._setItemDescRef = this._setItemDescRef.bind(this);
	}

	componentDidMount() {
		this._listInputRef.focus();
	}

	_addListClick() {
		let newListName = this._listInputRef.value;
		if(newListName == "")
			return;

		let newList = {
			title: newListName,
			items: []
		};

		this.setState((prevState) => {
			prevState.lists.push(newList);
			return {
				lists : prevState.lists
			}
		});

		this._listInputRef.value = "";
	}

	_getInputRef(ref) {
		this._listInputRef = ref;
	}

	_openItemModal(action, list, selectedItem) {
		this.setState({
			modalIsOpen: true,
			modalTitle: `${action} Item`,
			itemName: selectedItem ? selectedItem.title : "",
			itemDesc: selectedItem ? selectedItem.description : "",
			buttonName: `${action}`
		});
		this.modalOpenedForListIndex = list.listIndex;
		this.modalOpenedForItemIndex = selectedItem ? selectedItem.itemIndex : null;
	}	

	_closeModal() {
		this.setState({
			modalIsOpen: false
		});
	}

	_addEditItem(e, action) {
		e.preventDefault();
		let itemName = this._itemNameRef.value;
		let itemDesc = this._itemDescRef.value;
		let self = this;
		let newItem = {
			title: itemName,
			description: itemDesc
		};

		if(itemName == "")
			return;

		if(action === "Edit") {
			this.setState((prevState) => {
				prevState.lists[self.modalOpenedForListIndex].items[self.modalOpenedForItemIndex].title = itemName;
				prevState.lists[self.modalOpenedForListIndex].items[self.modalOpenedForItemIndex].description = itemDesc;

				return {
					lists: prevState.lists,
					modalIsOpen: false
				}
			});

			return;
		}

		this.setState((prevState) => {
			prevState.lists[self.modalOpenedForListIndex].items.push(newItem);

			return {
				lists: prevState.lists,
				modalIsOpen: false
			}
		});
	}

	_removeItem(e, item, selectedList) {
		e.stopPropagation();
		
		this.setState((prevState) => {
			prevState.lists[selectedList.listIndex].items.splice(item.itemIndex,1);

			return {
				lists: prevState.lists
			}
		});
	}

	_handleDragAndDrop(draggedObj, draggedToIndex) {
		if(draggedObj.draggedFromIndex === draggedToIndex)
			return;

		this.setState((prevState) => {

			prevState.lists[draggedToIndex].items.push(draggedObj.draggedItem);

			prevState.lists[draggedObj.draggedFromIndex].items.splice(draggedObj.draggedItemIndex, 1);

			return {
				lists: prevState.lists,
			}
		});

	}

	_setItemNameRef(ref) {
		this._itemNameRef = ref;
	}

	_setItemDescRef(ref) {
		this._itemDescRef = ref;
	}

	render() {
		let {lists, modalIsOpen, modalTitle, itemName, itemDesc, buttonName } = this.state;

		return (
			<div className="row">
				<div className="col-md-12">
					
					<AddList addListClick={this._addListClick} addListInputRef={this._getInputRef}/>
					
					<section>
						{
							lists.map((list, index) => (
								<List 
									key={index} 
									{...list} 
									openItemModal={this._openItemModal} 
									removeItem={this._removeItem} 
									handleDragAndDrop={this._handleDragAndDrop} 
									listIndex={index}/>
							))
						}
					</section>

					<AppModal 
						modalIsOpen={modalIsOpen}
						modalTitle={modalTitle} 
						addItem={this._addEditItem} 
						itemNameRef={this._setItemNameRef} 
						itemDescRef={this._setItemDescRef}
						closeModal={this._closeModal}
						itemName={itemName}
						itemDesc={itemDesc}
						buttonName={buttonName}
						/>			
				</div>
			</div>
		);
	}
};

export default Container;