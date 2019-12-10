import React from 'react';
import { PreviewImageStorage, MessageValue } from '../../../types/store';
import MessageInput from '../MessageInput/MessageInput';
import './MessageDND.css';
import { filesToImage } from '../../../utils';

interface MessageDNDProps {
	addMessage(message: MessageValue): void;
	addFilePreview(id: number, file: File): void;
	openModal(img: string, editable: boolean): void;
	clearFilesPreview(): void;
	modalViewImage: PreviewImageStorage;
}

interface MessageDNDState {
	files: Array<any>;
}

export default class MessageDND extends React.PureComponent<MessageDNDProps, MessageDNDState> {
	state = {
		files: []
	}

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

	uploadFile = (files: Array<File>) => {
		files = [...files];
		const result = [];
		files.forEach((file) => {
			this.props.addFilePreview(Date.now(), file);
			filesToImage(file).then(
				item => this.setState(prevState => ({ files: prevState.files.concat([item]) }))
			);
		});
	}

	render(): React.ReactElement {
		return (
			<div id="drop-area">
				<MessageInput
					handleFiles={this.handleFiles}
					addMessage={this.props.addMessage}
					clearFiles={this.props.clearFilesPreview}
					files={this.props.modalViewImage}
				/>
				<div id="gallery">
					{this.state.files.map((file, id) => (<img
						src={file}
						className="image"
						alt=""
						key={file.lastModified + file.name + id}
						onClick={(): void => this.props.openModal(file, true)} />)
					)}
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