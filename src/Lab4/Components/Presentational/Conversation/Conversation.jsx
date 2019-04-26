import React from 'react'
import './Conversation.css'

export default function Conversation(props) {
	return (
		<div className="container-fluid col-4 conversation">
			<h5>Messages:</h5>
				{props.messages.map((m, index) => <p key={'message' + index}>{m.message.name + ': ' + m.message.text}</p>)}
		</div>
	)
}
