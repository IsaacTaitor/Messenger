import { ADD_MESSAGE } from '../../types/actions';
import { Item } from '../../types/store';

const initialState: Array<Item> = [

];

export function messagesReducer(state = initialState, action): any {
	const { type, payload } = action;
	switch (type) {
	case ADD_MESSAGE:
		return [
			payload,
			...state
		];
	default:
		return state;
	}
}