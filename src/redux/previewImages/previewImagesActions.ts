import { Dispatch, Action } from 'redux';
import { ADD_FILE_PREVIEW, CHANGE_FILE_PREVIEW, DELETE_FILE_PREVIEW, CLEAR_FILES_PREVIEW } from '../../types/actions';

export const addFilePreview = (id: number, file: File) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: ADD_FILE_PREVIEW, payload: { id, file } });
	};
};

export const changeFilePreview = (id: number, file: File) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: CHANGE_FILE_PREVIEW, payload: { id, file } });
	};
};

export const deleteFilePreview = (id: number) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: DELETE_FILE_PREVIEW, payload: { id } });
	};
};

export const clearFilesPreview = () => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: CLEAR_FILES_PREVIEW });
	};
};