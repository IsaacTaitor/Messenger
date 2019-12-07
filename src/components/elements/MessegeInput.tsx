import React from 'react';
import { Item } from '../../redux/messages/messagesReducers';

interface MessegeInputProps {
	addMessege(newItem: Item): void;
}

interface MessegeInputState {
	text: string;
}

export default class MessegeInput extends React.PureComponent<MessegeInputProps, MessegeInputState> {
	state = { text: '' };

	handleChange = (e): void => {
		this.setState({ text: e.target.value });
	}

	handleSubmit = (e): void => {
		e.preventDefault();
		if (!this.state.text.length) {
			return;
		}
		const newItem: Item = {
			text: this.state.text,
			id: Date.now()
		};
		this.props.addMessege(newItem);

		this.setState({
			text: ''
		});
	}

	render(): any {
		debugger;
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					autoComplete="off"
					id="new-messege"
					onChange={this.handleChange}
					value={this.state.text}
				/>
			</form>
		);
	}
}