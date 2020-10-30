import { ADD_MESSAGE, REMOVE_MESSAGE } from '../../types/actions';
import { MessagesStore } from '../../types/store';

const initialState: MessagesStore = {};

export function messagesReducer(state = initialState, action): MessagesStore {
	const { type, payload } = action;
	switch (type) {
	case ADD_MESSAGE:
		return {
			[payload.id]: payload,
			...state
		};
	case REMOVE_MESSAGE:
		const newState = Object.assign({}, state);
		delete newState[payload];
		return {
			...newState
		};
	default:
		return state;
	}
}
