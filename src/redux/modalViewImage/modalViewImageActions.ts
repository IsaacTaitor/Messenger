import { Dispatch, Action } from 'redux';
import { OPEN_MODAL, CLOSE_MODAL } from '../../types/actions';

export const openModal = (img: string, editable: boolean, id: number) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: OPEN_MODAL, payload: { img, editable, id } });
	};
};

export const closeModal = () => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: CLOSE_MODAL });
	};
};