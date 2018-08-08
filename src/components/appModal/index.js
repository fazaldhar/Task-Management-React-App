import React, { Component } from "react";
import Modal from 'react-modal';
import PropTypes from 'prop-types';

class AppModal extends Component {
	constructor(props) {
		super(props);

		this.customStyles = {
			content: {
				width: '30%',
				top: '50%',
				left: '50%',
				right: 'auto',
				bottom: 'auto',
				marginRight: '-50%',
				transform: 'translate(-50%, -50%)'
			}
		};

		Modal.setAppElement('#item-modal')

		this._closeModal = this._closeModal.bind(this);
		this._addEditItem = this._addEditItem.bind(this);
	}

	_closeModal() {
		this.props.closeModal();
	}

	_addEditItem(e) {
		this.props.addItem(e, this.props.buttonName);
	}

	render() {
		let { modalIsOpen, itemNameRef, itemDescRef, modalTitle, itemName, itemDesc, buttonName } = this.props;

		return (
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={this.afterOpenModal}
				onRequestClose={this.closeModal}
				style={this.customStyles}
				contentLabel="Example Modal">
				<h5>{modalTitle}</h5>
				<form>
					<div className="form-group">
						<label htmlFor="exampleInputEmail1">Name</label>
						<input type="input" ref={(el) => itemNameRef(el)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" defaultValue={itemName}/>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Description</label>
						<input type="input" ref={(el) => itemDescRef(el)} className="form-control" id="exampleInputPassword1" placeholder="Description" defaultValue={itemDesc}/>
					</div>
					<button type="submit" className="btn btn-primary" onClick={this._addEditItem}>{buttonName}</button>
					<button type="button" className="btn btn-secondary close-button" onClick={this._closeModal}>Close</button>
				</form>
			</Modal>
		);
	}
}

AppModal.propTypes = {
	modalIsOpen: PropTypes.bool,
	itemNameRef: PropTypes.func,
	itemDescRef: PropTypes.func,
	closeModal: PropTypes.func,
	addItem: PropTypes.func,
	modalTitle: PropTypes.string
};	
	
export default AppModal;