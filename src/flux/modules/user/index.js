import Cookies from 'cookies-js'
import { createSelector } from 'reselect';
import { loginRequest, sendsay } from 'api';

import { TOKEN_KEY } from 'dictionary'

// Actions
const SET_IS_LOADING = 'USER/SET_IS_LOADING'
const SET_ERROR = 'USER/SET_ERROR'
const SET_TOKEN = 'USER/SET_TOKEN'

const initialState = {
  isLoading: undefined,
  error: undefined,
  token: undefined,
}

export default function reducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      }
    case SET_ERROR:
      return {
        ...state,
        error: payload
      }
    case SET_TOKEN:
      return {
        ...state,
        token: payload
      }
    default:
      return state
  }
}

// Selectors
const selectUserModule = state => state.user

export const selectIsLoading = createSelector(
  selectUserModule,
  ({ isLoading }) => isLoading
)

export const selectError = createSelector(
  selectUserModule,
  ({ error }) => error
)

export const selectToken = createSelector(
  selectUserModule,
  ({ token }) => token
)

export const selectIsAuth = createSelector(
  selectToken,
  token => !!token
)

// Action creators
export const setIsLoading = payload => ({
  type: SET_IS_LOADING,
  payload
})

export const setError = payload => ({
  type: SET_ERROR,
  payload
})

export const setToken = payload => ({
  type: SET_TOKEN,
  payload
})

// Middleware
export const loginAction = credentials => async (dispatch, getState) => {
  dispatch(setIsLoading(true))
  dispatch(setError(undefined))

  const response = await loginRequest(credentials)
    .catch(e => {
      dispatch(setError(e))
    })
  dispatch(setIsLoading(false))

  Cookies.set(TOKEN_KEY, sendsay.session)
}