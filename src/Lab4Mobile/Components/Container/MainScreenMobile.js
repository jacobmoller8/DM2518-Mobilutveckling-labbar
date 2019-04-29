import React, { Component } from 'react'
import PubNubReact from 'pubnub-react';
import ChatBox from '../Presentational/ChatBox/ChatBox'
import MessageBox from '../Presentational/MessageBox/MessageBox'
import Button from '@material-ui/core/Button';

export default class MainScreenMobile extends Component {
	constructor(props) {
		super(props);
		this.pubnub = new PubNubReact({
			publishKey: 'pub-c-3ed40052-53b1-460b-b2de-3e5419fcbd98',
			subscribeKey: 'sub-c-67620ffc-67ff-11e9-a1d6-2a8c316da507'
		});

		this.state = {
			name: 'User',
			currentMsg: '',
			currentDirection: null
		}
		this.pubnub.init(this);
	}

	deviceOrientationListener = (event) => {
		var alpha = event.alpha; //z axis rotation [0,360)
		// var beta = event.beta; x axis rotation [-180, 180]
		// var gamma = event.gamma; y axis rotation [-90, 90]

		var heading = alpha

		//Check if absolute values have been sent
		if (typeof event.webkitCompassHeading !== "undefined") {
			alpha = event.webkitCompassHeading; //for iOS devices
			heading = alpha
			if (this.state.currentDirection !== heading.toFixed([0])) {
				this.setState({ currentDegree: heading.toFixed([0]) });
			}
		}
		else {
			alert("Your device is reporting relative alpha values, so this compass won't point north :(");
			heading = 360 - alpha; //heading [0, 360)
			if (this.state.currentDirection !== heading.toFixed([0])) {
				this.setState({ currentDegree: heading.toFixed([0]) });
			}
		}
	}

	onTextInput = (value) => {
		this.setState({ currentMsg: value })
	}

	onNameInput = (value) => {
		this.setState({ name: value })
	}

	// och denna
	onSendMsg = (direction) => {

		this.pubnub.publish({
			message: { text: this.state.currentMsg, name: this.state.name },
			channel: direction
		});
		this.setState({ currentMsg: '' })
	}


	componentWillMount() {
		this.pubnub.subscribe({
			channels: ['north', 'south', 'west', 'east'],
			withPresence: true
		});

	}

	componentDidMount() {
		window.addEventListener("deviceorientation", this.deviceOrientationListener);
	}

	// kommer från pubnubs hemsida
	componentWillUnmount() {
		window.removeEventListener("deviceorientation", this.deviceOrientationListener);
		this.pubnub.unsubscribe({
			channels: ['north', 'south', 'west', 'east']
		});
	}
	render() {
		let curDirection = 'north'
		if (315 <= this.state.currentDegree || this.state.currentDegree <= 45) {
			curDirection = 'north'
		} else if (46 <= this.state.currentDegree && this.state.currentDegree <= 135) {
			curDirection = 'east'
		} else if (136 <= this.state.currentDegree && this.state.currentDegree <= 225) {
			curDirection = 'south'
		} else if (226 <= this.state.currentDegree && this.state.currentDegree <= 314) {
			curDirection = 'west'
		}

		let btnDisable = true
		if (this.state.currentMsg !== "") {
			btnDisable = false
		}

		let curMsg = this.pubnub.getMessage(curDirection);
		return (

			<div className="row">
				<ChatBox
					curDirection={curDirection}
					btnDisable={btnDisable}
					onTextInput={this.onTextInput}
					onNameInput={this.onNameInput}
					curName={this.state.name}
					curVal={this.state.currentMsg}
					onSendMsg={this.onSendMsg} />
				<MessageBox curMsg={curMsg} curDirection={curDirection}/>
			</div>
		)
	}
}
