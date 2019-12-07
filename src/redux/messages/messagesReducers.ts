import { ADD_MESSEGE } from '../../types/actions';

export interface Item { id: number; text: string }

const initialState: Array<Item> = [

];

export function messagesReducer(state = initialState, action): any {
	const { type, payload } = action;
	switch (type) {
	case ADD_MESSEGE:
		return [
			payload.newItem,
			...state
		];
	default:
		return state;
	}
}