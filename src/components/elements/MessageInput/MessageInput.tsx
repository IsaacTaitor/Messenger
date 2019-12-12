import React from 'react';
import { MessageValue, AttachedFilesStore } from '../../../types/store';
import './MessageInput.css';

interface MessageInputProps {
	addMessage(message: MessageValue): void;
	handleFiles(files): void;
	clearFiles?(): void;
	files?: AttachedFilesStore;
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
		if (!(this.state.text.length || Object.keys(this.props.files).length)) {
			return;
		}

		const message = { text: this.state.text, id: Date.now(), files: this.props.files };
		this.props.addMessage(message);

		this.setState({
			text: ''
		});
		this.props.clearFiles();
	}

	render(): React.ReactElement {
		return (
			<form className="form" onSubmit={this.handleSubmit}>
				<label className="button">
					<input type="file" className='fileElem' multiple onChange={this.props.handleFiles} />
					<i className="fa fa-paperclip" style={{ fontSize: '24px' }} />
				</label>
				<input
					autoComplete="off"
					className="input"
					placeholder='Напишите сообщение...'
					onChange={this.handleChange}
					value={this.state.text}
				/>
				<button className="send" onClick={this.handleSubmit} >
					<i className="fa fa-send-o" style={{ fontSize: '24px' }} />
				</button>
			</form>
		);
	}
}