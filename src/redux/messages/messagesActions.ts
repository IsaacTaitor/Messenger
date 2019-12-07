import { Dispatch, Action } from 'redux';
import { ADD_MESSEGE } from '../../types/actions';
import { Item } from './messagesReducers';

export const addMessege = (newItem: Item) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: ADD_MESSEGE, payload: { newItem } });
	};
};