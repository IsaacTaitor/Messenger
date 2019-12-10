import React from 'react';
import { PreviewImageStorage, MessageValue } from '../../../types/store';
import MessageInput from '../MessageInput/MessageInput';
import './MessageDND.css';
import { filesToImage } from '../../../utils';

interface MessageDNDProps {
	addMessage(message: MessageValue): void;
	addFilePreview(id: number, file: File): void;
	openModal(img: string, editable: boolean, id: number): void;
	clearFilesPreview(): void;
	modalViewImage: PreviewImageStorage;
}

interface MessageDNDState {
	files: Array<{ id: number; file: any }>;
}

export default class MessageDND extends React.PureComponent<MessageDNDProps, MessageDNDState> {
	state = {
		files: []
	}

	handlerFunction = (e): void => {
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
		files.forEach((file) => {
			this.props.addFilePreview(Date.now(), file);
		});
	}

	viewImage = (modalViewImage) => {
		const files = [];
		if (this.state.files.length && !Object.keys(modalViewImage).length) {
			this.setState({ files: [] });
		} else {
			Object.keys(modalViewImage).forEach(
				key => {
					filesToImage(modalViewImage[key]).then(
						item => {
							files.push({file: item, id: key});
							this.setState({ files: files });
						}
					);
				}
			);
		}
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
					{this.state.files.map(({ file, id }) => (<img
						src={file}
						className="image"
						alt=""
						key={file.lastModified + file.name + Date.now()}
						onClick={(): void => this.props.openModal(file, true, id)} />)
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
	componentDidUpdate(): void {
		this.viewImage(this.props.modalViewImage);
	}
}