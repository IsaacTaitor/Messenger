import { Dispatch, Action } from 'redux';
import { ADD_MESSAGE } from '../../types/actions';
import { Item } from '../../types/store';

export const addMessage = (newItem: Item) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: ADD_MESSAGE, payload: { newItem } });
	};
};