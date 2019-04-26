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
			currentMsg: ''
		}
		this.pubnub.init(this);
	}


	onTextInput = (value) => {
		this.setState({ currentMsg: value })
	}

	onSendMsg = () => {
		this.pubnub.publish({
			message: { text: this.state.currentMsg, name: 'hugge' },
			channel: 'channel1'
		});
		this.setState({ currentMsg: '' })
	}


	componentWillMount() {
		this.pubnub.subscribe({
			channels: ['channel1'],
			withPresence: true
		});

	}

	componentWillUnmount() {
		this.pubnub.unsubscribe({
			channels: ['channel1']
		});
	}

	render() {
		let btnDisable = true
		if (this.state.currentMsg !== "") {
			btnDisable = false
		}

		const messages = this.pubnub.getMessage('channel1');
		return (
			<div>
				<Lab4Header/>
				<div className="row">
					<TextInput onTextInput={this.onTextInput} curVal={this.state.currentMsg} btnDisable={btnDisable} onSendMsg={this.onSendMsg} />
					<Conversation messages={messages} />
				</div>

			</div>
		);
	}
}
