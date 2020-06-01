import Cookies from 'cookies-js'
import { createSelector } from 'reselect'
import { loginRequest, sendsay } from 'api'

import { TOKEN_KEY, NotificationTypes } from 'dictionary'
import { notifyAboutLogin } from 'flux/modules/notifications'

// Actions
const SET_IS_LOADING = 'USER/SET_IS_LOADING'
const SET_ERROR = 'USER/SET_ERROR'
const SET_TOKEN = 'USER/SET_TOKEN'

const initialState = {
  isLoading: false,
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
        error: payload,
      }
    case SET_TOKEN:
      return {
        ...state,
        token: payload,
      }
    default:
      return state
  }
}

// Selectors
const selectUserModule = (state) => state.user

export const selectIsLoading = createSelector(
  selectUserModule,
  ({ isLoading }) => isLoading || false
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
  (token) => !!token
)

// Action creators
export const setIsLoading = (payload) => ({
  type: SET_IS_LOADING,
  payload,
})

export const setError = (payload) => ({
  type: SET_ERROR,
  payload,
})

export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload,
})

// Middleware
export const loginAction = (credentials) => async (
  dispatch,
  getState
) => {
  dispatch(setIsLoading(true))
  dispatch(setError(undefined))

  await loginRequest(credentials).catch((e) => {
    const { explain, id } = e
    dispatch(setError(e))
    dispatch(
      notifyAboutLogin({
        type: NotificationTypes.Error,
        title: 'Вход не вышел',
        message: JSON.stringify({ explain, id }),
      })
    )
  })
  dispatch(setIsLoading(false))

  const error = selectError(getState())
  if (!error) {
    Cookies.set(TOKEN_KEY, sendsay.session)
  }
}
