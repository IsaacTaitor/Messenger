import React from 'react';
import { ModalViewImageStore } from '../../../types/store';
import './ModalViewImage.css';

interface ModalViewImageProps {
	modalViewImageStore: ModalViewImageStore;
	closeModal(): void;
}

export default class ModalViewImage extends React.PureComponent<ModalViewImageProps> {
	render(): React.ReactElement {
		let canvas, ctx, flag = false,
			prevX = 0,
			currX = 0,
			prevY = 0,
			currY = 0,
			dotFlag = false;

		const x = 'black',
			y = 2;

		const draw = () => {
			ctx.beginPath();
			ctx.moveTo(prevX, prevY);
			ctx.lineTo(currX, currY);
			ctx.strokeStyle = x;
			ctx.lineWidth = y;
			ctx.stroke();
			ctx.closePath();
		};

		const findxy = (res, e) => {
			if (res === 'down') {
				prevX = currX;
				prevY = currY;
				currX = e.clientX - canvas.offsetLeft;
				currY = e.clientY - canvas.offsetTop;

				flag = true;
				dotFlag = true;
				if (dotFlag) {
					ctx.beginPath();
					ctx.fillStyle = x;
					ctx.fillRect(currX, currY, 2, 2);
					ctx.closePath();
					dotFlag = false;
				}
			}
			if (res === 'up' || res === 'out') {
				flag = false;
			}
			if (res === 'move') {
				if (flag) {
					prevX = currX;
					prevY = currY;
					currX = e.clientX - canvas.offsetLeft;
					currY = e.clientY - canvas.offsetTop;
					draw();
				}
			}
		};

		const init = (img) => {
			canvas = document.getElementById('can');
			ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0, img.width * (400/img.height), 400);

			canvas.addEventListener('mousemove', function (e) {
				findxy('move', e);
			}, false);
			canvas.addEventListener('mousedown', function (e) {
				findxy('down', e);
			}, false);
			canvas.addEventListener('mouseup', function (e) {
				findxy('up', e);
			}, false);
			canvas.addEventListener('mouseout', function (e) {
				findxy('out', e);
			}, false);
		};

		const { isOpen, img, editable } = this.props.modalViewImageStore;
		const imgDraw = new Image();
		imgDraw.src = img;
		return (
			isOpen && (
				editable ?
					<div className='modal-div' onLoad={() => init(imgDraw)}>
						<canvas id='can' width={imgDraw.width * (400/imgDraw.height)} height={400}></canvas>
						<i className='fa fa-close' onClick={(): void => this.props.closeModal()} style={{ fontSize: '48px' }} />
						<img src={img} alt='kek' className='img' id='img' style={{ display: 'none' }} />
					</div>
					: <div className='modal-div' >
						<img src={img} alt='kek' className='img' id='img' />
						<i className='fa fa-close' onClick={(): void => this.props.closeModal()} style={{ fontSize: '48px' }} />
					</div>)
		);
	}
}