import React from 'react';
import { PreviewImageStorage, MessageValue } from '../../../types/store';
import MessageInput from '../MessageInput/MessageInput';
import './MessageDND.css';
import { filesToImage } from '../../../utils';
import { getIconFile } from '../../../utils/getIconFile';

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
			type: string;
		};
	};
}

const maxAllowedFiles = 10;

export default class MessageDND extends React.PureComponent<MessageDNDProps, MessageDNDState> {
	private droparea: React.RefObject<HTMLDivElement> = React.createRef();
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
		let allowedUpload = maxAllowedFiles - lengthModalViewImage;
		let conf = true;
		if (allowedUpload < lengthUploadFile) {
			conf = window.confirm('Вы не можете прикрепить больше 10 файлов');
		} else {
			allowedUpload = lengthUploadFile;
		}
		if (conf) {
			for (let i = 0; i < allowedUpload; i++) {
				const idFile = Math.floor(Math.random() * 100000);
				this.props.addFilePreview(idFile, files[i]);
			}
		}
	}

	viewImage = async (modalViewImage: PreviewImageStorage) => {
		const files = {};
		Object.keys(modalViewImage).forEach(
			key => {
				if (modalViewImage[key].type.indexOf('image') === -1) {
					files[key] = {
						title: modalViewImage[key].name,
						type: modalViewImage[key].type
					};
				}
			}
		);
		const images = await filesToImage(modalViewImage);
		this.setState({ images: images as any, files });
	}

	preventDefaults(e): void {
		e.preventDefault();
		e.stopPropagation();
	}

	highlight = (): void => {
		this.droparea.current.classList.add('highlight');
	}
	unhighlight = (): void => {
		this.droparea.current.classList.remove('highlight');
	}
	componentDidMount = (): void => {
		const { current } = this.droparea;

		['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
			current.addEventListener(eventName, this.preventDefaults, false);
		});
		['dragenter', 'dragover'].forEach(eventName => {
			current.addEventListener(eventName, this.highlight, false);
		});
		['dragleave', 'drop'].forEach(eventName => {
			current.addEventListener(eventName, this.unhighlight, false);
		});
		current.addEventListener('drop', this.handleDrop, false);
	}
	componentDidUpdate(prevProps): void {
		if (prevProps.modalViewImage !== this.props.modalViewImage) {
			this.viewImage(this.props.modalViewImage);
		}
	}

	render(): React.ReactElement {
		const { files, images } = this.state;
		return (
			<div className='drop-area' ref={this.droparea}>
				<MessageInput
					handleFiles={this.handleFiles}
					addMessage={this.props.addMessage}
					clearFiles={this.props.clearFilesPreview}
					files={this.props.modalViewImage}
				/>
				<div className="gallery">
					{images.map(({ image, id }) => <div
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
					{Object.keys(files).map(key =>
						<div key={key} className='file'>
							<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
								{getIconFile({ type: files[key].type })}
								<div className='titleFile'>
									{files[key].title}
								</div>
							</div>
							<button onClick={() => this.props.deleteFilePreview(Number(key))} className='close' >X</button>
						</div>
					)}
				</div>
			</div>
		);
	}

}