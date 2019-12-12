import React from 'react';
import { ModalViewImageStore } from '../../../types/store';
import { dataURLToFile } from '../../../utils';
import { pen, clearEventListenerPen } from '../../../utils/modules/pen';
import './PreviewImageWithModules.css';

interface PreviewImageWithModulesProps {
	modalViewImageStore: ModalViewImageStore;
	changeAttachedFile(id: number, file: File): void;
	closeModal(): void;
}

interface PreviewImageWithModulesState {
	changeMode: boolean;
	width: number;
	height: number;
	imgDraw: any;
}

export default class PreviewImageWithModules extends React.PureComponent<PreviewImageWithModulesProps, PreviewImageWithModulesState> {
	private canvas: React.RefObject<HTMLCanvasElement> = React.createRef();
	state = {
		changeMode: false,
		width: 0,
		height: 0,
		imgDraw: null
	}

	init = (img, width, height): void => {
		img && this.canvas.current.getContext('2d').drawImage(img, 0, 0, width, height);
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

	componentDidUpdate(prevProps, prevState): void {
		const { img } = this.props.modalViewImageStore;
		if (prevProps.modalViewImageStore.img !== img) {
			this.setSizeCanvas(img);
		}
		if (prevState.imgDraw !== this.state.imgDraw) {
			this.init(this.state.imgDraw, this.state.width, this.state.height);
		}
	}

	componentDidMount(): void {
		const { img } = this.props.modalViewImageStore;
		this.setSizeCanvas(img);
	}

	componentWillUnmount(): void {
		clearEventListenerPen(this.canvas.current);
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

	render(): React.ReactElement {
		const { img, title } = this.props.modalViewImageStore;
		return (
			<div className='modal-div'>
				<div className='previewDiv'>
					<div onClick={this.save} className='previewText'>Предпросмотр</div>
					<canvas ref={this.canvas} className='canvas' width={this.state.width} height={this.state.height} />
					{!this.state.changeMode && <div onClick={this.change} className='changeButton'>Изменить</div>}
					{this.state.changeMode && <div onClick={this.save} className='saveButton'>Сохранить</div>}
					{this.state.changeMode && <div onClick={() => this.clear(this.state.imgDraw, this.state.width, this.state.height)} className='clearButton'>Очистить</div>}
				</div>
				<i className='fa fa-close' onClick={this.close} />
				<img src={img} alt={title} className='img' />
			</div>
		);
	}
}
