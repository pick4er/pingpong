import thunk from 'redux-thunk'
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'

import user from 'flux/modules/user'

export default createStore(
  combineReducers({ user }),
  applyMiddleware(thunk)
)
