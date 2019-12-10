import { ADD_FILE_PREVIEW, CHANGE_FILE_PREVIEW, DELETE_FILE_PREVIEW, CLEAR_FILES_PREVIEW } from '../../types/actions';
import { PreviewImageStorage } from '../../types/store';

const initialState: PreviewImageStorage = {};

export function previewImagesReducer(state = initialState, action): PreviewImageStorage {
	const { type, payload } = action;
	switch (type) {
	case ADD_FILE_PREVIEW: {
		return {
			...state,
			[payload.id]: payload.file
		};
	}
	case CHANGE_FILE_PREVIEW:
		return {
			...state,
			[payload.id]: payload.file
		};
	case DELETE_FILE_PREVIEW: {
		const newState = Object.assign({}, state);
		delete newState[payload.id];
		return {
			...newState
		};
	}
	case CLEAR_FILES_PREVIEW:
		return {};
	default:
		return state;
	}
}