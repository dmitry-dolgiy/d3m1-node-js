import { all } from 'redux-saga/effects';
import { authSaga as auth } from '../duck/authenticate';

export default function* () {
  yield all([
    auth(),
  ]);
}
