import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';

import { messagesReducer } from './messages/messagesReducers';

const persistedReducer = combineReducers({
	messagesStore: messagesReducer,
});

const logger = createLogger();
const middleWares = compose(applyMiddleware(reduxThunk, promise, logger));

const store = createStore(
	persistedReducer,
	middleWares,
);

export { store };