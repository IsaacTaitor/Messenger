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

const maxAllowedFiles = 10;

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

	uploadFile = (files): void => {
		files = [...files];
		const lengthModalViewImage = Object.keys(this.props.modalViewImage).length;
		const lengthUploadFile = files.length;
		const allowedUpload = maxAllowedFiles - lengthModalViewImage;
		let conf = true;
		if (allowedUpload < lengthUploadFile) {
			conf = window.confirm('Вы не можете прикрепить больше 10 файлов');
		}
		if (conf) {
			for (let i = 0; i < allowedUpload; i++) {
				const idFile =  Math.floor(Math.random() * 100000);
				this.props.addFilePreview(idFile, files[i]);
			}
		}
	}

	viewImage = async (modalViewImage: PreviewImageStorage) => {
		const files = {};
		Object.keys(modalViewImage).forEach(
			key => {
				if (modalViewImage[key].type.indexOf('image') === -1) {
					files[key] = { title: modalViewImage[key].name };
				}
			}
		);
		const images = await filesToImage(modalViewImage);
		if ((JSON.stringify(this.state.images) !== JSON.stringify(images)) || (JSON.stringify(this.state.files) !== JSON.stringify(files))) {
			this.setState({ images: images as any, files });
		}
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
					{this.state.images.map(({ image, id }) => <div
						key={id}
						className="image"
						style={{ position: 'relative', overflow: 'hidden' }}>
						<img
							src={image}
							alt="img"
							style={{ width: '100%', maxWidth: '100px' }}
							onClick={(): void => this.props.openModal(image, true, id)} />
						<button onClick={() => this.props.deleteFilePreview(id)} className='close' >X</button>
					</div>
					)}
				</div>
				<div className="files">
					{Object.keys(this.state.files).map(key =>
						<div key={key} className='file'>
							<div className='titleFile'>
								{this.state.files[key].title}
							</div>
							<button onClick={() => this.props.deleteFilePreview(Number(key))} className='close' >X</button>
						</div>
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