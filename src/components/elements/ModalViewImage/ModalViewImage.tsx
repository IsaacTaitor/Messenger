import React from 'react';
import { ModalViewImageStore } from '../../../types/store';
import { dataURLToFile } from '../../../utils';
import { pen, clearEventListenerPen } from '../../../utils/modules/pen';
import './ModalViewImage.css';

interface ModalViewImageProps {
	modalViewImageStore: ModalViewImageStore;
	changeAttachedFile(id: number, file: File): void;
	closeModal(): void;
}

export default class ModalViewImage extends React.PureComponent<ModalViewImageProps> {
	private canvas: React.RefObject<HTMLCanvasElement> = React.createRef();

	state = {
		changeMode: false,
		width: 0,
		height: 0,
		imgDraw: null
	}

	init = (img, width, height): void => {
		this.canvas.current.getContext('2d').drawImage(img, 0, 0, width, height);
	};

	save = (): void => {
		clearEventListenerPen(this.canvas.current);
		const dataURL = this.canvas.current.toDataURL();
		const file = dataURLToFile(dataURL, this.props.modalViewImageStore.title);
		this.props.changeAttachedFile(this.props.modalViewImageStore.id, file);
		this.setState({
			changeMode: false
		});
	};

	change = () => {
		this.setState({
			changeMode: true
		});
		pen(this.canvas.current);
	}

	clear = (img, width, height): void => {
		this.canvas.current.getContext('2d').drawImage(img, 0, 0, width, height);
	}

	close = () => {
		this.setState({
			changeMode: false
		});
		clearEventListenerPen(this.canvas.current);
		this.props.closeModal();
	}

	setSizeCanvas = (img) => {
		const imgDraw = new Image();
		imgDraw.src = img;
		this.setState({ imgDraw });
		if ((imgDraw.height <= 400) && (imgDraw.width <= 800)) {
			this.setState({ width: imgDraw.width });
			this.setState({ height: imgDraw.height });
		} else if (imgDraw.height > 400) {
			this.setState({ width: imgDraw.width * (400 / imgDraw.height) });
			this.setState({ height: 400 });
			if (this.state.width > 800) {
				this.setState({ width: 800 });
				this.setState({ height: imgDraw.height * (400 / imgDraw.width) });
			}
		}
	}

	componentDidUpdate(prevProps): void {
		const { img } = this.props.modalViewImageStore;
		if (prevProps.modalViewImageStore.img !== img) {
			this.setSizeCanvas(img);
		}
	}

	componentWillUnmount(): void {
		clearEventListenerPen(this.canvas.current);
	}

	render(): React.ReactElement {
		const { isOpen, img, editable } = this.props.modalViewImageStore;

		return (
			isOpen && (
				editable ?
					<div className='modal-div' onLoad={() => this.init(this.state.imgDraw, this.state.width, this.state.height)}>
						<div className='previewDiv'>
							<div onClick={this.save} className='previewText'>Предпросмотр</div>
							<canvas ref={this.canvas} style={{ position: 'fixed' }} width={this.state.width} height={this.state.height} />
							{!this.state.changeMode && <div onClick={this.change} className='changeButton'>Изменить</div>}
							{this.state.changeMode && <div onClick={this.save} className='saveButton'>Сохранить</div>}
							{this.state.changeMode && <div onClick={() => this.clear(this.state.imgDraw, this.state.width, this.state.height)} className='clearButton'>Очистить</div>}
						</div>
						<i className='fa fa-close' onClick={this.close} style={{ fontSize: '48px' }} />
						<img src={img} alt='kek' className='img' style={{ display: 'none' }} />
					</div>
					: <div className='modal-div' >
						<img src={img} alt='kek' className='img'/>
						<i className='fa fa-close' onClick={(): void => this.props.closeModal()} style={{ fontSize: '48px' }} />
					</div>)
		);
	}
}