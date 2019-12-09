import { ADD_MESSAGE } from '../../types/actions';
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
	default:
		return state;
	}
}