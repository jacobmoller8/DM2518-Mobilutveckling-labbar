import React, { Component } from 'react'
import PubNubReact from 'pubnub-react';
import Lab4Header from '../Presentational/Lab4Header/Lab4Header'
import TextInput from '../Presentational/TextInput/TextInput'
import Conversation from '../Presentational/Conversation/Conversation'

export default class MainChat extends Component {
	constructor(props) {
		super(props);
		this.pubnub = new PubNubReact({
			publishKey: 'pub-c-3ed40052-53b1-460b-b2de-3e5419fcbd98',
			subscribeKey: 'sub-c-67620ffc-67ff-11e9-a1d6-2a8c316da507'
		});

		this.state = {
			currentMsg: '',
			currentDirection: 'north' 
		}
		this.pubnub.init(this);
	}

	// Denna har jag skrivit
	onTextInput = (value) => {
		this.setState({ currentMsg: value })
	}

	// och denna
	onSendMsg = () => {
		let direction = this.state.currentDirection

		this.pubnub.publish({
			message: { text: this.state.currentMsg, name: 'hugge' },
			channel: direction
		});
		this.setState({ currentMsg: ''})
	}

	onSetDirection = (direction) => {
		this.setState({currentDirection: direction})
	}

	// kommer från pubnubs hemsida
	componentWillMount() {
		this.pubnub.subscribe({
			channels: ['north', 'south', 'west', 'east'],
			withPresence: true
		});

	}

	// kommer från pubnubs hemsida
	componentWillUnmount() {
		this.pubnub.unsubscribe({
			channels: ['north', 'south', 'west', 'east']
		});
	}

	render() {
		let btnDisable = true
		if (this.state.currentMsg !== "") {
			btnDisable = false
		}

		const northMsg = this.pubnub.getMessage('north');
		const southMsg = this.pubnub.getMessage('south');
		const westMsg = this.pubnub.getMessage('west');
		const eastMsg = this.pubnub.getMessage('east');

		return (
			<div>
				<Lab4Header/>
				<div className="row">
					<TextInput 
					currentDirection={this.state.currentDirection} 
					onSetDirection={this.onSetDirection}
					onTextInput={this.onTextInput} 
					curVal={this.state.currentMsg} 
					btnDisable={btnDisable} 
					onSendMsg={this.onSendMsg} />

					<Conversation 
					northMsg={northMsg} 
					southMsg={southMsg} 
					westMsg={westMsg} 
					eastMsg={eastMsg} />
				</div>

			</div>
		);
	}
}
