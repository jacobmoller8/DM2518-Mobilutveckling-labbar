import React from 'react'
import './MessageBox.css'

export default function MessageBox(props) {
	return (
		<div className="container-fluid col-11 col-md-4 mobileConversation">
			<h5>Messages from {props.curDirection}:</h5>
			<hr></hr>
			{props.curMsg.map((m, index) => <p key={'message' + index}>{m.message.name + ': ' + m.message.text}</p>)}

		</div>
	)
}
