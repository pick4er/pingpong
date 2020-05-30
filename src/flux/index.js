import thunk from 'redux-thunk'
import Cookies from 'cookies-js'
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux'

import user from 'flux/modules/user'
import requests from 'flux/modules/requests'
import { isProduction } from 'helpers'
import { TOKEN_KEY } from 'dictionary'
import { sendsay } from 'api'
import devTools from './devTools'

Cookies.defaults.secure = isProduction
const token = Cookies.get(TOKEN_KEY)
sendsay.session = token

const initialState = { user: { token } }
const reducers = combineReducers({ user, requests })
const middleware = compose(
  applyMiddleware(thunk),
  devTools()
)

export default createStore(
  reducers,
  initialState,
  middleware
)
