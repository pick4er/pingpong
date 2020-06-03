import thunk from 'redux-thunk'
import Cookies from 'cookies-js'
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import user from 'flux/modules/user'
import requests from 'flux/modules/requests'
import notifications from 'flux/modules/notifications'
import { isProduction } from 'helpers'
import { TOKEN_KEY } from 'dictionary'
import { sendsay } from 'api'
import devTools from './devTools'

Cookies.defaults.secure = isProduction
const token = Cookies.get(TOKEN_KEY)
sendsay.session = token
const initialState = { user: { token } }

function create() {
  const requestsPersistConfig = {
    key: 'requests',
    whitelist: ['history'],
    storage,
  }

  const credentialsPersistConfig = {
    key: 'user',
    whitelist: [
      'login',
      'sublogin',
      'requestWidth',
      'responseWidth',
    ],
    storage,
  }

  const combinedReducers = combineReducers({
    user: persistReducer(credentialsPersistConfig, user),
    notifications,
    requests: persistReducer(
      requestsPersistConfig,
      requests
    ),
  })
  const middleware = compose(
    applyMiddleware(thunk),
    devTools()
  )

  const store = createStore(
    combinedReducers,
    initialState,
    middleware
  )
  const persistor = persistStore(store, {})

  return { store, persistor }
}

export default create
