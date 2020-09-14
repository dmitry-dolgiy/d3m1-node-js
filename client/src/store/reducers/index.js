import { combineReducers } from 'redux';
import { authReducer as auth } from '../duck/authenticate';

export default combineReducers({
	auth,
});
