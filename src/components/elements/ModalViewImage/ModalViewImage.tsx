import React from 'react';
import { ModalViewImageStore } from '../../../types/store';
import { dataURLToFile } from '../../../utils';
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
		x: 'black',
		y: 2,
		prevX: 0,
		currX: 0,
		prevY: 0,
		currY: 0,
		flag: false,
		dotFlag: false,
		changeMode: false,
		ctx: null
	}

	findxy = (res, e) => {
		const { ctx } = this.state;
		if (res === 'down' && this.state.changeMode) {
			this.setState({
				prevX: this.state.currX,
				prevY: this.state.currY,
				currX: e.clientX - this.canvas.current.offsetLeft,
				currY: e.clientY - this.canvas.current.offsetTop,
				flag: true,
				dotFlag: true
			});
			if (this.state.dotFlag) {
				ctx.beginPath();
				ctx.fillStyle = this.state.x;
				ctx.fillRect(this.state.currX, this.state.currY, 2, 2);
				ctx.closePath();
				this.setState({
					dotFlag: false
				});
			}
		}
		if (res === 'up' || res === 'out') {
			this.setState({
				flag: false
			});
		}
		if (res === 'move') {
			if (this.state.flag) {
				this.setState({
					prevX: this.state.currX,
					prevY: this.state.currY,
					currX: e.clientX - this.canvas.current.offsetLeft,
					currY: e.clientY - this.canvas.current.offsetTop
				});
				this.draw(ctx);
			}
		}
	};

	init = (img, width, height) => {
		this.setState({
			ctx: this.canvas.current.getContext('2d')
		});
		this.canvas.current.getContext('2d').drawImage(img, 0, 0, width, height);

		this.canvas.current.addEventListener('mousemove', (e) => this.findxy('move', e), false);
		this.canvas.current.addEventListener('mousedown', (e) => this.findxy('down', e), false);
		this.canvas.current.addEventListener('mouseup', (e) => this.findxy('up', e), false);
		this.canvas.current.addEventListener('mouseout', (e) => this.findxy('out', e), false);
	};

	draw = (ctx) => {
		ctx.beginPath();
		ctx.moveTo(this.state.prevX, this.state.prevY);
		ctx.lineTo(this.state.currX, this.state.currY);
		ctx.strokeStyle = this.state.x;
		ctx.lineWidth = this.state.y;
		ctx.stroke();
		ctx.closePath();
	};

	save = () => {
		const dataURL = this.canvas.current.toDataURL();
		const file = dataURLToFile(dataURL, 'newFile.png');
		this.props.changeFilePreview(this.props.modalViewImageStore.id, file);
		this.setState({
			changeMode: false
		});
	};

	clear = (img, width, height) => {
		this.canvas.current.getContext('2d').drawImage(img, 0, 0, width, height);
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
							{this.state.changeMode && <div onClick={this.save} className='saveButton'>Сохранить</div>}
							{!this.state.changeMode && <div onClick={() => this.setState({
								changeMode: true
							})} className='changeButton'>Изменить</div>}
							{this.state.changeMode && <div onClick={() => this.clear(imgDraw, width, height)} className='clearButton'>Очистить</div>}
						</div>
						<i className='fa fa-close' onClick={(): void => {
							this.setState({
								changeMode: false
							});
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