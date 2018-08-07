import React, { Component } from "react";
import ReactDOM from "react-dom";
import './css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Container from "./components/container";

class Index extends Component {
	render() {
		return (
			<div className="container-fluid">
				<Header />
				<Container />
			</div>
		);
	}
}

ReactDOM.render(<Index />, document.getElementById("app"));