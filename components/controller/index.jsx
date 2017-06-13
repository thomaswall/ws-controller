import React, { Component } from 'react';
import config from './config.json';

import './controller.scss';
import './grid.scss';

export default class Controller extends Component {

	constructor(props) {
			super(props);

			// Config from the visualization
			this.state = {
				activeViz: 0,
				activeScene: 1,
				title: config[0].title,
				scenes: config[0].scenes,
				triggers: config[0].triggers,
				visualizations: config.map(c => c.title)
			}

			this.socket = new WebSocket("ws://localhost:1337");
	}

	componentWillMount = () => {
		document.addEventListener("keydown", this.onKeyDown);
	}

	componentDidMount = () => {

	}

	changeScene = (sceneNumber) => {
		this.socket.send(sceneNumber);
		this.setState({activeScene: sceneNumber});
	}

	activeScene = (sceneNumber) => {
		return this.state.activeScene == sceneNumber ? 'active ' : '';
	}

	trigger = (index) => {
		this.socket.send(this.state.triggers[index]);
		this.setState({
			activeTrigger: index
		})
		window.setTimeout(function() {
			this.setState({
				activeTrigger: null
			})
		}.bind(this), 200);
	}

	activeTrigger = (index) => {
		return this.state.activeTrigger == index ? 'fake-hover ' : '';
	}

	sendRange = (event) => {
		this.socket.send("Range-" + event.target.value);
	  this.setState({value: event.target.value});
	}

	sendScale = (value) => {
		this.socket.send("Range-" + event.target.value);
		this.setState({
			activeScale: value
		})
		window.setTimeout(function() {
			this.setState({
				activeScale: null
			})
		}.bind(this), 200);
	}

	activeScale = (value) => {
		return this.state.activeScale == value ? 'fake-hover ' : '';
	}

	onKeyDown = (event) => {
		let key = event.keyCode;
		if (key < 58 && key > 48) {
			this.changeScene(key-48);
		}
		else if (key == 32) {
			this.toggleOverlay();
		}
		else {
			switch (key) {
				case 65:
					this.trigger(0);
					break;
				case 83:
					this.trigger(1);
					break;
				case 68:
					this.trigger(2);
					break;
				case 70:
					this.trigger(3);
					break;
			}
		}
	}

	toggleOverlay = () => {
		this.setState({
			showMenu: !this.state.showMenu
		});
	}

	changeViz = (name) => {
		this.socket.send(name);
		for(let viz of config) {
			if(viz.title == name) {
				this.setState({
					title: viz.title,
					scenes: viz.scenes,
					triggers: viz.triggers
				});

				this.toggleOverlay();
			}
		}
	}

	activeViz = (name) => {
		return this.state.title == name ? 'active ' : '';
	}


	render = () => {
		const sceneButtons = this.state.scenes.map((x) => {
			return <div onClick={() => this.changeScene(x)} className={this.activeScene(x) + "grid-2 controller-button"} key={x}>{x}</div>
		});

		const triggers = this.state.triggers.map((x, index) => {
			return <div onClick={() => this.trigger(index)} className={this.activeTrigger(index) + "grid-3 controller-button"} key={index}>{x}</div>
		});

		const visualizations = this.state.visualizations.map((x) => {
			return <li onClick={() => this.changeViz(x)} key={x} className={this.activeViz(x)}>{x}</li>
		})

    return (
      <div id="controller">
		  <div id="overlay" className={this.state.showMenu ? "open" : null}>
			  <h1 className="top-title">Select Visualization <span onClick={this.toggleOverlay} className="x">&times;</span></h1>

				  <div className="section">
					  <h2 className="title">Available Visualizations</h2>
					  <div className="grid-12">
						  <ul>
							  {visualizations}
						  </ul>
					  </div>
				  </div>
		  </div>
		  
				<h1 className="top-title" onClick={this.toggleOverlay}>{this.state.title} Controller</h1>

				<div className="section">
					<h2 className="title">Scenes</h2>
					{sceneButtons}
				</div>

				<div className="section">
					<h2 className="title">Triggers</h2>
					{triggers}
				</div>

				<div className="section">
					<h2 className="title">Scalable</h2>

					<div className="flex-container">
						<div className="grid-4 range-container">
							<input onChange={this.sendRange} type="range" min="0" max="100" value={this.state.range} />
						</div>
						<div onClick={() => this.sendScale("-")} className={this.activeScale("-") + "grid-4 controller-button"}>
							-
						</div>
						<div onClick={() => this.sendScale("+")} className={this.activeScale("+") + "grid-4 controller-button"}>
							+
						</div>
					</div>


				</div>

      </div>
    );
  }

}
