import { all, put, takeLatest } from 'redux-saga/effects';
import * as API from '../../api';

import requestAPI from '../sagas/requestAPI';

export const LOGIN_USER = 'auth/LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'auth/LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'auth/LOGIN_USER_FAILURE';

export const REGISTER_USER = 'auth/REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'auth/REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'auth/REGISTER_USER_FAILURE';

export const LOGOUT = 'auth/LOGOUT';

const INITIAL_STATE = {
	isLoading: false,
	error: null,
	currentUserId: undefined,
};

export const loginUser = user => ({ type: LOGIN_USER, user });
export const loginUserSuccess = (currentUser) => ({ type: LOGIN_USER_SUCCESS, currentUser });
export const loginUserFailure = (error) => ({ type: LOGIN_USER_FAILURE, error });
export const logout = () => ({ type: LOGOUT });

export const registerUser = (user) => ({ type: REGISTER_USER, user });
export const registerUserSuccess = (currentUser) => ({ type: REGISTER_USER_SUCCESS, currentUser });
export const registerUserFailure = (error) => ({ type: REGISTER_USER_FAILURE, error });

export const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGIN_USER:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case LOGIN_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				isLoggedIn: true,
				currentUser: action.currentUser,
			};
		case LOGIN_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.error,
			};
		case LOGOUT:
			return {
				...state,
				currentUser: null,
				isLoggedIn: false,
				isLoading: false,
			};
		case REGISTER_USER:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case REGISTER_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case REGISTER_USER_FAILURE:
			return {
				...state,
				error: action.error,
			};
		default:
			return state;
	}
};

export const getUsersState = state => state.users;
export const getCurrentUser = state => getUsersState(state).currentUser;
export const getError = state => getUsersState(state).error;

export function* loginUserSaga({ user }) {
	try {
		const currentUser = yield* requestAPI(API.login, user);
		yield put(loginUserSuccess(currentUser));
	} catch (error) {
		yield put(loginUserFailure(error));
	}
}

export function* registerUserSaga({ user }) {
	try {
		const currentUser = yield* requestAPI(API.register, user);
		yield put(registerUserSuccess(currentUser));
	} catch (error) {
		yield put(registerUserFailure(error));
	}
}

function* watchLogin() {
	yield takeLatest(LOGIN_USER, loginUserSaga);
}

function* watchRegister() {
	yield takeLatest(REGISTER_USER, registerUserSaga);
}


export function* authSaga() {
	yield all([
		watchLogin(),
		watchRegister()
	]);
}
