import React from 'react';
import { Item } from '../../../types/store';
import './MessageInput.css';

interface MessageInputProps {
	addMessage(newItem: Item): void;
}

interface MessageInputState {
	text: string;
}

export default class MessageInput extends React.PureComponent<MessageInputProps, MessageInputState> {
	state = { text: '' };
	/*
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
*/

	handlerFunction = (e): void => {
		console.log(e);
		e.preventDefault();
	}

	handleFiles = (files): void => {
		files = (files.target.files);
		([...files]).forEach(this.uploadFile);
	}

	uploadFile = (file): void => {
		console.log(file);
	}

	render(): any {
		/*return (
			<div id="drop-area">
				<form onSubmit={this.handleSubmit}>
					<input
						autoComplete="off"
						className="input"
						multiple
						placeholder='Напишите сообщение...'
						onChange={this.handleChange}
						value={this.state.text}
					/>
				</form>
			</div>
		);*/
		return (
			<div id="drop-area">
				<form className="my-form">
					<p>Загрузите изображения с помощью диалога выбора файлов или перетащив нужные изображения в выделенную область</p>
					<input type="file" id="fileElem" multiple accept="image/*" onChange={this.handleFiles} />
					<label className="button" htmlFor="fileElem">Выбрать изображения</label>
				</form>
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
		const handleDrop = (e): void => {
			const dt = e.dataTransfer;
			const files = dt.files;
			([...files]).forEach(this.uploadFile);
		};

		['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
			dropArea.addEventListener(eventName, this.preventDefaults, false);
		});
		['dragenter', 'dragover'].forEach(eventName => {
			dropArea.addEventListener(eventName, highlight, false);
		});
		['dragleave', 'drop'].forEach(eventName => {
			dropArea.addEventListener(eventName, unhighlight, false);
		});
		dropArea.addEventListener('drop', handleDrop, false);
	}
}