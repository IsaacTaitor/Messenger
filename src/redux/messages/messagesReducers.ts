import { ADD_MESSEGE } from '../../types/actions';

const initialState = {

};

export function messagesReducer(state = initialState, action): any {
	const { type, payload } = action;
	switch (type) {
	case ADD_MESSEGE:
		return {
			...state,
		};
	default:
		return state;
	}
}