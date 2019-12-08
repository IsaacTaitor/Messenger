import React from 'react';
import { MessageValue } from '../../../types/store';
import './MessageInput.css';

interface MessageInputProps {
	addMessage(message: MessageValue): void;
}

interface MessageInputState {
	text: string;
	files: Array<File>;
}

export default class MessageInput extends React.PureComponent<MessageInputProps, MessageInputState> {
	state = { text: '', files: [] };

	handleChange = (e): void => {
		this.setState({ text: e.target.value });
	}

	handleSubmit = (e): void => {
		e.preventDefault();
		if (!(this.state.text.length || this.state.files.length)) {
			return;
		}

		const message = { text: this.state.text, id: Date.now(), files: this.state.files };
		this.props.addMessage(message);

		this.setState({
			text: '',
			files: []
		});
		document.getElementById('gallery').innerHTML = '';
	}

	handlerFunction = (e): void => {
		console.log(e);
		e.preventDefault();
	}

	handleDrop = (e): void => {
		const dt = e.dataTransfer;
		let files = dt.files;
		files = [...files];
		files.forEach(this.uploadFile);
		files.forEach(this.previewFile);
	};

	handleFiles = (files): void => {
		files = (files.target.files);
		files = [...files];
		files.forEach(this.uploadFile);
		files.forEach(this.previewFile);
	}

	uploadFile = (file): void => {
		this.setState((prevState) => ({ files: prevState.files.concat(file) }));
	}

	previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			const img = document.createElement('img');
			(img as any).src = reader.result;
			document.getElementById('gallery').appendChild(img);
		};
	}

	render(): any {
		return (
			<div id="drop-area" onSubmit={this.handleSubmit}>
				<form className="form">
					<input type="file" id="fileElem" multiple accept="image/*" onChange={this.handleFiles} />
					<label className="button" htmlFor="fileElem">
						<i className="fa fa-paperclip" style={{ fontSize: '24px' }}></i>
					</label>
					<input
						autoComplete="off"
						className="input"
						placeholder='Напишите сообщение...'
						onChange={this.handleChange}
						value={this.state.text}
					/>
				</form>
				<div id="gallery"></div>
			</div>
		);
	}

	preventDefaults(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	componentDidMount(): any {
		const dropArea = document.getElementById('drop-area');

		function highlight(): void {
			dropArea.classList.add('highlight');
		}
		function unhighlight(): void {
			dropArea.classList.remove('highlight');
		}

		['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
			dropArea.addEventListener(eventName, this.preventDefaults, false);
		});
		['dragenter', 'dragover'].forEach(eventName => {
			dropArea.addEventListener(eventName, highlight, false);
		});
		['dragleave', 'drop'].forEach(eventName => {
			dropArea.addEventListener(eventName, unhighlight, false);
		});
		dropArea.addEventListener('drop', this.handleDrop, false);
	}
}