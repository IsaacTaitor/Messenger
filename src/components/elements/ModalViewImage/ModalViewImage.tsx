import React from 'react';
import { ModalViewImageStore } from '../../../types/store';
import PreviewImageWithModules from '../PreviewImageWithModules/PreviewImageWithModules';
import PreviewImageWithoutModules from '../PreviewImageWithoutModules/PreviewImageWithoutModules';

interface ModalViewImageProps {
	modalViewImageStore: ModalViewImageStore;
	changeAttachedFile(id: number, file: File): void;
	closeModal(): void;
}

export default class ModalViewImage extends React.PureComponent<ModalViewImageProps> {

	render(): React.ReactElement {
		const { modalViewImageStore, changeAttachedFile, closeModal } = this.props;
		const { isOpen, editable } = modalViewImageStore;

		return (
			isOpen && (
				editable
					? <PreviewImageWithModules modalViewImageStore={modalViewImageStore} changeAttachedFile={changeAttachedFile} closeModal={closeModal} />
					: <PreviewImageWithoutModules modalViewImageStore={modalViewImageStore} closeModal={closeModal} />)
		);
	}
}