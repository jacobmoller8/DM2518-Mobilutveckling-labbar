import React, { Component } from 'react'
import PubNubReact from 'pubnub-react';
import TextInput from '../Presentational/TextInput/TextInput'
import Button from '@material-ui/core/Button';

export default class MainChat extends Component {
	constructor(props) {
		super(props);
		this.pubnub = new PubNubReact({
			publishKey: 'pub-c-3ed40052-53b1-460b-b2de-3e5419fcbd98',
			subscribeKey: 'sub-c-67620ffc-67ff-11e9-a1d6-2a8c316da507'
		});

		this.state ={
			currentMsg: ''
		}
		this.pubnub.init(this);
	}

	deviceOrientationListener = (event) => {
		var alpha = event.alpha; //z axis rotation [0,360)
		var beta = event.beta; //x axis rotation [-180, 180]
		var gamma = event.gamma; //y axis rotation [-90, 90]
		var heading = alpha


		//Check if absolute values have been sent
		if (typeof event.webkitCompassHeading !== "undefined") {
			alpha = event.webkitCompassHeading; //for iOS devices
			heading = alpha
			document.getElementById("heading").innerHTML = heading.toFixed([0]);
		}
		else {
			alert("Your device is reporting relative alpha values, so this compass won't point north :(");
			heading = 360 - alpha; //heading [0, 360)
			document.getElementById("heading").innerHTML = heading.toFixed([0]);
		}
	}

	onTextInput = (value) => {
		this.setState({ currentMsg: value })
	}

	onSendMsg = () => {
			this.pubnub.publish({
				message: this.state.currentMsg,
				channel: 'channel1'
			});
			this.setState({ currentMsg: '' })
		}
	

	componentWillMount() {
		this.pubnub.subscribe({
			channels: ['channel1'],
			withPresence: true
		});

		this.pubnub.getMessage('channel1', (msg) => {
			console.log(msg);
		});


		this.pubnub.getStatus((st) => {
			this.pubnub.publish({
				message: 'hello world from react',
				channel: 'channel1'
			});
		});
	}

	componentWillUnmount() {
		this.pubnub.unsubscribe({
			channels: ['channel1']
		});
	}

	render() {
		let btnDisable = true
		if (this.state.currentMsg !== ""){
			btnDisable = false
		}

		const messages = this.pubnub.getMessage('channel1');
		return (
			<div>
				<h3>PUBNUB CHAT</h3>

				<TextInput onTextInput={this.onTextInput} curVal={this.state.currentMsg} />
				<Button disabled={btnDisable} variant="outlined" onClick={() => this.onSendMsg()}>Send Message</Button>
				<p>Messages:</p>
					<ul>
						{messages.map((m, index) => <li key={'message' + index}>{m.message}</li>)}
					</ul>
				
				<p id="heading"></p>
			</div>
		);
	}
}
