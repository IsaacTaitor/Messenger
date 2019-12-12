import React from 'react';
import { ModalViewImageStore } from '../../../types/store';
import './PreviewImageWithoutModules.css';

interface PreviewImageWithoutModulesProps {
	modalViewImageStore: ModalViewImageStore;
	closeModal(): void;
}

export default class PreviewImageWithoutModules extends React.PureComponent<PreviewImageWithoutModulesProps> {

	render(): React.ReactElement {
		const { closeModal, modalViewImageStore } = this.props;
		const { img, title } = modalViewImageStore;
		return (
			<div className='modal-div' >
				<img src={img} alt={title} className='imgWithoutModules' />
				<i className='fa fa-close' onClick={closeModal} />
			</div>
		);
	}
}