import { all, put, takeLatest, takeLeading } from 'redux-saga/effects';
import * as API from '../../api';

import requestAPI from '../sagas/requestAPI';

export const LOGIN_USER = 'auth/LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'auth/LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'auth/LOGIN_USER_FAILURE';

export const REGISTER_USER = 'auth/REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'auth/REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'auth/REGISTER_USER_FAILURE';

export const LOGOUT = 'auth/LOGOUT';

export const SET_AUTHORIZATION_ERROR = 'auth/SET_AUTHORIZATION_ERROR';
export const CLEAR_AUTHORIZATION_ERROR = 'auth/CLEAR_AUTHORIZATION_ERROR';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  token: undefined,
  userId: undefined,
  authorizationError: undefined,
};

export const loginUser = user => ({ type: LOGIN_USER, user });
export const loginUserSuccess = ({ userId, token }) => ({ type: LOGIN_USER_SUCCESS, userId, token });
export const loginUserFailure = (error) => ({ type: LOGIN_USER_FAILURE, error });
export const logout = () => ({ type: LOGOUT });

export const registerUser = (user) => ({ type: REGISTER_USER, user });
export const registerUserSuccess = (currentUser) => ({ type: REGISTER_USER_SUCCESS, currentUser });
export const registerUserFailure = (error) => ({ type: REGISTER_USER_FAILURE, error });

export const setAuthorizationError = (error) => ({ type: SET_AUTHORIZATION_ERROR, error });
export const clearAuthorizationError = () => ({ type: CLEAR_AUTHORIZATION_ERROR });

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
        ...state,
        isLoading: false,
        token: action.token,
        userId: action.userId,
        authorizationError: undefined,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
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
    case SET_AUTHORIZATION_ERROR:
      return { ...state, authorizationError: action.error }
    case CLEAR_AUTHORIZATION_ERROR:
      return { ...state, authorizationError: undefined }
    default:
      return state;
  }
};

export const getAuth = state => state.auth;
export const getCurrentUserId = state => getAuth(state).userId;
export const getError = state => getAuth(state).error;
export const getAuthorizationError = state => getAuth(state).authorizationError
export const getHasAuthorizationError = state => Boolean(getAuthorizationError(state))
export const getAccessToken = state => getAuth(state).token
export const isAuthenticated = state => Boolean(getAccessToken(state))

export function* loginUserSaga({ user }) {
  try {
    const { token, userId } = yield* requestAPI(API.login, user);
    yield put(loginUserSuccess({ userId, token }));
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

function* logoutSaga() {
  yield API.setToken(undefined, undefined)
}

function* watchLogin() {
  yield takeLatest(LOGIN_USER, loginUserSaga);
}

function* watchRegister() {
  yield takeLatest(REGISTER_USER, registerUserSaga);
}

function* watchLogout() {
  yield takeLeading(LOGOUT, logoutSaga)
}

export function* authSaga() {
  yield all([
    watchLogin(),
    watchRegister(),
    watchLogout(),
  ]);
}
