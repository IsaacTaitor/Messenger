import { Dispatch, Action } from 'redux';
import { ADD_ATTACHED_FILE, CHANGE_ATTACHED_FILE, DELETE_ATTACHED_FILE, CLEAR_ATTACHED_FILES } from '../../types/actions';

export const addAttachedFile = (id: number, file: File) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: ADD_ATTACHED_FILE, payload: { id, file } });
	};
};

export const changeAttachedFile = (id: number, file: File) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: CHANGE_ATTACHED_FILE, payload: { id, file } });
	};
};

export const deleteAttachedFile = (id: number) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: DELETE_ATTACHED_FILE, payload: { id } });
	};
};

export const clearAttachedFiles = () => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: CLEAR_ATTACHED_FILES });
	};
};