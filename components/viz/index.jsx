import React, { Component } from 'react';
import './style.css';

export default class AppComponent extends Component {

	constructor(props) {
			super(props);
			this.state = {
				active: [
					false,
					false,
					false,
					false,
					false
				]
			}

			this.socket = new WebSocket("ws://localhost:1337");
	}

	activate = (index) => {
		this.state.active[index] = !this.state.active[index];
		this.setState(this.state)

		this.socket.send(index);
	}

	render = () => {
    return (
      <div className="buttons">
				<div onClick={() => this.activate(0)} className={`button ${this.state.active[0] ? "button--active" : ""}`}>Colors 1</div>
				<div onClick={() => this.activate(1)} className={`button ${this.state.active[1] ? "button--active" : ""}`}>Colors 2</div>
				<div onClick={() => this.activate(2)} className={`button ${this.state.active[2] ? "button--active" : ""}`}>Colors 3</div>
				<div onClick={() => this.activate(3)} className={`button ${this.state.active[3] ? "button--active" : ""}`}>Width</div>
				<div onClick={() => this.activate(4)} className={`button ${this.state.active[4] ? "button--active" : ""}`}>Mode</div>
      </div>
    );
  }

}
