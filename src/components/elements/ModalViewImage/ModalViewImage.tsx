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
		dotFlag: false
	}

	findxy = (res, e, ctx) => {
		if (res === 'down') {
			this.setState({
				prevX: this.state.currX,
				prevY: this.state.currY,
				currX: e.clientX - this.canvas.current.offsetLeft,
				currY: e.clientY - this.canvas.current.offsetTop,
				flag: true,
				dotFlag: true
			});
			if (this.state. dotFlag) {
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
				})
				this.draw(ctx);
			}
		}
	};

	init = (img, width, height) => {
		const ctx = this.canvas.current.getContext('2d');
		ctx.drawImage(img, 0, 0, width, height);

		this.canvas.current.addEventListener('mousemove', (e) => this.findxy('move', e, ctx), false);
		this.canvas.current.addEventListener('mousedown', (e) => this.findxy('down', e, ctx), false);
		this.canvas.current.addEventListener('mouseup', (e) => this.findxy('up', e, ctx), false);
		this.canvas.current.addEventListener('mouseout', (e) => this.findxy('out', e, ctx), false);
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
	};

	render(): React.ReactElement {
		const { isOpen, img, editable } = this.props.modalViewImageStore;
		const imgDraw = new Image();
		imgDraw.src = img;
		let width = imgDraw.width * (400 / imgDraw.height);
		let height = 400;
		if (width > 800) {
			width = 800;
			height = imgDraw.height * (400 / imgDraw.width);
		}
		return (
			isOpen && (
				editable ?
					<div className='modal-div' onLoad={() => this.init(imgDraw, width, height)}>
						<canvas ref={this.canvas} width={width} height={height}></canvas>
						<i className='fa fa-close' onClick={(): void => this.props.closeModal()} style={{ fontSize: '48px' }} />
						<img src={img} alt='kek' className='img' id='img' style={{ display: 'none' }} />
						<button onClick={this.save} >Сохранить</button>
					</div>
					: <div className='modal-div' >
						<img src={img} alt='kek' className='img' id='img' />
						<i className='fa fa-close' onClick={(): void => this.props.closeModal()} style={{ fontSize: '48px' }} />
					</div>)
		);
	}
}