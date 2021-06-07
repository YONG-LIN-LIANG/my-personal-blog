import rootReducer from './reducers/rootReducer';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, promiseMiddleware)))

export default store