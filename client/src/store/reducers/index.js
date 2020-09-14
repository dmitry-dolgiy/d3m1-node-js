import { combineReducers } from 'redux';
import { authReducer as users } from '../duck/authenticate';

export default combineReducers({
	users,
});
