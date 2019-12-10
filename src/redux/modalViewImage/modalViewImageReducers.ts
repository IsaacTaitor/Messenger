import { OPEN_MODAL, CLOSE_MODAL } from '../../types/actions';
import { ModalViewImageStore } from '../../types/store';

const initialState: ModalViewImageStore = {
	isOpen: false,
	img: null,
	editable: false
};

export function modalViewImageReducer(state = initialState, action): ModalViewImageStore {
	const { type, payload } = action;
	switch (type) {
	case OPEN_MODAL:
		return {
			isOpen: true,
			img: payload.img,
			editable: payload.editable
		};
	case CLOSE_MODAL:
		return {
			isOpen: false,
			img: null,
			editable: false
		};
	default:
		return state;
	}
}