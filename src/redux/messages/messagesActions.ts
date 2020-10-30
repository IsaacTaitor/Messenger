import { Dispatch, Action } from 'redux';
import { ADD_MESSAGE } from '../../types/actions';
import { REMOVE_MESSAGE } from '../../types/actions';
import { MessageValue } from '../../types/store';

export const addMessage = (message: MessageValue) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: ADD_MESSAGE, payload: message });
	};
};

export const removeMessage = (message: MessageValue) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: REMOVE_MESSAGE, payload: message });
	};
};
