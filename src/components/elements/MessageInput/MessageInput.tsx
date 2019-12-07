import React from 'react';
import { Item } from '../../../types/store';

interface MessageInputProps {
	addMessage(newItem: Item): void;
}

interface MessageInputState {
	text: string;
}

export default class MessageInput extends React.PureComponent<MessageInputProps, MessageInputState> {
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
		this.props.addMessage(newItem);

		this.setState({
			text: ''
		});
	}

	render(): any {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					autoComplete="off"
					id="new-Message"
					onChange={this.handleChange}
					value={this.state.text}
				/>
			</form>
		);
	}
}