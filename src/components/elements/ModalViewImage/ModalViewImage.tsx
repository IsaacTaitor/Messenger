import React from 'react';
import { ModalViewImageStore } from '../../../types/store';
import './ModalViewImage.css';

interface ModalViewImageProps {
	modalViewImageStore: ModalViewImageStore;
	closeModal(): void;
}

export default class ModalViewImage extends React.PureComponent<ModalViewImageProps> {
	render(): React.ReactElement {
		const { isOpen, img } = this.props.modalViewImageStore;
		return (
			isOpen ? <div className='modal-div'>
				<i
					className="fa fa-close"
					style={{ fontSize: '48px', position: 'absolute', right: '40px', top: '40px', color: 'white', cursor: 'pointer' }}
					onClick={(): void => this.props.closeModal()} />
				<img src={img} alt='kek' className='img' />
			</div> : null
		);
	}
}