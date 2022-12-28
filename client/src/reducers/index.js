import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './user';
import fileReducer from './file';
import modalReducer from './modal';
import uploadRedicer from './upload';

const rootReducer = combineReducers({
    user: userReducer,
    file: fileReducer,
    modal: modalReducer,
    upload: uploadRedicer,
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);
