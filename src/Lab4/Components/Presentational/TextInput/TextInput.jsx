import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './TextInput.css'

export default function TextInput(props) {

	return (
		<div className="container-fluid col-11 col-md-4 textInput">
			<div className="container-fluid btnRowCntainer">
				<p>Select in which direction to send message:</p>
				<Button variant="outlined" size="small" onClick={() => props.onSetDirection('north')}>North</Button>
				<Button variant="outlined" size="small" onClick={() => props.onSetDirection('south')}>South</Button>
				<Button variant="outlined" size="small" onClick={() => props.onSetDirection('east')}>East</Button>
				<Button variant="outlined" size="small" onClick={() => props.onSetDirection('west')}>West</Button>
			</div>
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
						fullWidth
					/>
				</div>
			</div>
			<Button disabled={props.btnDisable} variant="outlined" onClick={() => props.onSendMsg()}>Send Message</Button>
			<p>(sending to: {props.currentDirection})</p>
		</div>
	)
}
