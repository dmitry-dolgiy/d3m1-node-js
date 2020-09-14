import { call } from 'redux-saga/effects';

export default function* (method, ...params) {
  return yield call(method, ...params);
}
