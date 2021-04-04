import {combineReducers} from 'redux';
import productReducer from './products';
import errorsReducer from './errors';
import messageReducer from "./messages";
import auth from "./auth";

export default combineReducers({
    products: productReducer,
    errors: errorsReducer,
    messages: messageReducer,
    auth,
})
