import React from 'react';
import { MessageValue } from '../../../types/store';
import MessageInput from '../MessageInput/MessageInput';
import './MessageDND.css';

interface MessageDNDProps {
	addMessage(message: MessageValue): void;
	openModal(img: string, editable: boolean): void;
}

interface MessageDNDState {
	files: Array<File>;
	previewFiles: Array<React.ReactElement>;
}

export default class MessageDND extends React.PureComponent<MessageDNDProps, MessageDNDState> {
	state = { files: [], previewFiles: [] };

	handlerFunction = (e): void => {
		console.log(e);
		e.preventDefault();
	}

	handleDrop = (e): void => {
		const dt = e.dataTransfer;
		const files = dt.files;
		this.uploadFile(files);
	};

	handleFiles = (files): void => {
		this.uploadFile(files.target.files);
		files.target.value = null;
	}

	uploadFile = (files): void => {
		files = [...files];
		this.previewFile(files);
		this.setState((prevState) => ({ files: prevState.files.concat(files) }));
	}

	previewFile = (files): void => {
		files.forEach(file => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = (): void => {
				const id = Date.now();
				this.setState(prevState => ({
					previewFiles: prevState.previewFiles.concat(
						<img
							src={reader.result as string}
							className="image"
							alt=""
							key={file.lastModified + file.name + id}
							onClick={(): void => this.props.openModal(String(reader.result), true)} />
					)
				}));
			};
		});
	}

	clearFiles = (): void => {
		this.setState({ files: [], previewFiles: [] });
	}

	render(): React.ReactElement {
		return (
			<div id="drop-area">
				<MessageInput
					handleFiles={this.handleFiles}
					addMessage={this.props.addMessage}
					clearFiles={this.clearFiles}
					files={this.state.files}/>
				<div id="gallery">
					{this.state.previewFiles}
				</div>
			</div>
		);
	}

	preventDefaults(e): void {
		e.preventDefault();
		e.stopPropagation();
	}

	componentDidMount(): void {
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