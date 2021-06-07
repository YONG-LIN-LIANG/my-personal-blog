import {combineReducers} from 'redux';
import userReducer from './userReducer';
import blogReducer from './blogReducer';
import loadingReducer from './loadingReducer';
const rootReducer = combineReducers({
    user: userReducer,
    blog: blogReducer,
    loading: loadingReducer
})

export default rootReducer