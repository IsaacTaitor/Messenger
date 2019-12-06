import { Dispatch, Action } from 'redux';
import { ADD_MESSEGE } from '../../types/actions';

export const addMessege = (id: string) => {
	return (dispatch: Dispatch<Action>): void => {
		dispatch({ type: ADD_MESSEGE, payload: { id } });
	};
};