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
	deleteFilePreview(id: number): void;
	modalViewImage: PreviewImageStorage;
}

interface MessageDNDState {
	images: Array<{ id: number; file: any }>;
	files: {
		[id: number]: {
			title: string;
		};
	};
}

export default class MessageDND extends React.PureComponent<MessageDNDProps, MessageDNDState> {
	state = {
		images: [],
		files: {}
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
			this.props.addFilePreview(Math.floor(Math.random() * 100000), file);
		});
	}

	viewImage = (modalViewImage: PreviewImageStorage): void => {
		Object.keys(modalViewImage).forEach(
			key => {
				if (this.state.files[key] === undefined) {
					if (modalViewImage[key].type.indexOf('image') === -1) {
						this.setState(prevState => ({
							files: {
								...prevState.files,
								[key]: {
									title: modalViewImage[key].name
								}
							}
						}));
					}
				}
			}
		);
		filesToImage(modalViewImage).then(
			images => {
				if (JSON.stringify(this.state.images) !== JSON.stringify(images)) {
					this.setState({ images: images as any });
				}
			}
		);
	}

	render(): React.ReactElement {
		console.log(this.state);
		return (
			<div id="drop-area">
				<MessageInput
					handleFiles={this.handleFiles}
					addMessage={this.props.addMessage}
					clearFiles={this.props.clearFilesPreview}
					files={this.props.modalViewImage}
				/>
				<div id="gallery">
					{this.state.images.map(({ image, id }) => (<div
						key={id}
						className="image"
						style={{ position: 'relative' }}>
						<img
							src={image}
							alt="img"
							style={{ width: '100%', maxWidth: '100px' }}
							onClick={(): void => this.props.openModal(image, true, id)} />
						<button onClick={() => this.props.deleteFilePreview(id)} style={{ position: 'absolute', right: '0px', top: '0px' }} >X</button>
					</div>)
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