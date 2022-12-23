import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './user';
import fileReducer from './file';
import modalReducer from './modal';

const rootReducer = combineReducers({
    user: userReducer,
    file: fileReducer,
    modal: modalReducer,
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);
