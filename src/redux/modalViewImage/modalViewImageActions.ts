import { Dispatch, Action } from 'redux';
import { OPEN_MODAL, CLOSE_MODAL } from '../../types/actions';

export const openModal = (img: string) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: OPEN_MODAL, payload: { img } });
	};
};

export const closeModal = () => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: CLOSE_MODAL });
	};
};