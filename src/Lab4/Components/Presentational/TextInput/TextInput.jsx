import React from 'react'
import TextField from '@material-ui/core/TextField';

export default function TextInput(props) {
	return (
		<div>
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
	)
}
