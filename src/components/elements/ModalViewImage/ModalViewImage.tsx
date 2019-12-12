import React from 'react';
import { ModalViewImageStore } from '../../../types/store';
import { dataURLToFile } from '../../../utils';
import { pen, clearEventListener, changeModePen } from '../../../utils/modules/pen';
import './ModalViewImage.css';

interface ModalViewImageProps {
	modalViewImageStore: ModalViewImageStore;
	changeFilePreview(id: number, file: File): void;
	closeModal(): void;
}

export default class ModalViewImage extends React.PureComponent<ModalViewImageProps> {
	private canvas: React.RefObject<HTMLCanvasElement>;
	constructor(props) {
		super(props);
		this.canvas = React.createRef();
	}

	state = {
		changeMode: false,
	}

	init = (img, width, height): void => {
		this.canvas.current.getContext('2d').drawImage(img, 0, 0, width, height);
	};

	save = (): void => {
		const dataURL = this.canvas.current.toDataURL();
		const file = dataURLToFile(dataURL, 'newFile.png');
		this.props.changeFilePreview(this.props.modalViewImageStore.id, file);
		this.setState({
			changeMode: false
		});
	};

	clear = (img, width, height): void => {
		this.canvas.current.getContext('2d').drawImage(img, 0, 0, width, height);
	}

	componentDidUpdate() {
		changeModePen(this.state.changeMode);
	}

	componentWillUnmount() {
		clearEventListener(this.canvas.current);
	}

	render(): React.ReactElement {
		const { isOpen, img, editable } = this.props.modalViewImageStore;
		const imgDraw = new Image();
		imgDraw.src = img;
		let width;
		let height;
		if ((imgDraw.height <= 400) && (imgDraw.width <= 800)) {
			width = imgDraw.width;
			height = imgDraw.height;
		} else if (imgDraw.height > 400) {
			width = imgDraw.width * (400 / imgDraw.height);
			height = 400;
			if (width > 800) {
				width = 800;
				height = imgDraw.height * (400 / imgDraw.width);
			}
		}
		return (
			isOpen && (
				editable ?
					<div className='modal-div' onLoad={() => this.init(imgDraw, width, height)}>
						<div style={{
							width: '850px',
							height: '500px',
							background: '#202020',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							position: 'relative'
						}}>
							<div onClick={this.save} className='previewText'>Предпросмотр</div>
							<canvas ref={this.canvas} style={{ position: 'fixed' }} width={width} height={height} />
							{this.state.changeMode && <div onClick={() => {
								this.save();
								clearEventListener(this.canvas.current);
							}} className='saveButton'>Сохранить</div>}
							{!this.state.changeMode && <div onClick={() => {
								this.setState({
									changeMode: true
								});
								pen(this.canvas.current);
							}} className='changeButton'>Изменить</div>}
							{this.state.changeMode && <div onClick={() => {
								this.clear(imgDraw, width, height);
								clearEventListener(this.canvas.current);
							}} className='clearButton'>Очистить</div>}
						</div>
						<i className='fa fa-close' onClick={(): void => {
							this.setState({
								changeMode: false
							});
							clearEventListener(this.canvas.current);
							this.props.closeModal();
						}} style={{ fontSize: '48px' }} />
						<img src={img} alt='kek' className='img' id='img' style={{ display: 'none' }} />
					</div>
					: <div className='modal-div' >
						<img src={img} alt='kek' className='img' id='img' />
						<i className='fa fa-close' onClick={(): void => this.props.closeModal()} style={{ fontSize: '48px' }} />
					</div>)
		);
	}
}