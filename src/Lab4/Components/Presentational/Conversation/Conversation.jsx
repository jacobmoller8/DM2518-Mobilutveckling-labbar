import React from 'react'
import './Conversation.css'

export default function Conversation(props) {
	return (
		<div className="container-fluid col-11 col-md-4 conversation">
			<h5>Messages North:</h5>
			{props.northMsg.map((m, index) => <p key={'message' + index}>{m.message.name + ': ' + m.message.text}</p>)}
			<hr/>
			<h5>Messages South:</h5>
			{props.southMsg.map((m, index) => <p key={'message' + index}>{m.message.name + ': ' + m.message.text}</p>)}
			<hr/>
			<h5>Messages East:</h5>
			{props.eastMsg.map((m, index) => <p key={'message' + index}>{m.message.name + ': ' + m.message.text}</p>)}
			<hr/>
			<h5>Messages West:</h5>
			{props.westMsg.map((m, index) => <p key={'message' + index}>{m.message.name + ': ' + m.message.text}</p>)}
		</div>
	)
}
