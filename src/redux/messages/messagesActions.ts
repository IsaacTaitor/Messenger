import { Dispatch, Action } from 'redux';
import { ADD_MESSAGE } from '../../types/actions';
import { Message } from '../../types/store';

export const addMessage = (message: Message) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: ADD_MESSAGE, payload: message });
	};
};