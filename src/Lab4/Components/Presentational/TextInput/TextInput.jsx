import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './TextInput.css'

export default function TextInput(props) {
	return (
		<div className="container-fluid col-4 textInput">
			<div className="row">
				<div className="container-fluid textFieldcontainer">
					<TextField
						id="standard-textarea"
						onChange={(e) => props.onTextInput(e.target.value)}
						label="New message"
						value={props.curVal}
						placeholder="Ex: Hi there!"
						multiline
						margin="normal"
					/>
				</div>
			</div>
			<Button disabled={props.btnDisable} variant="outlined" onClick={() => props.onSendMsg()}>Send Message</Button>
		</div>
	)
}
