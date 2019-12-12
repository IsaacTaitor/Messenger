import { ADD_ATTACHED_FILE, CHANGE_ATTACHED_FILE, DELETE_ATTACHED_FILE, CLEAR_ATTACHED_FILES } from '../../types/actions';
import { AttachedFilesStore } from '../../types/store';

const initialState: AttachedFilesStore = {};

export function attachedFilesReducer(state = initialState, action): AttachedFilesStore {
	const { type, payload } = action;
	switch (type) {
	case ADD_ATTACHED_FILE: {
		return {
			...state,
			[payload.id]: payload.file
		};
	}
	case CHANGE_ATTACHED_FILE:
		return {
			...state,
			[payload.id]: payload.file
		};
	case DELETE_ATTACHED_FILE: {
		const newState = Object.assign({}, state);
		delete newState[payload.id];
		return {
			...newState
		};
	}
	case CLEAR_ATTACHED_FILES:
		return {};
	default:
		return state;
	}
}