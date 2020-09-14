import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import rootSaga from './sagas'
import * as LS from './localStorage'
import { setToken } from '../api'
import { getAccessToken } from './duck/authenticate'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line no-underscore-dangle

const persistedState = LS.loadState()

if (persistedState) {
  setToken(getAccessToken(persistedState))
}

export default function () {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducer,
    persistedState,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  )
  store.subscribe(() => {
    const state = store.getState()
    const { token, userId } = state.auth

    LS.saveState({ auth: { token, userId } })
  })
  sagaMiddleware.run(rootSaga)
  return store
}
