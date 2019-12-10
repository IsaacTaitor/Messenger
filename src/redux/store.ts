import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';

import { messagesReducer } from './messages/messagesReducers';
import { modalViewImageReducer } from './modalViewImage/modalViewImageReducers';
import { previewImagesReducer } from './previewImages/previewImagesReducers';

const persistedReducer = combineReducers({
	messagesStore: messagesReducer,
	modalViewImageStore: modalViewImageReducer,
	previewImageStorage: previewImagesReducer
});

const logger = createLogger();
const middleWares = compose(applyMiddleware(reduxThunk, promise, logger));

const store = createStore(
	persistedReducer,
	middleWares,
);

export { store };