import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './ChatBox.css'

export default function ChatBox(props) {
	return (
		<div className="container-fluid col-11 col-md-4 mobileTextInput">

			<div className="row">
				<div className="container-fluid textFieldcontainer">
					<TextField
						id="standard-name"
						label="Send As:"
						value={props.curName}
						onChange={(e) => props.onNameInput(e.target.value)}
						margin="normal"
					/>

					<TextField
						id="standard-textarea"
						onChange={(e) => props.onTextInput(e.target.value)}
						label="New message"
						value={props.curVal}
						placeholder="Ex: Hi there!"
						multiline
						margin="normal"
						fullWidth
					/>
				</div>
			</div>
			<Button disabled={props.btnDisable} variant="outlined" onClick={() => props.onSendMsg(props.curDirection)}>Send Message</Button>
			<p>(sending to: {props.curDirection})</p>
		</div>
	)
}
