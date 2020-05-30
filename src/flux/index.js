import thunk from 'redux-thunk'
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'

import user from 'flux/modules/user'
import requests from 'flux/modules/requests'

export default createStore(
  combineReducers({ user, requests, }),
  applyMiddleware(thunk)
)
